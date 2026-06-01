import fs from 'node:fs'
import path from 'node:path'
import type { Plugin, ViteDevServer } from 'vite'
import type { CoreUiJitOptions, ParsedToken, } from './types'
import {
    buildCssRule,
    DEFAULT_BREAKPOINTS,
    DEFAULT_INCLUDE,
    parseToken,
    resolveRule,
    shouldProcess,
    tokenize,
} from './core'

function collectProjectFiles(
    root: string,
    include: RegExp[],
    excludeFile: string
): string[] {
    const files: string[] = []

    function walk(dir: string): void {
        const entries = fs.readdirSync(dir, { withFileTypes: true })

        for (const entry of entries) {
            if (
                entry.name === 'node_modules' ||
                entry.name === '.git' ||
                entry.name === 'dist' ||
                entry.name === '.output' ||
                entry.name === '.nuxt' ||
                entry.name === '.turbo' ||
                entry.name === '.generated'
            ) {
                continue
            }

            const fullPath = path.join(dir, entry.name)

            if (entry.isDirectory()) {
                walk(fullPath)
                continue
            }

            if (fullPath === excludeFile) continue
            if (shouldProcess(fullPath, include)) {
                files.push(fullPath)
            }
        }
    }

    walk(root)
    return files
}

export function coreUiJit(options?: CoreUiJitOptions): Plugin {
    const include = options?.include ?? DEFAULT_INCLUDE
    const breakpoints = options?.breakpoints ?? DEFAULT_BREAKPOINTS

    let root = process.cwd()
    let outFile = ''
    let devServer: ViteDevServer | null = null
    let currentCss = ''

    const fileToTokens = new Map<string, Set<string>>()
    const tokenRefCount = new Map<string, number>()
    const tokenParseCache = new Map<string, ParsedToken | null>()
    const tokenCssCache = new Map<string, string | null>()
    const activeCssRules = new Map<string, string>()

    function notifyCssChanged(): void {
        if (!devServer || !outFile) return
        devServer.watcher.emit('change', outFile)
    }

    function getParsedToken(token: string): ParsedToken | null {
        if (tokenParseCache.has(token)) {
            return tokenParseCache.get(token) ?? null
        }

        const parsed = parseToken(token)
        tokenParseCache.set(token, parsed)

        return parsed
    }

    function getCssRuleForToken(token: string): string | null {
        if (tokenCssCache.has(token)) {
            return tokenCssCache.get(token) ?? null
        }

        const parsed = getParsedToken(token)
        if (!parsed) {
            tokenCssCache.set(token, null)
            return null
        }

        const cssBody = resolveRule(parsed.utility)

        if (!cssBody) {
            tokenCssCache.set(token, null)
            return null
        }

        const cssRule = buildCssRule(parsed, cssBody, breakpoints)
        tokenCssCache.set(token, cssRule)

        return cssRule
    }

    function buildFinalCss(): string {
        if (!activeCssRules.size) {
            return '/* @vueland/utils-jit: no utilities found */\n'
        }

        const sortedRules = [...activeCssRules.entries()]
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([, cssRule]) => cssRule)

        return [
            '/* @vueland/utils-jit: generated utilities */',
            ...sortedRules,
            '',
        ].join('\n')
    }

    function writeCssFile(notify = false): void {
        const nextCss = buildFinalCss()

        if (nextCss === currentCss) {
            return
        }

        currentCss = nextCss

        fs.mkdirSync(path.dirname(outFile), { recursive: true })
        fs.writeFileSync(outFile, currentCss, 'utf8')

        if (devServer) {
            devServer.watcher.add(outFile)
        }

        if (notify) {
            notifyCssChanged()
        }
    }

    function activateToken(token: string): void {
        const prevCount = tokenRefCount.get(token) ?? 0
        const nextCount = prevCount + 1

        tokenRefCount.set(token, nextCount)

        if (prevCount === 0) {
            const cssRule = getCssRuleForToken(token)
            if (cssRule) {
                activeCssRules.set(token, cssRule)
            }
        }
    }

    function deactivateToken(token: string): void {
        const prevCount = tokenRefCount.get(token) ?? 0
        if (prevCount <= 0) return

        const nextCount = prevCount - 1

        if (nextCount === 0) {
            tokenRefCount.delete(token)
            activeCssRules.delete(token)
            return
        }

        tokenRefCount.set(token, nextCount)
    }

    function applyFileTokens(file: string, nextTokens: Set<string>): void {
        const prevTokens = fileToTokens.get(file) ?? new Set<string>()

        for (const token of prevTokens) {
            if (!nextTokens.has(token)) {
                deactivateToken(token)
            }
        }

        for (const token of nextTokens) {
            if (!prevTokens.has(token)) {
                activateToken(token)
            }
        }

        if (nextTokens.size > 0) {
            fileToTokens.set(file, nextTokens)
        } else {
            fileToTokens.delete(file)
        }
    }

    function rebuildAll(notify = false): void {
        fileToTokens.clear()
        tokenRefCount.clear()
        activeCssRules.clear()

        const files = collectProjectFiles(root, include, outFile)

        for (const file of files) {
            const code = fs.readFileSync(file, 'utf8')
            const tokens = tokenize(code)

            if (tokens.size > 0) {
                fileToTokens.set(file, tokens)

                for (const token of tokens) {
                    const count = tokenRefCount.get(token) ?? 0
                    tokenRefCount.set(token, count + 1)
                }
            }
        }

        for (const [token, count] of tokenRefCount) {
            if (count > 0) {
                const cssRule = getCssRuleForToken(token)

                if (cssRule) {
                    activeCssRules.set(token, cssRule)
                }
            }
        }

        writeCssFile(notify)
    }

    function rebuildOne(file: string, code: string, notify = false): void {
        if (file === outFile) return

        const nextTokens = tokenize(code)
        applyFileTokens(file, nextTokens)
        writeCssFile(notify)
    }

    function removeOne(file: string, notify = false): void {
        if (file === outFile) return

        const prevTokens = fileToTokens.get(file)
        if (!prevTokens) return

        for (const token of prevTokens) {
            deactivateToken(token)
        }

        fileToTokens.delete(file)
        writeCssFile(notify)
    }

    return {
        name: 'utils-jit',

        configResolved(config) {
            root = config.root
            outFile = options?.outFile
                ? path.resolve(root, options.outFile)
                : path.resolve(root, 'src/.generated/utils-jit.css')

            rebuildAll(false)
        },

        configureServer(server) {
            devServer = server

            if (outFile) {
                server.watcher.add(outFile)
            }
        },

        buildStart() {
            rebuildAll(false)
        },

        transform(code, id) {
            if (!shouldProcess(id, include)) return null
            if (id === outFile) return null

            rebuildOne(id, code, false)
            return null
        },

        async handleHotUpdate(ctx) {
            const { file } = ctx

            if (!shouldProcess(file, include)) return
            if (file === outFile) return

            const code = await ctx.read()
            rebuildOne(file, code, true)
        },

        watchChange(id, change) {
            if (!shouldProcess(id, include)) return
            if (id === outFile) return

            if (change.event === 'delete') {
                removeOne(id, true)
            }
        },
    }
}

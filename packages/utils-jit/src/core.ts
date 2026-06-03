import type { CssBody, ParsedToken, RuleMatch, UtilityRule } from './types'
import * as rules from './rules'

export const DEFAULT_INCLUDE = [/\.(vue|js|ts|html)$/]

export const DEFAULT_BREAKPOINTS: Record<string, number> = {
    sm: 640,
    md: 768,
    lg: 1024,
}

export const PSEUDO_VARIANTS = new Set(['hover', 'focus', 'active'])

const MIN_TOKEN_LENGTH = 5
const MAX_TOKEN_LENGTH = 100
const MAX_VALUE_LENGTH = 120

export function shouldProcess(id: string, include: RegExp[]): boolean {
    return include.some((re) => re.test(id))
}

export function escapeCssSelector(value: string): string {
    return value
        .replace(/\\/g, '\\\\')
        .replace(/:/g, '\\:')
        .replace(/\//g, '\\/')
        .replace(/\[/g, '\\[')
        .replace(/\]/g, '\\]')
        .replace(/\./g, '\\.')
        .replace(/%/g, '\\%')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)')
        .replace(/,/g, '\\,')
        .replace(/#/g, '\\#')
        .replace(/\s/g, '')
}

export function normalizeValue(value: string): string {
    return value.trim().replace(/\s+/g, ' ')
}

/**
 * Санитарная проверка значения:
 * - ограничение длины
 * - только безопасные символы
 * - запрет на ; { }
 * - запрет на откровенный мусор вроде ".", "-", "%"
 */
export function isSafeCssValue(value: string): boolean {
    const normalized = normalizeValue(value)

    if (!normalized) return false
    if (normalized.length > MAX_VALUE_LENGTH) return false
    if (!/^[-a-zA-Z0-9.%_(),+/*\s[\]#]+$/.test(normalized)) return false
    if (/[;{}]/.test(normalized)) return false
    if (!/[a-zA-Z0-9]/.test(normalized)) return false

    return true
}

function stripEdgeGarbage(token: string): string {
    return token.replace(/^['"`{(]+|['"`})>,;]+$/g, '')
}

function looksLikeArbitraryUtility(token: string): boolean {
    if (!token) return false
    if (token.length < MIN_TOKEN_LENGTH) return false
    if (token.length > MAX_TOKEN_LENGTH) return false

    if (!token.includes('-[') || !token.includes(']')) return false

    if (
        token.startsWith('<') ||
        token.startsWith('<!--') ||
        token.startsWith('--') ||
        token.includes('</') ||
        token.includes('/>') ||
        token.includes('<!--') ||
        token.includes('-->')
    ) {
        return false
    }

    const arbitraryIndex = token.indexOf('-[')
    if (arbitraryIndex <= 0) return false

    return token.endsWith(']')
}

/**
 * Быстро извлекает содержимое class / :class.
 */
export function extractClassCandidates(code: string): string[] {
    const candidates: string[] = []

    const patterns = [
        /(?:^|[\s<]):class\s*=\s*"([^"]*)"/g,
        /(?:^|[\s<]):class\s*=\s*'([^']*)'/g,
        /(?:^|[\s<])class\s*=\s*"([^"]*)"/g,
        /(?:^|[\s<])class\s*=\s*'([^']*)'/g,
    ]

    for (const pattern of patterns) {
        for (const match of code.matchAll(pattern)) {
            const value = match[1]
            if (!value) continue
            candidates.push(value)
        }
    }

    return candidates
}

/**
 * Ищет arbitrary utility целиком, а не режет строку на "кусочки".
 *
 * Поддерживает:
 * - w-[120px]
 * - h-[calc(100%-12px)]
 * - hover:w-[120px]
 * - md:px-[16px]
 * - hover:md:w-[200px]
 *
 * Важно: ищем именно цельный utility token, чтобы не терять `w-` перед `[ ... ]`.
 */
function tokenizeChunk(code: string): Set<string> {
    const result = new Set<string>()

    const pattern =
        /(?<![a-zA-Z0-9-_])((?:(?:hover|focus|active|sm|md|lg):)*[a-zA-Z][a-zA-Z0-9-]*-\[(?:[^[\]\r\n]|(?:\[[^[\]\r\n]*\]))+\])(?![a-zA-Z0-9-_])/g

    for (const match of code.matchAll(pattern)) {
        const token = stripEdgeGarbage(match[1] || '')

        if (!looksLikeArbitraryUtility(token)) continue

        result.add(token)
    }

    return result
}

/**
 * Сначала пробуем быстрый extraction из class / :class.
 * Если не удалось извлечь токены — fallback на полный текст файла.
 */
export function tokenize(code: string): Set<string> {
    const classCandidates = extractClassCandidates(code)

    if (classCandidates.length > 0) {
        const result = new Set<string>()

        for (const candidate of classCandidates) {
            const chunkTokens = tokenizeChunk(candidate)

            for (const token of chunkTokens) {
                result.add(token)
            }
        }

        if (result.size > 0) {
            return result
        }
    }

    return tokenizeChunk(code)
}

export function parseToken(token: string): ParsedToken | null {
    const parts = token.split(':').filter(Boolean)
    if (!parts.length) return null

    const utility = parts[parts.length - 1]
    const variants = parts.slice(0, -1)

    if (!utility.includes('-[') || !utility.endsWith(']')) return null

    return {
        raw: token,
        variants,
        utility,
    }
}

// -----------------------------------------------------------------------------
// Rule factories
// -----------------------------------------------------------------------------
export function createArbitraryRule(
    name: string,
    matcher: RegExp,
    declFactory: (value: string) => string[],
    valueValidator?: (value: string) => boolean
): UtilityRule {
    return {
        name,
        match(utility: string): RuleMatch | null {
            const match = utility.match(matcher)
            if (!match) return null

            const rawValue = match[1]
            if (!rawValue) return null

            const value = normalizeValue(rawValue)

            if (!value || !isSafeCssValue(value)) return null
            if (valueValidator && !valueValidator(value)) return null

            return {
                declarations: declFactory(value),
            }
        },
    }
}

export function createMultiDeclRule(
    name: string,
    matcher: RegExp,
    properties: string[],
    valueValidator?: (value: string) => boolean
): UtilityRule {
    return createArbitraryRule(
        name,
        matcher,
        (value) => properties.map((prop) => `${prop}: ${value} !important;`),
        valueValidator
    )
}

export const RULES: UtilityRule[] = Object.values(rules)

export function resolveRule(utility: string): CssBody | null {
    for (const rule of RULES) {
        const match = rule.match(utility)
        if (match) {
            return { declarations: match.declarations }
        }
    }

    return null
}

/**
 * Форматируем математические выражения только внутри CSS math functions,
 * чтобы не ломать url(), обычные строки и прочие значения.
 */
function formatMathFunctions(value: string): string {
    return value.replace(
        /\b(calc|min|max|clamp)\(([^()]+)\)/g,
        (_, fn: string, expr: string) => {
            const formatted = expr
                .replace(/\s*([+\-*/])\s*/g, ' $1 ')
                .replace(/\s+/g, ' ')
                .trim()

            return `${fn}(${formatted})`
        }
    )
}

export function buildCssRule(
    parsed: ParsedToken,
    cssBody: CssBody,
    breakpoints: Record<string, number>
): string | null {
    const baseSelector = `.${escapeCssSelector(parsed.raw)}`
    const body = cssBody.declarations
        .map((decl) =>
            decl.replace(/:\s*([^;]+)(;?)$/, (_, value: string, semicolon: string) => {
                return `: ${formatMathFunctions(value.trim())}${semicolon}`
            })
        )
        .join('')

    const selectorVariants: string[] = []
    const mediaVariants: string[] = []

    for (const variant of parsed.variants) {
        if (PSEUDO_VARIANTS.has(variant)) {
            selectorVariants.push(variant)
            continue
        }

        if (variant in breakpoints) {
            mediaVariants.push(variant)
            continue
        }

        return null
    }

    let selector = baseSelector

    for (const variant of selectorVariants) {
        selector += `:${variant}`
    }

    let result = `${selector}{${body}}`

    for (const variant of mediaVariants.reverse()) {
        const minWidth = breakpoints[variant]
        result = `@media (min-width: ${minWidth}px) { ${result} }`
    }

    return result
}

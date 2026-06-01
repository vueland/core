import { describe, expect, it } from 'vitest'
import {
    buildCssRule,
    DEFAULT_BREAKPOINTS,
    extractClassCandidates,
    parseToken,
    resolveRule,
    tokenize,
} from '../src/core'

describe('extractClassCandidates', () => {
    it('извлекает обычный class', () => {
        const code = `<div class="w-[200px] h-[100px]"></div>`
        const result = extractClassCandidates(code)

        expect(result).toEqual(['w-[200px] h-[100px]'])
    })

    it('извлекает :class', () => {
        const code = `<div :class="['w-[200px]', active && 'px-[16px]']"></div>`
        const result = extractClassCandidates(code)

        expect(result).toEqual([`['w-[200px]', active && 'px-[16px]']`])
    })

    it('не путает class и :class', () => {
        const code = `
      <div
        class="w-[100px]"
        :class="['h-[200px]', isActive && 'px-[16px]']"
      ></div>
    `
        const result = extractClassCandidates(code)

        expect(result).toEqual([
            `['h-[200px]', isActive && 'px-[16px]']`,
            'w-[100px]',
        ])
    })
})

describe('tokenize', () => {
    it('извлекает arbitrary utility классы из обычного class', () => {
        const code = `
      <div class="w-[200px] h-[100px] px-[16px]"></div>
    `

        const tokens = tokenize(code)

        expect(tokens.has('w-[200px]')).toBe(true)
        expect(tokens.has('h-[100px]')).toBe(true)
        expect(tokens.has('px-[16px]')).toBe(true)
        expect(tokens.size).toBe(3)
    })

    it('игнорирует обычные классы без arbitrary значения', () => {
        const code = `<div class="foo bar baz"></div>`
        const tokens = tokenize(code)

        expect(tokens.size).toBe(0)
    })

    it('сохраняет токены с variants', () => {
        const code = `
      <div class="hover:w-[200px] md:px-[24px] active:r-[12px]"></div>
    `
        const tokens = tokenize(code)

        expect(tokens.has('hover:w-[200px]')).toBe(true)
        expect(tokens.has('md:px-[24px]')).toBe(true)
        expect(tokens.has('active:r-[12px]')).toBe(true)
    })

    it('вытаскивает статические arbitrary токены из :class выражения', () => {
        const code = `
      <div :class="['w-[200px]', isActive && 'px-[16px]', cond ? 'r-[12px]' : '']"></div>
    `
        const tokens = tokenize(code)

        expect(tokens.has('w-[200px]')).toBe(true)
        expect(tokens.has('px-[16px]')).toBe(true)
        expect(tokens.has('r-[12px]')).toBe(true)
        expect(tokens.size).toBe(3)
    })

    it('вытаскивает статические arbitrary токены из object syntax', () => {
        const code = `
      <div :class="{ 'w-[200px]': true, 'px-[16px]': isActive, 'rtl-[8px]': cond, foo: bar }"></div>
    `
        const tokens = tokenize(code)

        expect(tokens.has('w-[200px]')).toBe(true)
        expect(tokens.has('px-[16px]')).toBe(true)
        expect(tokens.has('rtl-[8px]')).toBe(true)
        expect(tokens.size).toBe(3)
    })

    it('очищает мусорные символы по краям токена', () => {
        const code = `
      {
        'w-[200px]'
        "h-[100px]"
        \`px-[16px]\`
        (r-[12px]),
      }
    `
        const tokens = tokenize(code)

        expect(tokens.has('w-[200px]')).toBe(true)
        expect(tokens.has('h-[100px]')).toBe(true)
        expect(tokens.has('px-[16px]')).toBe(true)
        expect(tokens.has('r-[12px]')).toBe(true)
        expect(tokens.size).toBe(4)
    })

    it('обрезает лишние символы после закрывающей ]', () => {
        const code = `
      const cls = "w-[200px], h-[100px]; px-[16px]) rtr-[10px];"
    `
        const tokens = tokenize(code)

        expect(tokens.has('w-[200px]')).toBe(true)
        expect(tokens.has('h-[100px]')).toBe(true)
        expect(tokens.has('px-[16px]')).toBe(true)
        expect(tokens.has('rtr-[10px]')).toBe(true)
        expect(tokens.size).toBe(4)
    })

    it('игнорирует html и комментарии', () => {
        const code = `
      <!-- w-[999px] -->
      </div>
      <div/>
      <span class="w-[200px]"></span>
    `
        const tokens = tokenize(code)

        expect(tokens.has('w-[200px]')).toBe(true)
        expect(tokens.has('w-[999px]')).toBe(false)
        expect(tokens.size).toBe(1)
    })

    it('игнорирует токены без закрывающей скобки', () => {
        const code = `
      w-[200px
      h-[100px
      px-[16px]
    `
        const tokens = tokenize(code)

        expect(tokens.has('w-[200px')).toBe(false)
        expect(tokens.has('h-[100px')).toBe(false)
        expect(tokens.has('px-[16px]')).toBe(true)
        expect(tokens.size).toBe(1)
    })

    it('игнорирует токены без префикса перед -[', () => {
        const code = `
      [200px]
      -[100px]
      w-[300px]
    `
        const tokens = tokenize(code)

        expect(tokens.has('[200px]')).toBe(false)
        expect(tokens.has('-[100px]')).toBe(false)
        expect(tokens.has('w-[300px]')).toBe(true)
        expect(tokens.size).toBe(1)
    })

    it('удаляет дубликаты токенов', () => {
        const code = `
      <div class="w-[200px] w-[200px] w-[200px]"></div>
    `
        const tokens = tokenize(code)

        expect(tokens.has('w-[200px]')).toBe(true)
        expect(tokens.size).toBe(1)
    })

    it('использует fallback на полный текст, если class-секции нет', () => {
        const code = `
      const cls = 'w-[200px]'
      const cls2 = 'px-[16px]'
      const cls3 = 'r-[12px]'
    `
        const tokens = tokenize(code)

        expect(tokens.has('w-[200px]')).toBe(true)
        expect(tokens.has('px-[16px]')).toBe(true)
        expect(tokens.has('r-[12px]')).toBe(true)
        expect(tokens.size).toBe(3)
    })

    it('использует fallback на полный текст, если class-секция есть, но токены из нее не извлеклись', () => {
        const code = `
      <div class="foo bar baz"></div>

      const cls = 'w-[200px]'
      const cls2 = 'px-[16px]'
    `
        const tokens = tokenize(code)

        expect(tokens.has('w-[200px]')).toBe(true)
        expect(tokens.has('px-[16px]')).toBe(true)
        expect(tokens.size).toBe(2)
    })

    it('игнорирует слишком длинные токены', () => {
        const longValue = 'a'.repeat(200)
        const code = `<div class="w-[${longValue}]"></div>`
        const tokens = tokenize(code)

        expect(tokens.size).toBe(0)
    })
})

describe('parseToken', () => {
    it('корректно парсит простой токен', () => {
        expect(parseToken('w-[200px]')).toEqual({
            raw: 'w-[200px]',
            variants: [],
            utility: 'w-[200px]',
        })
    })

    it('корректно парсит токен с variants', () => {
        expect(parseToken('hover:md:w-[200px]')).toEqual({
            raw: 'hover:md:w-[200px]',
            variants: ['hover', 'md'],
            utility: 'w-[200px]',
        })
    })

    it('возвращает null для некорректных токенов', () => {
        expect(parseToken('foo')).toBeNull()
        expect(parseToken('w-[200px')).toBeNull()
    })
})

describe('resolveRule', () => {
    it('разрешает правило width', () => {
        const result = resolveRule('w-[200px]')
        expect(result).toEqual({
            declarations: ['width: 200px !important;'],
        })
    })

    it('разрешает правило width с calc()', () => {
        const result = resolveRule('w-[calc(100%-32px)]')
        expect(result).toEqual({
            declarations: ['width: calc(100%-32px) !important;'],
        })
    })

    it('разрешает правило width с var()', () => {
        const result = resolveRule('w-[var(--size)]')
        expect(result).toEqual({
            declarations: ['width: var(--size) !important;'],
        })
    })

    it('разрешает правило px (padding-left/right)', () => {
        const result = resolveRule('px-[16px]')
        expect(result).toEqual({
            declarations: [
                'padding-left: 16px !important;',
                'padding-right: 16px !important;',
            ],
        })
    })

    it('не разрешает padding auto', () => {
        expect(resolveRule('px-[auto]')).toBeNull()
        expect(resolveRule('pt-[auto]')).toBeNull()
    })

    it('разрешает правило mx (margin-left/right) с auto', () => {
        const result = resolveRule('mx-[auto]')
        expect(result).toEqual({
            declarations: [
                'margin-left: auto !important;',
                'margin-right: auto !important;',
            ],
        })
    })

    it('разрешает правило margin с calc()', () => {
        const result = resolveRule('mt-[calc(100%-16px)]')
        expect(result).toEqual({
            declarations: ['margin-top: calc(100%-16px) !important;'],
        })
    })

    it('разрешает правило r (border-radius)', () => {
        const result = resolveRule('r-[12px]')
        expect(result).toEqual({
            declarations: ['border-radius: 12px !important;'],
        })
    })

    it('разрешает правило rtl (top-left radius)', () => {
        const result = resolveRule('rtl-[8px]')
        expect(result).toEqual({
            declarations: ['border-top-left-radius: 8px !important;'],
        })
    })

    it('разрешает правило rtr (top-right radius)', () => {
        const result = resolveRule('rtr-[10px]')
        expect(result).toEqual({
            declarations: ['border-top-right-radius: 10px !important;'],
        })
    })

    it('разрешает правило rbl (bottom-left radius)', () => {
        const result = resolveRule('rbl-[14px]')
        expect(result).toEqual({
            declarations: ['border-bottom-left-radius: 14px !important;'],
        })
    })

    it('разрешает правило rbr (bottom-right radius)', () => {
        const result = resolveRule('rbr-[50%]')
        expect(result).toEqual({
            declarations: ['border-bottom-right-radius: 50% !important;'],
        })
    })

    it('не разрешает мусорные radius значения', () => {
        expect(resolveRule('r-[.]')).toBeNull()
        expect(resolveRule('r-[%]')).toBeNull()
        expect(resolveRule('r-[abc]')).toBeNull()
    })

    it('разрешает правило z-index с числом', () => {
        const result = resolveRule('z-[10]')
        expect(result).toEqual({
            declarations: ['z-index: 10 !important;'],
        })
    })

    it('разрешает правило z-index с auto', () => {
        const result = resolveRule('z-[auto]')
        expect(result).toEqual({
            declarations: ['z-index: auto !important;'],
        })
    })

    it('разрешает правило z-index с var()', () => {
        const result = resolveRule('z-[var(--z-index)]')
        expect(result).toEqual({
            declarations: ['z-index: var(--z-index) !important;'],
        })
    })

    it('не разрешает мусорные z-index значения', () => {
        expect(resolveRule('z-[.]')).toBeNull()
        expect(resolveRule('z-[10px]')).toBeNull()
    })

    it('возвращает null для неизвестного utility', () => {
        expect(resolveRule('unknown-[1px]')).toBeNull()
    })
})

describe('buildCssRule', () => {
    it('генерирует обычное CSS правило', () => {
        const parsed = parseToken('w-[200px]')
        const cssBody = resolveRule('w-[200px]')

        const result = buildCssRule(parsed!, cssBody!, DEFAULT_BREAKPOINTS)

        expect(result).toBe('.w-\\[200px\\]{width: 200px !important;}')
    })

    it('генерирует правило с pseudo variant', () => {
        const parsed = parseToken('hover:w-[200px]')
        const cssBody = resolveRule('w-[200px]')

        const result = buildCssRule(parsed!, cssBody!, DEFAULT_BREAKPOINTS)

        expect(result).toBe('.hover\\:w-\\[200px\\]:hover{width: 200px !important;}')
    })

    it('генерирует media query для breakpoint', () => {
        const parsed = parseToken('md:w-[300px]')
        const cssBody = resolveRule('w-[300px]')

        const result = buildCssRule(parsed!, cssBody!, DEFAULT_BREAKPOINTS)

        expect(result).toBe(
            '@media (min-width: 768px) { .md\\:w-\\[300px\\]{width: 300px !important;} }'
        )
    })

    it('генерирует комбинацию pseudo + media', () => {
        const parsed = parseToken('hover:md:px-[24px]')
        const cssBody = resolveRule('px-[24px]')

        const result = buildCssRule(parsed!, cssBody!, DEFAULT_BREAKPOINTS)

        expect(result).toBe(
            '@media (min-width: 768px) { .hover\\:md\\:px-\\[24px\\]:hover{padding-left: 24px !important;padding-right: 24px !important;} }'
        )
    })

    it('генерирует radius utility', () => {
        const parsed = parseToken('r-[12px]')
        const cssBody = resolveRule('r-[12px]')

        const result = buildCssRule(parsed!, cssBody!, DEFAULT_BREAKPOINTS)

        expect(result).toBe('.r-\\[12px\\]{border-radius: 12px !important;}')
    })

    it('генерирует corner radius utility', () => {
        const parsed = parseToken('rtl-[8px]')
        const cssBody = resolveRule('rtl-[8px]')

        const result = buildCssRule(parsed!, cssBody!, DEFAULT_BREAKPOINTS)

        expect(result).toBe('.rtl-\\[8px\\]{border-top-left-radius: 8px !important;}')
    })

    it('возвращает null для неизвестного variant', () => {
        const parsed = parseToken('dark:w-[200px]')
        const cssBody = resolveRule('w-[200px]')

        const result = buildCssRule(parsed!, cssBody!, DEFAULT_BREAKPOINTS)

        expect(result).toBeNull()
    })

    it('поддерживает пользовательские breakpoints', () => {
        const parsed = parseToken('xl:w-[1200px]')
        const cssBody = resolveRule('w-[1200px]')

        const result = buildCssRule(parsed!, cssBody!, {
            xl: 1440,
        })

        expect(result).toBe(
            '@media (min-width: 1440px) { .xl\\:w-\\[1200px\\]{width: 1200px !important;} }'
        )
    })
})

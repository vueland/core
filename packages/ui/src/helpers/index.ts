export const toCamelCase = (...args: string[]): string => args.reduce((res, s, i) => {
    if (i === 0) res += s
    else res += s[0].toUpperCase() + s.slice(1)
    return res
}, '')

export const isDef = (val: any) => (val ?? null) !== null
export const isNotEmpty = (val: any) => isDef(val) && !!`${val}`.trim()
export const unique = (val: string) => {
    let hash = 0

    for (const char of val) {
        hash = Math.imul(31, hash) + char.charCodeAt(0) | 0
    }

    return Math.abs(hash).toString(36)
}

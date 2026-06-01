const CSS_NUMBER_RE = /^-?(?:\d+|\d*\.\d+)$/
const CSS_LENGTH_UNIT_RE = /(?:px|r?em|%|vw|vh|vmin|vmax|ch|ex|cm|mm|in|pt|pc)/
const CSS_LENGTH_RE = new RegExp(
    `^-?(?:\\d+|\\d*\\.\\d+)${CSS_LENGTH_UNIT_RE.source}$`
)

function isFunctionalCssValue(value: string): boolean {
    return /^(?:calc|min|max|clamp|var)\(.+\)$/.test(value)
}

function isLengthLikeValue(value: string): boolean {
    return CSS_LENGTH_RE.test(value) || isFunctionalCssValue(value)
}

export function isSizeValue(value: string): boolean {
    return isLengthLikeValue(value)
}

export function isPaddingValue(value: string): boolean {
    return isLengthLikeValue(value)
}

export function isMarginValue(value: string): boolean {
    return value === 'auto' || isLengthLikeValue(value)
}

export function isRadiusValue(value: string): boolean {
    return isLengthLikeValue(value)
}

export function isPositionValue(value: string): boolean {
    return isLengthLikeValue(value)
}

export function isZIndexValue(value: string): boolean {
    return value === 'auto' || CSS_NUMBER_RE.test(value) || /^var\(.+\)$/.test(value)
}

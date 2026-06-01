export function convertToUnit(str: string | number, unit = 'px'): string {
    if (isNaN(+str!)) {
        return `${str}`
    } else {
        return `${str}${unit}`
    }
}

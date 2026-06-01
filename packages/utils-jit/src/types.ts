export type CoreUiJitOptions = {
    include?: RegExp[]
    outFile?: string,
    breakpoints?: Record<string, number>
}

export type ParsedToken = {
    raw: string
    variants: string[]
    utility: string
}

export type CssBody = {
    declarations: string[]
}

export type RuleMatch = {
    declarations: string[]
}

export type UtilityRule = {
    name: string
    match: (utility: string) => RuleMatch | null
}

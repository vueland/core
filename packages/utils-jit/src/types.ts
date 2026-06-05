export type JitOptions = {
    include?: RegExp[]
    outFile?: string,
    breakpoints?: Record<string, number>
    rules?: UtilityRule[]
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

export type RuleOptions = {
    name: string,
    matcher: RegExp
    validate: (value: string) => boolean
    declaration: (value: string) => Record<string, string>
}

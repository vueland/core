export type ButtonPreset = {
    root?: string[]
    label?: string[]
}

export type MenuPreset = {
    root?: string[]
    opened?: {
        root?: string[]
    }
    closed?: {
        root?: string[]
    }
}

export type InputPreset = {
    root?: string[]
    field?: string[]
    input?: string[]
    label?: string[]
    details?: string[]
    prepend?: string[]
    append?: string[]

    focused?: {
        root?: string[]
        field?: string[]
        label?: string[]
        append?: string[]
    }

    error?: {
        root?: string[]
        field?: string[]
        label?: string[]
        input?: string[]
        details?: string[]
    }

    disabled?: {
        root?: string[]
        field?: string[]
        input?: string[]
        label?: string[]
    }

    readonly?: {
        root?: string[]
        field?: string[]
        input?: string[]
    }

    hasValue?: {
        root?: string[]
        label?: string[]
    }

    hasPrepend?: {
        root?: string[]
        field?: string[]
        input?: string[]
        label?: string[]
        prepend?: string[]
    }

    hasAppend?: {
        root?: string[]
        field?: string[]
        input?: string[]
        append?: string[]
    }
}

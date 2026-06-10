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

export type FieldPreset = {
    root?: string[]
    input?: string[]
    label?: string[]
    prepend?: string[]
    append?: string[]

    filled?: {
        root?: string[]
        input?: string[]
        label?: string[]
        prepend?: string[]
        append?: string[]
    }

    prepended?: {
        root?: string[]
        input?: string[]
        label?: string[]
        prepend?: string[]
        append?: string[]
    }

    appended?: {
        root?: string[]
        input?: string[]
        label?: string[]
        prepend?: string[]
        append?: string[]
    }
}

export type InputPreset = {
    root?: string[]
    field?: string
    details?: string[]

    focused?: {
        root?: string[]
        field?: string // Название пресета филда
        details?: string[]
    }

    error?: {
        root?: string[]
        field?: string // Название пресета филда
        details?: string[]
    }

    disabled?: {
        root?: string[]
        field?: string // Название пресета филда
        details?: string[]
    }

    readonly?: {
        root?: string[]
        field?: string
        details?: string[]
    }
}

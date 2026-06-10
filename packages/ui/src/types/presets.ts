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

type FieldPresetState = {
    root?: string[]
    input?: string[]
    label?: string[]
    prepend?: string[]
    append?: string[]
}

export type FieldPreset = FieldPresetState & {
    focused?: FieldPresetState
    error?: FieldPresetState
    disabled?: FieldPresetState
    readonly?: FieldPresetState

    filled?: FieldPresetState
    prepended?: FieldPresetState
    appended?: FieldPresetState
}

export type InputPreset = {
    root?: string[]
    field?: string
    details?: string[]

    focused?: {
        root?: string[]
        field?: string
        details?: string[]
    }

    error?: {
        root?: string[]
        field?: string
        details?: string[]
    }

    disabled?: {
        root?: string[]
        field?: string
        details?: string[]
    }

    readonly?: {
        root?: string[]
        field?: string
        details?: string[]
    }
}

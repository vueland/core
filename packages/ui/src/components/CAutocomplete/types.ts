export type CAutocompleteProps<T> = {
    modelValue: T | T[]
    items: T[],
    multiple?: boolean
    options?: {
        extKey?: string
        noItemsMessage?: string
        menuPreset?: string
    },
}

export type CAutocompleteSlots<T> = {
    menu(props: { items: T[], onSelect(val: T): void }): void
    ['no-items-message'](): string
}

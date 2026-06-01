export type CSelectProps<T> = {
    modelValue: T | T[]
    items: T[],
    multiple?: boolean
    options?: {
        extKey?: string
        noItemsMessage?: string
    },
}

export type CSelectSlots<T> = {
    menu(props: { items: T[], onSelect(item: T): void }): void
    ['no-items-message'](): string
}

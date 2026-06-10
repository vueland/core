import type { VNode } from 'vue'

import type { CInputSlots } from '../CInput'

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
    field: CInputSlots['field']
    prepend(): VNode
    append(): VNode
    selects(props: { items: T[] }): VNode[]
    details(props: {
        errorMessage?: string
        details?: string
    }): VNode
    ['no-items-message'](): string
}

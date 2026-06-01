import type { VNode } from 'vue'

export type CListProps<T> = {
    modelValue?: T | T[] | null
    multiple?: boolean
    mandatory?: boolean
    readonly?: boolean
}

export type CListSlots<T> = {
    default?(props: {
        select(item: T): void
        unselect(item: T): void
        isActive(item: T): boolean
    }): VNode | VNode[]
}

import type { VNode } from 'vue'

export type CCheckboxProps<T> = {
    modelValue: T | T[] | boolean
    size?: number
}

export type CCheckboxSlots = {
    icon(props: { checked: boolean }): VNode
    default(): VNode
}

export type CCheckboxEvents<T> = {
    (e: 'update:modelValue', value: T): void
}

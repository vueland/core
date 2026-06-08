import type { VNode } from 'vue'

import type { ValidateProps } from '../../composables'

export type CCheckboxProps<T> =
    Omit<ValidateProps, 'validateOn'> & {
    modelValue: T | T[] | boolean
    label?: string
    size?: number
}

export type CCheckboxSlots = {
    icon(props: { checked: boolean }): VNode
    default(): VNode
}

export type CCheckboxEvents<T> = {
    (e: 'update:modelValue', value: T): void
}

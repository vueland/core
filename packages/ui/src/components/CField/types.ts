import type { VNode } from 'vue'

export type CFieldProps = {
    tag?: 'input' | 'textarea'
    label?: string
    filled?: boolean
    preset?: string
    focused?: boolean
    clearable?: boolean,
    modelValue: string | number | undefined | null
    error?: boolean
}

export type CFieldSlots = {
    prepend?(): VNode
    append?(): VNode
    before?(): VNode | VNode[]
    after?(): VNode | VNode[]
}

import type { VNode } from 'vue'

import type { PresetProps, ValidateProps, ValidateState } from '../../composables'

export interface InputState {
    focused: boolean
    isDirty: boolean
}

export type CInputProps<T = any> =
    ValidateProps &
    PresetProps & {
    id?: string
    modelValue: T
    label?: string
    details?: string
    noDetails?: boolean
    clearable?: boolean
    disabled?: boolean
    focused?: boolean
    readonly?: boolean
}

export type CInputEmits<T = any> = {
    focus: [boolean]
    blur: [boolean]
    input: [T]
}

export type CInputSlots<T = any> = {
    label?(props: { uid: string }): VNode | string
    prepend?(): VNode | string
    clear?(): VNode | string
    append?(): VNode | string
    details?(props: {
        errorMessage: ValidateState['errorMessage']
        hasError: ValidateState['hasError']
        uid: string
        details?: string
    }): VNode | string
    field?(props: {
        input(val: T): void
        focus(): void
        blur(): void
        reset(): void
        label?: string
        readonly?: boolean
        focused?: boolean
        disabled?: boolean
        clearable?: boolean
        activator?: any
        preset?: string
        errorMessage: ValidateState['errorMessage']
        hasError: ValidateState['hasError']
        attrs: Record<string, any>
        uid: string
        validate(): boolean
    }): VNode
}

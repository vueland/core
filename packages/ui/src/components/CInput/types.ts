import type { PresetProps, ValidateProps, ValidateState } from '../../composables'
import type { VNode } from 'vue'

export interface InputState {
    focused: boolean
    isDirty: boolean
    hasValue: boolean
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
    clear: []
    ['update:modelValue']: [T]
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
        onInput(val: T): void
        onFocus(): void
        onBlur(): void
        onClear(): void
        label?: string
        readonly?: boolean
        focused?: boolean
        disabled?: boolean
        presets?: string[] | string[][]
        errorMessage: ValidateState['errorMessage']
        hasError: ValidateState['hasError']
        attrs: Record<string, any>
        uid: string
        validate(): boolean
    }): VNode
}

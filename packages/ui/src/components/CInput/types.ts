import type { InputStateProps, PresetProps, ValidateProps, ValidateState } from '../../composables'
import type { VNode } from 'vue'

export type CInputProps<T = any> =
    ValidateProps &
    InputStateProps &
    PresetProps & {
    id?: string
    modelValue: T
    label?: string
    details?: string
    noDetails?: boolean
    clearable?: boolean
}

export type CInputSlots = {
    label?(props: { uid: string }): VNode | string
    prepend?(): VNode | string
    append?(): VNode | string
    details?(props: {
        errorMessage: ValidateState['errorMessage']
        hasError: ValidateState['hasError']
        uid: string
    }): VNode | string
    field?(props: {
        onInput(): void
        onFocus(): void
        onBlur(): void
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

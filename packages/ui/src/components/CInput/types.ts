import type { InputStateProps, PresetProps, ValidateProps, ValidateState } from '../../composables'
import type { VNode } from 'vue'

export type CInputProps<T = any> =
    ValidateProps &
    InputStateProps &
    PresetProps & {
        modelValue: T
        label?: string
        details?: string
        noDetails?: boolean
    }

export type CInputSlots = {
    label?(): VNode | string
    prepend?(): VNode | string
    append?(): VNode | string
    details?(props: {
        errorMessage: ValidateState['errorMessage']
        hasError: ValidateState['hasError']
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

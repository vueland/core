import { computed, unref } from 'vue'
import { usePresets } from './use-presets'
import type { InputPreset } from '../types'
import type { CInputProps, CInputSlots, InputState } from '../components'
import type { ValidateState } from './use-validate'

const EMPTY_INPUT_PRESETS = {
    root: [],
    field: [],
    input: [],
    label: [],
    details: [],
    prepend: [],
    append: [],
}
export function useInputPresets({ props, errors, slots, state }: {
    props: CInputProps
    errors: ValidateState
    state: InputState
    slots: CInputSlots
}) {
    const presets = usePresets<InputPreset>(props)

    return computed(() => {
        if (!props.preset) {
            return EMPTY_INPUT_PRESETS
        }

        const preset = unref(presets)
        const { focused, hasValue } = state
        const { hasError, errorMessage } = errors
        const { disabled, readonly } = props
        const hasPrepend = !!slots.prepend
        const hasAppend = !!slots.append

        return {
            root: [
                ...(!hasError ? preset?.root ?? [] : []),
                ...(focused ? preset?.focused?.root ?? [] : []),
                ...(hasError ? preset?.error?.root ?? [] : []),
                ...(disabled ? preset?.disabled?.root ?? [] : []),
                ...(readonly ? preset?.readonly?.root ?? [] : []),
                ...(hasValue ? preset?.hasValue?.root ?? [] : []),
                ...(hasPrepend ? preset?.hasPrepend?.root ?? [] : []),
                ...(hasAppend ? preset?.hasAppend?.root ?? [] : []),
            ],

            field: [
                ...(preset?.field ?? []),
                ...(focused ? preset?.focused?.field ?? [] : []),
                ...(hasError ? preset?.error?.field ?? [] : []),
                ...(disabled ? preset?.disabled?.field ?? [] : []),
                ...(readonly ? preset?.readonly?.field ?? [] : []),
                ...(hasPrepend ? preset?.hasPrepend?.field ?? [] : []),
                ...(hasAppend ? preset?.hasAppend?.field ?? [] : []),
            ],

            input: [
                ...(preset?.input ?? []),
                ...(hasError ? preset?.error?.input ?? [] : []),
                ...(disabled ? preset?.disabled?.input ?? [] : []),
                ...(readonly ? preset?.readonly?.input ?? [] : []),
                ...(hasPrepend ? preset?.hasPrepend?.input ?? [] : []),
                ...(hasAppend ? preset?.hasAppend?.input ?? [] : []),
            ],

            label: [
                ...(!hasError && !disabled ? preset?.label ?? [] : []),
                ...(focused ? preset?.focused?.label ?? [] : []),
                ...(hasError && !disabled ? preset?.error?.label ?? [] : []),
                ...(disabled ? preset?.disabled?.label ?? [] : []),
                ...(hasValue ? preset?.hasValue?.label ?? [] : []),
                ...(hasPrepend ? preset?.hasPrepend?.label ?? [] : []),
            ],

            details: [
                ...(preset?.details ?? []),
                ...(errorMessage ? preset?.error?.details ?? [] : []),
            ],

            prepend: [
                ...(preset?.prepend ?? []),
                ...(hasPrepend ? preset?.hasPrepend?.prepend ?? [] : []),
            ],

            append: [
                ...(preset?.append ?? []),
                ...(focused ? preset?.focused?.append ?? [] : []),
                ...(hasAppend ? preset?.hasAppend?.append ?? [] : []),
            ],
        }
    })
}

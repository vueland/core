import { computed, unref } from 'vue'

import type { CInputProps, CInputSlots, InputState } from '../components'
import { getPresetIf, getPresetOnly, type PresetCondition } from '../helpers'
import type { InputPreset } from '../types'

import { usePresets } from './use-presets'
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

type InputPresetZone =
    | 'root'
    | 'field'
    | 'input'
    | 'label'
    | 'details'
    | 'prepend'
    | 'append'

type InputPresetState =
    | 'focused'
    | 'error'
    | 'disabled'
    | 'readonly'

export type PresetClassValue =
    | string
    | string[]
    | string[][]
    | undefined
    | null
    | false

export function useInputPresets({
    props,
    errors,
    slots,
    state,
}: {
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

        const focused = state.focused
        const hasValue = state.hasValue
        const hasError = errors.hasError
        const hasErrorMessage = !!errors.errorMessage
        const disabled = !!props.disabled
        const readonly = !!props.readonly
        const hasPrepend = !!slots.prepend
        const hasAppend = !!slots.append
        const isActive = !disabled && !readonly

        const interactionState: PresetCondition<InputPresetState>[] = [
            ['disabled', disabled],
            ['readonly', readonly],
            ['error', hasError],
            ['focused', focused && isActive],
        ]

        const only = (zone: InputPresetZone) => (
            getPresetOnly(preset, zone, interactionState)
        )

        return {
            root: [
                ...only('root'),
                ...getPresetIf(hasValue, preset?.hasValue?.root),
                ...getPresetIf(hasPrepend, preset?.hasPrepend?.root),
                ...getPresetIf(hasAppend, preset?.hasAppend?.root),
            ],

            field: [
                ...only('field'),
                ...getPresetIf(hasPrepend, preset?.hasPrepend?.field),
                ...getPresetIf(hasAppend, preset?.hasAppend?.field),
            ],

            input: [
                ...only('input'),
                ...getPresetIf(hasPrepend, preset?.hasPrepend?.input),
                ...getPresetIf(hasAppend, preset?.hasAppend?.input),
            ],

            label: [
                ...only('label'),
                ...getPresetIf(hasValue, preset?.hasValue?.label),
                ...getPresetIf(hasPrepend, preset?.hasPrepend?.label),
            ],

            details: [
                ...getPresetOnly(preset, 'details', [
                    ['error', hasErrorMessage],
                ]),
            ],

            prepend: [
                ...getPresetOnly(preset, 'prepend', []),
                ...getPresetIf(hasPrepend, preset?.hasPrepend?.prepend),
            ],

            append: [
                ...getPresetOnly(preset, 'append', [
                    ['focused', focused && isActive],
                ]),
                ...getPresetIf(hasAppend, preset?.hasAppend?.append),
            ],
        }
    })
}

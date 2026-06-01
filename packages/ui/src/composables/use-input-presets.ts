import { computed, type Ref, unref } from 'vue'
import { usePresets } from './use-presets'
import type { InputPreset } from '../types'
import type { CInputProps } from '../components'

export function useInputPresets({ props, hasError }: {
    props: CInputProps
    hasError: Ref<boolean>
    focused: Ref<boolean>
}) {
    const presets = usePresets<InputPreset>(props)

    return computed(() => ({
        root: props.preset ? [
            ...(!unref(hasError) ? unref(presets)?.root ?? [] : []),
            ...(unref(hasError) ? unref(presets)?.error?.root ?? [] : [])
        ] : [],
        label: props.preset ? [
            ...(props.disabled ? unref(presets)?.disabled?.label ?? [] : []),
            ...(!unref(hasError) && !props.disabled ? unref(presets)?.label ?? [] : []),
            ...(unref(hasError) && !props.disabled ? unref(presets)?.error?.label ?? [] : []),
        ] : [],
        field: props.preset ? [
            ...(unref(presets)?.field ?? []),
            ...(unref(hasError) ? unref(presets)?.error?.field ?? [] : []),
        ] : [],
        details: props.preset ? [
            ...(unref(presets)?.details ?? []),
            ...(unref(hasError) ? unref(presets)?.error?.details ?? [] : []),
        ] : []
    }))
}

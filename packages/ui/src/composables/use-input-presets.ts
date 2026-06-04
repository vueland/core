import { computed, type ShallowReactive, unref } from 'vue'
import { usePresets } from './use-presets'
import type { InputPreset } from '../types'
import type { CInputProps } from '../components'

export function useInputPresets({ props, errors }: {
    props: CInputProps
    errors: ShallowReactive<any>
    state: ShallowReactive<any>
}) {
    const presets = usePresets<InputPreset>(props)

    return computed(() => ({
        root: props.preset ? [
            ...(!errors.hasError ? unref(presets)?.root ?? [] : []),
            ...(errors.hasError ? unref(presets)?.error?.root ?? [] : [])
        ] : [],
        label: props.preset ? [
            ...(props.disabled ? unref(presets)?.disabled?.label ?? [] : []),
            ...(!errors.hasError && !props.disabled ? unref(presets)?.label ?? [] : []),
            ...(errors.hasError && !props.disabled ? unref(presets)?.error?.label ?? [] : []),
        ] : [],
        field: props.preset ? [
            ...(unref(presets)?.field ?? []),
            ...(errors.hasError ? unref(presets)?.error?.field ?? [] : []),
        ] : [],
        details: props.preset ? [
            ...(unref(presets)?.details ?? []),
            ...(errors.hasError ? unref(presets)?.error?.details ?? [] : []),
        ] : []
    }))
}

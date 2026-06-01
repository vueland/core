import { useCore } from './use-core'
import { computed, type ComputedRef } from 'vue'
import type { Maybe } from '../types'

export type PresetProps = {
    preset?: string
}

export function usePresets<T>(props: PresetProps): ComputedRef<Maybe<T>> {
    return computed<Maybe<T>>(() => {
        if (!props.preset) return undefined

        const core = useCore()

        return props.preset.split('.').reduce((acc, it) => acc[it], core.presets) as T
    })
}

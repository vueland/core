import { computed, unref } from 'vue'
import { usePresets } from './use-presets'
import type { MenuPreset } from '../types'
import type { CMenuProps } from '../components'

export function useMenuPresets({ props }: { props: CMenuProps }) {
    const presets = usePresets<MenuPreset>(props)

    return computed(() => ({
        root: props.preset ? [
            ...(unref(presets)?.root ?? []),
            ...(props.modelValue ? unref(presets)?.opened?.root ?? [] : [])
        ] : []
    }))
}

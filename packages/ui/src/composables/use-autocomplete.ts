import { computed, shallowRef, unref } from 'vue'

import { useSelects } from './use-selects'


export function useAutocomplete<T = any>(props: Record<string, any>) {
    const {
        items,
        extKey,
        hasValue,
        select
    } = useSelects(props)

    const inputValue = shallowRef()

    const normalizedInput = computed(() => unref(inputValue)?.trim().toLowerCase() ?? '')

    const isEqual = computed(() => unref(items).includes(unref(normalizedInput)))

    const searchItems = computed(() => {
        if (unref(isEqual) || !unref(normalizedInput)) {
            return props.items
        }

        return props.items.filter((it: T) => {
            const val = extKey ? it[extKey] : it
            return `${val}`.toLowerCase().startsWith(unref(normalizedInput))
        })
    })

    return {
        items,
        hasValue,
        inputValue,
        searchItems,
        select
    }
}

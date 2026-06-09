import { computed, shallowRef, unref, watchEffect } from 'vue'

import { useInputValue } from './use-input-value'

export function useAutocomplete<T = any>(props: Record<string, any>) {
    const value = useInputValue(props)
    const inputValue = shallowRef()
    const { extKey } = props.options ?? {}

    const normalizedInput = computed(() => unref(inputValue)?.trim().toLowerCase() ?? '')
    const isEqual = computed(() => unref(normalizedInput) === unref(value).toLowerCase())

    const searchItems = computed(() => {
        if (unref(isEqual) || !unref(normalizedInput)) {
            return props.items
        }

        return props.items.filter((it: T) => {
            const val = extKey ? it[extKey] : it
            return `${val}`.toLowerCase().startsWith(unref(normalizedInput))
        })
    })

    function rollbackValue() {
        inputValue.value = unref(value)
    }

    watchEffect(() => rollbackValue())

    return {
        inputValue,
        searchItems,
        rollbackValue
    }
}

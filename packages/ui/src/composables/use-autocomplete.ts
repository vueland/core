import { computed, shallowRef, unref } from 'vue'


export function useAutocomplete<T = any>(props: Record<string, any>) {
    const inputValue = shallowRef()
    const { extKey } = props.options ?? {}

    const selectedItems = computed(() => {
        if (props.multiple) {
            return props.modelValue.map((it: T) => it[extKey] ?? it)
        }

        return [props.modelValue ? `${props.modelValue[extKey] ?? props.modelValue}` : '']
    })

    const normalizedInput = computed(() => unref(inputValue)?.trim().toLowerCase() ?? '')
    const isEqual = computed(() => unref(selectedItems).includes(unref(normalizedInput)))

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
        inputValue,
        searchItems,
        selectedItems,
    }
}

import { computed, type ComputedRef } from 'vue'

export function useInputValue<T = any>(props: Record<string, any>): ComputedRef<string> {
    const { extKey } = props.options ?? {}

    return computed(() => {
        if (props.multiple) {
            return props.modelValue.map((it: T) => it[extKey] ?? it).join(', ')
        }

        return props.modelValue ? `${props.modelValue[extKey] ?? props.modelValue}` : ''
    })
}

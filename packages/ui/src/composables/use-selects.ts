import { computed, getCurrentInstance } from 'vue'

import { isNotEmpty } from '../helpers'

export function useSelects<T>(props: Record<string, any>) {
    const instance = getCurrentInstance()!
    const { extKey } = props.options ?? {}

    const hasValue = computed(() => props.multiple
        ? (props.modelValue as T[])?.length > 0
        : isNotEmpty(props.modelValue)
    )

    const items = computed(() => {
        if (props.multiple) {
            return props.modelValue.map((it: T) => it[extKey] ?? it)
        }

        return [props.modelValue ? `${props.modelValue[extKey] ?? props.modelValue}` : '']
    })

    function select(value: T) {
        instance?.emit('update:modelValue', props.multiple ? [...props.modelValue as T[], value] : value)
    }

    return {
        hasValue,
        extKey,
        items,
        select
    }
}

import { computed, getCurrentInstance } from 'vue'

import { isNotEmpty } from '../helpers'

import type { IterableItemsProps } from './use-normalized-items'

export type SelectableProps<T> = {
    modelValue: T | T[]
    multiple?: boolean
    mandatory?: boolean
}

export function useSelects<T>(props: IterableItemsProps<T> & SelectableProps<T>) {
    const instance = getCurrentInstance()!
    const { titleKey = '' } = props ?? {}

    const hasValue = computed(() => props.multiple
        ? (props.modelValue as T[])?.length > 0
        : isNotEmpty(props.modelValue)
    )

    const selectedItems = computed(() => {
        if (props.multiple) {
            return (props.modelValue as T[]).map((it: T) => it[titleKey] ?? it)
        }

        return [props.modelValue ? `${props.modelValue[titleKey] ?? props.modelValue}` : '']
    })

    function select(value: T) {
        instance?.emit('update:modelValue', props.multiple ? [...props.modelValue as T[], value] : value)
    }

    return {
        hasValue,
        selectedItems,
        select
    }
}

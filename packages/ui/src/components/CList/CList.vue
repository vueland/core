<script setup lang="ts" generic="T">
    import { computed, provide, toRaw, unref, useAttrs } from 'vue'
    import { $LIST_API_KEY } from '../../constants'
    import type { CListProps, CListSlots } from './types'

    defineOptions({
        name: 'CList',
        inheritAttrs: false,
    })

    defineSlots<CListSlots<T>>()

    const {
        multiple = false,
        mandatory = false,
        readonly = false
    } = defineProps<CListProps<T>>()

    const model = defineModel<T | T[] | null>({ default: null })

    const attrs = useAttrs()

    const classes = computed(() => ({
        'c-list--readonly': readonly,
        [attrs.class as string]: !!attrs.class,
    }))

    function onSelect(listItem: T) {
        if (readonly) return

        if (multiple) {
            model.value = [...unref(model) as T[], listItem]
        } else {
            model.value = listItem
        }
    }

    function onUnselect(listItem: T) {
        if ((mandatory && !multiple) || readonly) return

        if (multiple) {
            model.value = (unref(model) as T[])?.filter(item => toRaw(item) !== toRaw(listItem))
        } else {
            model.value = null
        }
    }

    function isActive(listItem: T) {
        if (multiple) {
            return (unref(model) as T[])?.some(item => toRaw(item) === toRaw(listItem))
        } else {
            return toRaw(model.value) === toRaw(listItem)
        }
    }

    provide($LIST_API_KEY, {
        model,
        select: onSelect,
        unselect: onUnselect,
        isActive,
    })
</script>
<template>
    <ul
        class="c-list"
        :class="classes"
    >
        <slot
            :select="onSelect"
            :unselect="onUnselect"
            :is-active="isActive"
        />
    </ul>
</template>

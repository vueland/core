<script setup lang="ts" generic="T = any">
    import { computed, inject, unref } from 'vue'

    import { $LIST_API_KEY } from '../../constants'
    import { isDef } from '../../helpers'

    defineOptions({
        name: 'CListItem',
    })

    const props = defineProps<{
        value?: T
    }>()

    const list = inject($LIST_API_KEY, null)
    
    const isSelected = computed(() => isDef(props.value)
        ? list?.isActive?.(props.value)
        : false
    )

    const classes = computed(() => ({
        'c-list-item--active': unref(isSelected),
    }))

    function onClick() {
        const handler = unref(isSelected) ? list?.unselect : list?.select
        handler?.(props.value)
    }

</script>
<template>
    <li
        class="c-list-item"
        :class="classes"
        @click="onClick"
    >
        <slot>{{ value }}</slot>
    </li>
</template>

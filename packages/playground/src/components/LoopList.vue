<script setup lang="ts">
    import { CList, CListItem } from '@vueland/ui/components'

    defineProps<{
        items: string[]
    }>()
</script>
<template>
    <c-list>
        <c-list-item
            v-for="it in items"
            :key="it"
            :value="it"
        >
            {{ it }}
        </c-list-item>
    </c-list>
</template>

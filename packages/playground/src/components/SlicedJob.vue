<script setup lang="ts">
    import { onBeforeUpdate, onUpdated } from 'vue'
    import LoopList from './LoopList.vue'
    import { CLabel } from '@vueland/ui/components'

    defineProps<{
        label: string
        details?: string
        items: string[]
    }>()

    onBeforeUpdate(() => {
        console.time('sliced')
    })

    onUpdated(() => {
        console.timeEnd('sliced')
    })
</script>
<template>
    <div class="big-job">
        <c-label>{{ label }}</c-label>
        <c-label>{{ details }}</c-label>
        <loop-list :items="items" />
    </div>
</template>

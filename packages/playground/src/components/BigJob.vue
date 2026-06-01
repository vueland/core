<script setup lang="ts">
    import { onBeforeUpdate, onUpdated } from 'vue'

    defineProps<{
        label: string
        details?: string
        items: string[]
    }>()

    onBeforeUpdate(() => {
        console.time('big')
    })

    onUpdated(() => {
        console.timeEnd('big')
    })
</script>
<template>
    <div class="big-job">
        <div class="label">
            {{ label }}
        </div>
        <ul class="list">
            <li
                v-for="(item) in items"
                :key="item"
            >
                {{ item }}
            </li>
        </ul>
    </div>
</template>

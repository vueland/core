<script setup lang="ts">
    import DemoBlock from '../../../.vitepress/components/DemoBlock.vue'
</script>
<template>
    <demo-block class="pa-5 d-flex justify-center items-center">
        <c-tooltip
            top
            open-on-hover
            close-on-leave
            offset-y="5"
            offset-x="-15"
            class="pa-2 elevation-2 bg-blue text-white"
        >
            <template #activator="{ on, activator }">
                <c-btn
                    v-bind="activator"
                    v-on="on"
                >
                    Наведи
                </c-btn>
            </template>
            <div class="content">
                Tooltip текст
            </div>
        </c-tooltip>
    </demo-block>
</template>

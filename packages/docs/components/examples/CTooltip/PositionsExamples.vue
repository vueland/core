<script setup lang="ts">
    import DemoBlock from '../../../.vitepress/components/DemoBlock.vue'
</script>
<template>
    <demo-block class="pa-5 d-flex justify-space-between items-center gap-4">
        <c-tooltip
            top
            open-on-hover
            close-on-leave
            offset-y="5"
            offset-x="-38"
            class="elevation-5 bg-blue-darken-2 text-white pa-2"
            strategy="reverse"
        >
            <template #activator="{ on, activator }">
                <c-btn
                    v-bind="activator"
                    class="elevation-2 bg-blue-darken-2 w-[120px]"
                    v-on="on"
                >
                    Вверх
                </c-btn>
            </template>
            <div>
                Tooltip текст подсказки
            </div>
        </c-tooltip>

        <c-tooltip
            bottom
            open-on-hover
            close-on-leave
            offset-y="5"
            offset-x="-38"
            class="elevation-5 bg-amber-darken-3 text-white"
            strategy="reverse"
        >
            <template #activator="{ on, activator }">
                <c-btn
                    v-bind="activator"
                    class="elevation-2 bg-amber-darken-3 w-[120px]"
                    v-on="on"
                >
                    Вниз
                </c-btn>
            </template>
            <div class="pa-2">
                Tooltip текст подсказки
            </div>
        </c-tooltip>
        <c-tooltip
            left
            open-on-hover
            close-on-leave
            offset-x="5"
            class="elevation-5 bg-pink-accent-4 text-white"
            strategy="reverse"
        >
            <template #activator="{ on, activator }">
                <c-btn
                    v-bind="activator"
                    class="elevation-2 bg-pink-accent-4 w-[120px]"
                    v-on="on"
                >
                    Влево
                </c-btn>
            </template>
            <div class="pa-2">
                Tooltip текст подсказки
            </div>
        </c-tooltip>
        <c-tooltip
            right
            open-on-hover
            close-on-leave
            offset-x="5"
            class="elevation-5 bg-green text-white"
            strategy="reverse"
        >
            <template #activator="{ on, activator }">
                <c-btn
                    v-bind="activator"
                    class="elevation-2 bg-green w-[120px]"
                    v-on="on"
                >
                    Вправо
                </c-btn>
            </template>
            <div class="pa-2">
                Tooltip текст подсказки
            </div>
        </c-tooltip>
    </demo-block>
</template>

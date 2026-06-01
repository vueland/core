<script setup lang="ts">
    import DemoBlock from '../../../.vitepress/components/DemoBlock.vue'
</script>
<template>
    <demo-block class="d-flex justify-space-between align-center flex-wrap pa-5 gap-4">
        <c-menu
            open-on-click
            close-on-click
            close-on-content-click
            close-on-click-outside
            offset-y="5"
            class="elevation-5 bg-blue-darken-2 text-white"
            strategy="reverse"
            top
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
            <c-list class="bg-blue-darken-2">
                <c-list-item
                    v-for="it in 5"
                    :key="it"
                >
                    <c-list-item-title>
                        {{ it }} item
                    </c-list-item-title>
                </c-list-item>
            </c-list>
        </c-menu>
        <c-menu
            open-on-click
            close-on-click
            close-on-content-click
            close-on-click-outside
            offset-y="5"
            class="elevation-5 bg-amber-darken-3 text-white"
            strategy="reverse"
            bottom
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
            <c-list class="bg-amber-darken-3">
                <c-list-item
                    v-for="it in 5"
                    :key="it"
                >
                    <c-list-item-title>
                        {{ it }} item
                    </c-list-item-title>
                </c-list-item>
            </c-list>
        </c-menu>
        <c-menu
            open-on-click
            close-on-click
            close-on-content-click
            close-on-click-outside
            offset-x="5"
            class="elevation-5 bg-pink-accent-4 text-white"
            strategy="reverse"
            left
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
            <c-list class="bg-pink-accent-4">
                <c-list-item
                    v-for="it in 5"
                    :key="it"
                >
                    <c-list-item-title>
                        {{ it }} item
                    </c-list-item-title>
                </c-list-item>
            </c-list>
        </c-menu>
        <c-menu
            open-on-click
            close-on-click
            close-on-content-click
            close-on-click-outside
            offset-x="5"
            class="elevation-5 bg-green text-white"
            strategy="reverse"
            right
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
            <c-list class="bg-green">
                <c-list-item
                    v-for="it in 5"
                    :key="it"
                >
                    <c-list-item-title>
                        {{ it }} item
                    </c-list-item-title>
                </c-list-item>
            </c-list>
        </c-menu>
    </demo-block>
</template>

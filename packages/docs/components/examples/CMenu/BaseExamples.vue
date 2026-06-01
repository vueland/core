<script setup lang="ts">
    import DemoBlock from '../../../.vitepress/components/DemoBlock.vue'
</script>
<template>
    <demo-block class="d-flex justify-center align-center flex-wrap py-5 gap-4">
        <c-menu
            open-on-click
            close-on-click
            offset-y="10"
            class="elevation-5 bg-grey-darken-4 text-white"
            top
        >
            <template #activator="{ on, activator }">
                <c-btn
                    v-bind="activator"
                    class="elevation-2 bg-green"
                    v-on="on"
                >
                    Открыть меню
                </c-btn>
            </template>
            <div class="pa-4">
                <c-list class="bg-grey-darken-4">
                    <c-list-item
                        v-for="it in 10"
                        :key="it"
                    >
                        <c-list-item-title>
                            {{ it }} item
                        </c-list-item-title>
                    </c-list-item>
                </c-list>
            </div>
        </c-menu>
    </demo-block>
</template>

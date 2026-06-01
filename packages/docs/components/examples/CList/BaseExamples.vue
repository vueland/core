<script setup lang="ts">
    import { ref } from 'vue'
    import DemoBlock from '../../../.vitepress/components/DemoBlock.vue'

    defineProps<{
        base?: boolean
        mandatory?: boolean
        multiple?: boolean
    }>()

    const model = ref<string | null>(null)
    const multipleModel = ref([])

    const items = [
        'list item 1',
        'list item 2',
        'list item 3',
        'list item 4',
        'list item 5',
    ]
</script>
<template>
    <demo-block
        v-if="base"
        class="pa-5"
    >
        <c-list
            v-model="model"
            class="bg-blue text-white elevation-4 r-[8px] overflow-hidden"
        >
            <c-list-item
                v-for="it in items"
                :key="it"
                :value="it"
            >
                <c-list-item-title>
                    {{ it }}
                </c-list-item-title>
            </c-list-item>
        </c-list>
    </demo-block>
    <demo-block
        v-if="mandatory"
        class="pa-5"
    >
        <c-list
            v-model="model"
            mandatory
            class="bg-amber-darken-3 text-white elevation-4 r-[8px] overflow-hidden"
        >
            <c-list-item
                v-for="it in items"
                :key="it"
                :value="it"
            >
                <c-list-item-title>
                    {{ it }}
                </c-list-item-title>
            </c-list-item>
        </c-list>
    </demo-block>
    <demo-block
        v-if="multiple"
        class="pa-5"
    >
        <c-list
            v-model="multipleModel"
            multiple
            class="bg-green text-white elevation-4 r-[8px] overflow-hidden"
        >
            <c-list-item
                v-for="it in items"
                :key="it"
                :value="it"
            >
                <c-list-item-title>
                    {{ it }}
                </c-list-item-title>
            </c-list-item>
        </c-list>
    </demo-block>
</template>
<style lang="scss" scoped>
    .vp-doc ul {
        list-style: none;
    }

    .vp-doc ul, .vp-doc ol {
        padding-left: 0;
        margin: 0;
        margin-block-end: 0;
        margin-block-start: 0;
    }

    .vp-doc li + li {
        margin: 0;
    }
</style>

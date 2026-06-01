<script setup lang="ts">
    import DemoBlock from '../../../.vitepress/components/DemoBlock.vue'
</script>
<template>
    <demo-block class="d-flex justify-center align-center flex-wrap pa-5">
        <c-btn
            v-if="$attrs.block"
            class="w-[100%]"
        >
            Блочная кнопка
        </c-btn>
        <c-btn
            v-if="$attrs.width"
            class="w-[200px]"
        >
            Широкая кнопка
        </c-btn>
        <c-btn
            v-if="$attrs.height"
            class="h-[40px]"
        >
            Высокая кнопка
        </c-btn>
        <c-btn
            v-if="$attrs['min-width']"
            class="min-w-[220px]"
        >
            Широкая кнопка
        </c-btn>
        <c-btn
            v-if="$attrs.custom"
            style="--btn-bg-color: #673ab7; --btn-border-radius: 12px; --btn-width: 200px; --btn-height: 40px;"
        >
            Кастомная кнопка
        </c-btn>
    </demo-block>
</template>

<script setup lang="ts">
    import DemoBlock from '../../../.vitepress/components/DemoBlock.vue'
</script>
<template>
    <demo-block class="d-flex justify-center align-center flex-wrap py-5 gap-4">
        <c-btn variant="outlined">
            Outline кнопка
        </c-btn>
        <c-btn
            variant="outlined"
            class="text-green"
        >
            Outline кнопка
        </c-btn>
        <c-btn
            variant="outlined"
            class="text-yellow"
        >
            Outline кнопка
        </c-btn>
        <c-btn
            variant="outlined"
            class="text-red"
        >
            Outline кнопка
        </c-btn>
    </demo-block>
</template>

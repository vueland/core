<script setup lang="ts">
    import DemoBlock from '../../../.vitepress/components/DemoBlock.vue'
</script>
<template>
    <demo-block class="d-flex justify-center align-center flex-wrap py-5 gap-4">
        <c-btn
            variant="flat"
            class="w-[200px] bg-blue hover:bg-blue-lighten-2"
        >
            Hover
        </c-btn>
        <c-btn
            variant="flat"
            class="w-[200px] bg-green active:bg-green-darken-2"
        >
            Active
        </c-btn>
        <c-btn
            variant="flat"
            class="w-[200px] bg-purple hover:bg-purple-lighten-1 active:bg-purple-darken-2"
        >
            Hover and Active
        </c-btn>
        <c-btn
            variant="flat"
            class="w-[200px] bg-red"
            disabled
        >
            Disabled
        </c-btn>
    </demo-block>
</template>

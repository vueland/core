<script setup lang="ts">
</script>
<template>
    <div class="demo-code language-vue">
        <slot />
    </div>
</template>

<style scoped>
    .demo-code {
        border-top: 1px solid var(--vp-c-divider);
        //background: var(--vp-c-bg-soft);
    }

    .demo-code :deep(pre) {
        margin: 0;
        border-radius: 0;
    }

    .demo-code :deep(div[class*='language-']) {
        margin: 0;
        border-radius: 0;
    }
</style>

<template>
    <div class="demo-block w-[100%]">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
    .demo-block {
        margin: 24px 0;
        border: 1px solid var(--vp-c-divider);
        border-radius: 16px;
        overflow: hidden;
        background: #282828;
    }
</style>

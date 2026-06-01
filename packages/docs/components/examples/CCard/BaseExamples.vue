<script setup lang="ts">
    import DemoBlock from '../../../.vitepress/components/DemoBlock.vue'
</script>
<template>
    <demo-block class="d-flex justify-center align-center flex-wrap py-5 gap-4">
        <c-card class="bg-grey-darken-2 text-white elevation-4 w-[300px]">
            <c-card-header>
                <h2 class="notification-header">
                    Notification
                </h2>
            </c-card-header>
            <c-card-body>
                Notification content
            </c-card-body>
            <c-card-footer>
                <c-btn class="bg-green">
                    OK
                </c-btn>
            </c-card-footer>
        </c-card>
    </demo-block>
</template>
<style lang="scss" scoped>
    .notification-header {
        margin: 0;
        border-top: none;
        padding-top: 0;
        letter-spacing: -0.02em;
        line-height: 32px;
        font-size: 24px;
    }
</style>

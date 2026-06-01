<script setup lang="ts">
    import { provide } from 'vue'
    import { $APP_API_KEY } from '../../constants'
    import { useAppScroll } from '../../composables'

    defineOptions({
        name: 'CApp',
    })

    const {
        appRef,
        classes,
        getScrollTop,
        getScrollLeft,
        blockScroll,
        unblockScroll
    } = useAppScroll()

    provide($APP_API_KEY, {
        getScrollTop,
        getScrollLeft,
        blockScroll,
        unblockScroll,
    })
</script>

<template>
    <div
        ref="appRef"
        class="c-app"
        :class="classes"
    >
        <div class="c-app__wrapper">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, unref } from 'vue'
    import type { CBtnProps } from './types'
    import { useButtonPresets } from '../../composables'

    defineOptions({
        name: 'CBtn',
    })

    const props = defineProps<CBtnProps>()

    const preset = useButtonPresets({ props })

    const classes = computed(() => [
        {
            'c-btn--flat': !props.variant || props.variant === 'flat',
            'c-btn--outlined': props.variant === 'outlined',
            'c-btn--block': props.block,
        },
        ...unref(preset).root
    ])
</script>

<template>
    <button
        class="c-btn"
        :class="classes"
    >
        <div
            class="c-btn__label"
            :class="preset.label"
        >
            <slot />
        </div>
    </button>
</template>

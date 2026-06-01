<script setup lang="ts">
    import { computed, onBeforeUnmount, shallowRef, unref, watch } from 'vue'
    import { useOverlayStack } from '../../composables'
    import type { COverlayProps, COverlaySlots } from './tyoes'

    defineOptions({
        name: 'COverlay',
        inheritAttrs: false,
    })

    const props = defineProps<COverlayProps>()
    defineSlots<COverlaySlots>()

    const { register, unregister } = useOverlayStack()

    const model = defineModel<boolean>({ default: false })
    const zIndex = shallowRef()

    const target = computed(() => props.to ?? 'body')

    watch(model, (val) => {
        if (val) {
            zIndex.value = register()
        } else {
            unregister()
        }
    }, { immediate: true })

    onBeforeUnmount(() => {
        if (unref(model)) {
            unregister()
        }
    })

</script>
<template>
    <teleport :to="target">
        <slot :z-index />
    </teleport>
</template>

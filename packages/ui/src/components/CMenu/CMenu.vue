<script setup lang="ts">
    import { computed, onBeforeUnmount, onMounted, provide, shallowRef, unref, watch } from 'vue'
    import { useActivator, useAutoPosition, useDelayedActions, useMenuPresets, } from '../../composables'
    import { COverlay } from '../COverlay'
    import { vClickOutside } from '../../directives'
    import { $MENU_API_KEY } from '../../constants'
    import type { CMenuEvents, CMenuProps } from './types'
    import { convertToUnit, IN_BROWSER, throttle } from '../../utils'
    import { isDef } from '../../helpers'

    defineOptions({
        name: 'CMenu',
        inheritAttrs: false
    })

    const emit = defineEmits<CMenuEvents>()
    const props = defineProps<CMenuProps>()

    const { transition = 'fade' } = props
    const THROTTLE_DELAY = 50

    const {
        activatorProps,
        genListeners,
        getActivator,
        getActivatorElement
    } = useActivator(props)

    const {
        activator,
        content,
        contentRef,
        update,
    } = useAutoPosition(props)

    const presets = useMenuPresets({ props })

    const { openDelay, closeDelay } = useDelayedActions(props)

    const model = defineModel<boolean>({ default: false })

    const mounted = shallowRef(props.ssr || props.modelValue)

    const detached = computed(() => isDef(props.positionX) || isDef(props.positionY))

    const sizesStyles = computed(() => ({
        ...(props.width || unref(activator).width ? { width: convertToUnit(props.width ?? unref(activator).width) } : {}),
        ...(props.height ? { height: convertToUnit(props.height ?? unref(activator).height) } : {}),
        ...((props.maxWidth || props.width) ? { maxWidth: convertToUnit(props.maxWidth || props.width!) } : {}),
        ...(props.minWidth ? { minWidth: convertToUnit(props.minWidth) } : {}),
        ...(props.minHeight ? { minHeight: convertToUnit(props.minHeight) } : {}),
        ...(props.maxHeight ? { maxHeight: convertToUnit(props.maxHeight) } : {}),
    }))

    const styles = computed(() => ({
        top: convertToUnit(unref(content).top),
        left: convertToUnit(unref(content).left),
        ...unref(sizesStyles)
    }))

    const classes = computed(() => ([
        ...unref(presets).root
    ]))

    const open = async () => {
        mounted.value = true

        if (!unref(detached)) {
            model.value = true
        }

        openDelay(async () => {
            await update(getActivator<HTMLElement>())
            emit('open')
        })
    }

    const close = () => {
        closeDelay(() => {
            emit('close')

            mounted.value = props.ssr ?? false
            model.value = false
        })
    }

    const toggle = () => unref(model) ? close() : open()

    const onClickOutside = (e: Event) => {
        const { closeOnClickOutside } = props
        const { target } = e
        const activator = getActivatorElement()

        if (closeOnClickOutside && (!activator || !activator.contains(target as Node))) {
            close()
            emit('outside-click')
        }
    }

    const onContentClick = () => {
        if (props.closeOnContentClick) {
            close()
            emit('click')
        }
    }

    const listeners = genListeners({
        open,
        close,
        toggle
    })

    const handler = throttle(() => {
        update(getActivator<HTMLElement>())
    }, THROTTLE_DELAY)

    defineExpose({
        open,
        close,
        toggle
    })

    provide($MENU_API_KEY, {
        open,
        close,
        toggle
    })

    if (IN_BROWSER) {
        watch(model, (value) => {
            if (value) {
                window.addEventListener('resize', handler, { passive: true })
                window.addEventListener('scroll', handler, { passive: true })
            } else {
                window.removeEventListener('resize', handler)
                window.removeEventListener('scroll', handler)
            }
        }, { immediate: true })

        if (unref(detached)) {
            watch(model, (value) => {
                if (value) open()
            }, { immediate: true })
        } else {
            onMounted(() => {
                if (unref(model)) open()
            })
        }
    }

    onBeforeUnmount(() => {
        window.removeEventListener('resize', handler)
        window.removeEventListener('scroll', handler)
    })
</script>
<template>
    <slot
        name="activator"
        :on="listeners"
        :activator="activatorProps"
    />
    <c-overlay
        v-slot="{zIndex}"
        v-model="model"
    >
        <transition :name="transition">
            <div
                v-if="mounted"
                v-show="model"
                ref="contentRef"
                v-click-outside="onClickOutside"
                class="c-menu"
                :class="classes"
                :style="{...styles, zIndex}"
                v-bind="$attrs"
                @click="onContentClick"
            >
                <div class="c-menu__content">
                    <slot />
                </div>
            </div>
        </transition>
    </c-overlay>
</template>

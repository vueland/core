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

    const TRANSITION_DURATION = 100
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
        updateAfterRender,
    } = useAutoPosition(props)

    const presets = useMenuPresets({ props })

    const { openDelay, closeDelay } = useDelayedActions(props)

    const model = defineModel<boolean>({ default: false })

    const visible = shallowRef(false)
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
        { 'c-menu--visible': unref(visible) },
        ...unref(presets).root
    ]))

    const open = async () => {
        mounted.value = true

        if (!unref(detached)) {
            model.value = true
        }

        openDelay(async () => {
            await updateAfterRender(getActivator<HTMLElement>())
            visible.value = true
            emit('open')
        })
    }

    const close = () => {
        closeDelay(() => {
            visible.value = false
            emit('close')

            setTimeout(() => {
                mounted.value = props.ssr ?? false
                model.value = false
            }, TRANSITION_DURATION)
        })
    }

    const toggle = () => unref(visible) ? close() : open()

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

    const update = throttle(() => {
        updateAfterRender(getActivator<HTMLElement>())
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
        watch(visible, (value) => {
            if (value) {
                window.addEventListener('resize', update, { passive: true })
                window.addEventListener('scroll', update, { passive: true })
            } else {
                window.removeEventListener('resize', update)
                window.removeEventListener('scroll', update)
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
        window.removeEventListener('resize', update)
        window.removeEventListener('scroll', update)
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
        <template v-if="mounted">
            <div
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
        </template>
    </c-overlay>
</template>

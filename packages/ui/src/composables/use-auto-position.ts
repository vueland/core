import {
    type ComponentPublicInstance,
    computed,
    nextTick,
    onBeforeUnmount,
    ref,
    shallowRef,
    unref,
    watch,
} from 'vue'

import { isDef } from '../helpers'
import type { DimensionsProps } from '../types'
import { IN_BROWSER } from '../utils'

import { useApplication } from './use-application'
import { type PositionProps } from './use-position-classes'

export interface Dimensions {
    top: number
    left: number
    width: number
    height: number
}

export interface CoordsProps {
    positionX?: number
    positionY?: number
    offsetX?: number | string
    offsetY?: number | string
}

export interface AutoPositionProps {
    strategy?: 'reverse' | 'bounce'
}

const SCREEN_EDGE_OFFSET = 20

const getRect = (el: Element | ComponentPublicInstance) => {
    const element = (el as ComponentPublicInstance)?.$el ?? el

    const {
        top,
        left,
        width,
        height,
    } = element.getBoundingClientRect()

    return {
        top,
        left,
        width,
        height,
    }
}

export function useAutoPosition(
    props: PositionProps & CoordsProps & DimensionsProps & AutoPositionProps
) {
    const { getScrollTop, getScrollLeft } = useApplication()

    const activator = ref<Dimensions>({
        top: 0,
        left: 0,
        width: 0,
        height: 0,
    })

    const content = ref<Dimensions>({
        top: 0,
        left: 0,
        width: 0,
        height: 0,
    })

    const contentRef = shallowRef<HTMLElement | ComponentPublicInstance>()

    const offsetX = computed(() => Number(props.offsetX) || 0)
    const offsetY = computed(() => Number(props.offsetY) || 0)
    const isXDirection = computed(() => props.left || props.right)
    const shouldReverse = computed(() => props.strategy === 'reverse')

    let frameId = 0

    const cancelScheduledUpdate = () => {
        if (!IN_BROWSER || !frameId) return

        cancelAnimationFrame(frameId)
        frameId = 0
    }

    const setActivatorSizes = (activatorEl: Element | ComponentPublicInstance) => {
        const rect = getRect(activatorEl)

        activator.value = {
            top: rect.top + getScrollTop(),
            left: rect.left + getScrollLeft(),
            width: rect.width,
            height: rect.height,
        }
    }

    const setContentSizes = (contentEl: HTMLElement | ComponentPublicInstance) => {
        const element = (contentEl as ComponentPublicInstance)?.$el ?? contentEl

        content.value.width = element.offsetWidth
        content.value.height = element.offsetHeight
    }

    const calcToBottom = () => {
        const { top, height } = unref(activator)
        return top + height + unref(offsetY)
    }

    const calcToTop = () => {
        const { top } = unref(activator)
        const { height } = unref(content)

        return top - height - unref(offsetY)
    }

    const calcToLeft = () => {
        const { left } = unref(activator)
        const { width } = unref(content)
        return left - width - unref(offsetX)
    }

    const calcToRight = () => {
        const { left, width } = unref(activator)
        return left + width + unref(offsetX)
    }

    const calcY = () => {
        return props.positionY! + unref(offsetY)
    }

    const calcX = () => {
        return props.positionX! + unref(offsetX)
    }

    const getScreenXBounds = (contentLeft: number) => {
        const scrollLeft = getScrollLeft()
        const { width: cWidth } = unref(content)

        const leftEdge = scrollLeft + SCREEN_EDGE_OFFSET
        const rightEdge = scrollLeft + window.innerWidth - SCREEN_EDGE_OFFSET

        return {
            leftEdge,
            rightEdge,
            isBeyondLeft: contentLeft < leftEdge,
            isBeyondRight: contentLeft + cWidth > rightEdge,
        }
    }

    const getScreenYBounds = (contentTop: number) => {
        const scrollTop = getScrollTop()
        const { height: cHeight } = unref(content)

        const topEdge = scrollTop + SCREEN_EDGE_OFFSET
        const bottomEdge = scrollTop + window.innerHeight - SCREEN_EDGE_OFFSET

        return {
            topEdge,
            bottomEdge,
            isBeyondTop: contentTop < topEdge,
            isBeyondBottom: contentTop + cHeight > bottomEdge,
        }
    }

    const alignToActivatorTop = () => {
        const { top } = unref(activator)
        return top + unref(offsetY)
    }

    const alignToActivatorLeft = () => {
        const { left } = unref(activator)
        return left + unref(offsetX)
    }

    const getContentTop = () => {
        if (props.positionY) return calcY()
        if (props.top) return calcToTop()
        if (props.bottom) return calcToBottom()
        return alignToActivatorTop()
    }

    const getContentLeft = () => {
        if (props.positionX) return calcX()
        if (props.left) return calcToLeft()
        if (props.right) return calcToRight()
        return alignToActivatorLeft()
    }

    const calcYBounce = () => {
        const { height: cHeight } = unref(content)
        const cTop = getContentTop()

        const {
            topEdge,
            bottomEdge,
            isBeyondTop,
            isBeyondBottom,
        } = getScreenYBounds(cTop)

        if (!isBeyondTop && !isBeyondBottom) {
            return cTop
        }

        if (unref(isXDirection) || !unref(shouldReverse)) {
            return isBeyondBottom ? bottomEdge - cHeight : topEdge
        }

        if (isBeyondTop && props.top) {
            return calcToBottom()
        }

        if (isBeyondBottom && props.bottom) {
            return calcToTop()
        }
    }

    const calcXBounce = () => {
        const { width: cWidth } = unref(content)
        const cLeft = getContentLeft()

        const {
            leftEdge,
            rightEdge,
            isBeyondLeft,
            isBeyondRight,
        } = getScreenXBounds(cLeft)

        if (!isBeyondLeft && !isBeyondRight) {
            return cLeft
        }

        if (!unref(isXDirection) || !unref(shouldReverse)) {
            return isBeyondRight ? rightEdge - cWidth : leftEdge
        }

        if (isBeyondLeft && props.left) {
            return calcToRight()
        }

        if (isBeyondRight && props.right) {
            return calcToLeft()
        }
    }

    const applyPosition = () => {
        content.value.top = calcYBounce()!
        content.value.left = calcXBounce()!
    }

    const scheduleUpdate = () => {
        if (!IN_BROWSER || frameId) return

        frameId = requestAnimationFrame(() => {
            frameId = 0
            applyPosition()
        })
    }

    const update = async (activatorEl: Element | ComponentPublicInstance) => {
        if (activatorEl) {
            setActivatorSizes(activatorEl)
            await nextTick()
        }

        setContentSizes(contentRef.value!)
        await nextTick()

        scheduleUpdate()
    }

    if (IN_BROWSER) {
        const resizeObserver = new ResizeObserver((entries) => {
            const entry = entries[0]

            if (!entry) {
                return
            }

            const { blockSize, inlineSize } = entry!.borderBoxSize[0]

            if (!blockSize || !inlineSize) {
                return
            }

            const current = unref(content)

            if (current.width === inlineSize && current.height === blockSize) {
                return
            }

            current.width = inlineSize
            current.height = blockSize

            scheduleUpdate()
        })

        watch(contentRef, (val, oldValue) => {
            const nextEl = (val as ComponentPublicInstance)?.$el ?? val
            const prevEl = (oldValue as ComponentPublicInstance)?.$el ?? oldValue

            if (prevEl) {
                resizeObserver.unobserve(prevEl as Element)
            }

            if (nextEl) {
                resizeObserver.observe(nextEl as Element)
            }
        })

        if (isDef(props.positionX) || isDef(props.positionY)) {
            watch(() => [props.positionX, props.positionY], scheduleUpdate)
        }

        onBeforeUnmount(() => {
            cancelScheduledUpdate()
            resizeObserver.disconnect()
        })
    }

    return {
        activator,
        content,
        contentRef,
        update,
    }
}

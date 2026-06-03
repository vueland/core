import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useAutoPosition } from '../../src/composables'

vi.mock('../../src/composables/use-application', () => ({
    useApplication: () => ({
        getScrollTop: () => window.pageYOffset || window.scrollY || 0,
        getScrollLeft: () => window.pageXOffset || window.scrollX || 0,
    }),
}))

class ResizeObserverMock {
    callback: ResizeObserverCallback

    constructor(callback: ResizeObserverCallback) {
        this.callback = callback
    }

    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
}

describe('useAutoPosition', () => {
    beforeEach(() => {
        vi.useFakeTimers()

        vi.stubGlobal('ResizeObserver', ResizeObserverMock)

        // ВАЖНО:
        // requestAnimationFrame должен быть асинхронным,
        // иначе frameId останется залипшим в 1
        vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
            return setTimeout(() => cb(0), 0) as unknown as number
        })

        vi.stubGlobal('cancelAnimationFrame', (id: number) => {
            clearTimeout(id)
        })

        Object.defineProperty(window, 'innerWidth', {
            configurable: true,
            value: 1200,
        })

        Object.defineProperty(window, 'innerHeight', {
            configurable: true,
            value: 800,
        })

        Object.defineProperty(window, 'scrollX', {
            configurable: true,
            value: 0,
        })

        Object.defineProperty(window, 'scrollY', {
            configurable: true,
            value: 0,
        })

        Object.defineProperty(window, 'pageXOffset', {
            configurable: true,
            value: 0,
        })

        Object.defineProperty(window, 'pageYOffset', {
            configurable: true,
            value: 0,
        })
    })

    afterEach(() => {
        vi.useRealTimers()
        vi.restoreAllMocks()
    })

    const flushAll = async () => {
        await nextTick()
        await vi.runAllTimersAsync()
        await nextTick()
    }

    const mountComposable = (props: Record<string, any> = {}) => {
        let api!: ReturnType<typeof useAutoPosition>

        const TestComponent = defineComponent({
            setup() {
                api = useAutoPosition(props as any)
                return () => h('div')
            },
        })

        mount(TestComponent)

        return api
    }

    const createActivatorEl = (rect: Partial<DOMRect> = {}) => {
        const el = document.createElement('div')

        el.getBoundingClientRect = vi.fn(() => ({
            x: rect.left ?? 0,
            y: rect.top ?? 0,
            top: rect.top ?? 0,
            left: rect.left ?? 0,
            right: (rect.left ?? 0) + (rect.width ?? 0),
            bottom: (rect.top ?? 0) + (rect.height ?? 0),
            width: rect.width ?? 0,
            height: rect.height ?? 0,
            blockSize: rect.height,
            inlineSize: rect.width,
            toJSON: () => ({}),
        } as DOMRect))

        return el
    }

    const createContentEl = (rect: Partial<DOMRect> = {}) => {
        const el = document.createElement('div')

        Object.defineProperty(el, 'offsetWidth', {
            configurable: true,
            value: rect.width,
        })

        Object.defineProperty(el, 'offsetHeight', {
            configurable: true,
            value: rect.height,
        })

        return el
    }

    it('позиционирует меню снизу от activator', async () => {
        const api = mountComposable({
            bottom: true,
            offsetY: 8,
            strategy: 'bounce',
        })

        const activator = createActivatorEl({
            top: 100,
            left: 200,
            width: 120,
            height: 40,
        })

        const content = createContentEl({
            width: 120,
            height: 80,
        })

        api.contentRef.value = content as any
        await flushAll()

        api.update(activator)
        await flushAll()

        expect(api.activator.value.top).toBe(100)
        expect(api.activator.value.left).toBe(200)
        expect(api.content.value.width).toBe(120)
        expect(api.content.value.height).toBe(80)
        expect(api.content.value.top).toBe(148)
        expect(api.content.value.left).toBe(200)
    })

    it('позиционирует меню сверху от activator', async () => {
        const api = mountComposable({
            top: true,
            offsetY: 10,
            strategy: 'bounce',
        })

        const activator = createActivatorEl({
            top: 300,
            left: 400,
            width: 100,
            height: 50,
        })

        const content = createContentEl({
            width: 160,
            height: 90,
        })

        api.contentRef.value = content as any
        await flushAll()

        api.update(activator)
        await flushAll()

        expect(api.content.value.top).toBe(200)
        expect(api.content.value.left).toBe(400)
    })

    it('ограничивает позицию по горизонтали при strategy=bounce', async () => {
        const api = mountComposable({
            strategy: 'bounce',
        })

        const activator = createActivatorEl({
            top: 100,
            left: 1150,
            width: 40,
            height: 30,
        })

        const content = createContentEl({
            width: 200,
            height: 80,
        })

        api.contentRef.value = content as any
        await flushAll()

        api.update(activator)
        await flushAll()

        expect(api.content.value.left).toBe(980)
    })

    it('переворачивает позицию при strategy=reverse', async () => {
        Object.defineProperty(window, 'innerHeight', {
            configurable: true,
            value: 300,
        })

        const api = mountComposable({
            bottom: true,
            offsetY: 8,
            strategy: 'reverse',
        })

        const activator = createActivatorEl({
            top: 240,
            left: 100,
            width: 100,
            height: 40,
        })

        const content = createContentEl({
            width: 120,
            height: 100,
        })

        api.contentRef.value = content as any
        await flushAll()

        api.update(activator)
        await flushAll()

        expect(api.content.value.top).toBe(132)
        expect(api.content.value.left).toBe(100)
    })

    it('updateAfterRender корректно ждет появления DOM', async () => {
        const api = mountComposable({
            bottom: true,
        })

        const activator = createActivatorEl({
            top: 50,
            left: 60,
            width: 100,
            height: 30,
        })

        const content = createContentEl({
            width: 140,
            height: 70,
        })

        const promise = api.update(activator)

        api.contentRef.value = content as any

        await promise
        await flushAll()

        expect(api.content.value.width).toBe(140)
        expect(api.content.value.height).toBe(70)
        expect(api.content.value.top).toBe(80)
        expect(api.content.value.left).toBe(60)
    })
})

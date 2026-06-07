import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CMenu } from './index'

vi.mock('../../utils/globals', () => ({
    IN_BROWSER: true,
}))

vi.mock('../../utils/throttle', () => ({
    throttle: (fn: (...args: any[]) => any) => fn,
}))

vi.mock('../../composables/use-application', () => ({
    useApplication: () => ({
        getScrollTop: () => window.pageYOffset || window.scrollY || 0,
        getScrollLeft: () => window.pageXOffset || window.scrollX || 0,
    }),
}))

// COverlay тянет useOverlayStack из barrel-модуля composables
vi.mock('../../composables', async () => {
    const actual = await vi.importActual<any>('../../composables')

    return {
        ...actual,
        useOverlayStack: () => ({
            register: vi.fn(() => 2000),
            unregister: vi.fn(),
        }),
    }
})

vi.mock('../../src/directives', () => ({
    vClickOutside: {
        mounted(el: HTMLElement, binding: any) {
            ;(el as any).__outsideHandler__ = binding.value
        },
        updated(el: HTMLElement, binding: any) {
            ;(el as any).__outsideHandler__ = binding.value
        },
    },
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

// Переводим события из slot props в формат h():
// { click: fn } -> { onClick: fn }
const toVueListeners = (listeners: Record<string, any> = {}) => {
    return Object.fromEntries(
        Object.entries(listeners).map(([name, handler]) => {
            const eventName = `on${name.charAt(0).toUpperCase()}${name.slice(1)}`
            return [eventName, handler]
        }),
    )
}

describe('CMenu', () => {
    beforeEach(() => {
        vi.useFakeTimers()

        vi.stubGlobal('ResizeObserver', ResizeObserverMock)

        // Важно: rAF должен быть асинхронным, иначе frameId залипает
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
        document.body.innerHTML = ''
    })

    // Унифицированный flush для Vue + таймеров + rAF
    const flushAll = async () => {
        await nextTick()
        await vi.runAllTimersAsync()
        await nextTick()
    }

    // Подменяем размеры DOM-элемента
    const setRect = (el: Element, rect: Partial<DOMRect>) => {
        vi.spyOn(el, 'getBoundingClientRect').mockImplementation(() => ({
            x: rect.left ?? 0,
            y: rect.top ?? 0,
            top: rect.top ?? 0,
            left: rect.left ?? 0,
            right: (rect.left ?? 0) + (rect.width ?? 0),
            bottom: (rect.top ?? 0) + (rect.height ?? 0),
            width: rect.width ?? 0,
            height: rect.height ?? 0,
            toJSON: () => ({}),
        } as DOMRect))
    }

    const setContentBounds = (el: Element, rect: Partial<DOMRect>) => {
        Object.defineProperty(el, 'offsetWidth', {
            configurable: true,
            value: rect.width,
        })

        Object.defineProperty(el, 'offsetHeight', {
            configurable: true,
            value: rect.height,
        })
    }

    // Монтируем хост с CMenu
    const mountHost = async (
        props: Record<string, any> = {},
        options?: {
            activatorRect?: Partial<DOMRect>
        },
    ) => {
        const menuRef = ref()

        const Host = defineComponent({
            setup() {
                return () =>
                    h(CMenu as any, {
                        ...props,
                        ref: menuRef,
                    }, {
                        activator: ({ on, activator }: any) =>
                            h(
                                'button',
                                {
                                    ...activator,
                                    ...toVueListeners(on),
                                    'data-test': 'activator',
                                },
                                'Open',
                            ),
                        default: () =>
                            h(
                                'div',
                                { 'data-test': 'content-inner' },
                                'Menu content',
                            ),
                    })
            },
        })

        const wrapper = mount(Host, {
            attachTo: document.body,
            global: {
                stubs: {
                    teleport: false,
                },
            },
        })

        await nextTick()

        const menu = wrapper.findComponent(CMenu as any)
        const activator = wrapper.get('[data-test="activator"]').element

        setRect(activator, {
            top: options?.activatorRect?.top ?? 100,
            left: options?.activatorRect?.left ?? 200,
            width: options?.activatorRect?.width ?? 120,
            height: options?.activatorRect?.height ?? 40,
        })

        return {
            wrapper,
            menu,
            menuVm: menu.vm as any,
            activator,
        }
    }

    // Подменяем размеры уже открытого меню
    const setOpenedMenuRects = (
        menuRoot: Element,
        rects?: Partial<DOMRect>,
    ) => {
        setContentBounds(menuRoot, {
            top: rects?.top ?? 0,
            left: rects?.left ?? 0,
            width: rects?.width ?? 120,
            height: rects?.height ?? 60,
        })
    }

    // Открываем меню через expose API
    const openMenu = async (
        menuVm: any,
        rects?: Partial<DOMRect>,
    ) => {
        await menuVm.open()
        await flushAll()

        const menuRoot = document.body.querySelector('.c-menu') as HTMLElement

        expect(menuRoot).toBeTruthy()

        setOpenedMenuRects(menuRoot, rects)

        // Даем компоненту шанс перепозиционироваться уже с реальными размерами
        window.dispatchEvent(new Event('resize'))
        await flushAll()

        return {
            menuRoot,
        }
    }

    it('открывается если передать modelValue=true', async () => {
        await mountHost({
            modelValue: true,
        })

        await flushAll()

        expect(document.body.textContent).toContain('Menu content')
    })

    it('открывается по клику на activator', async () => {
        const { wrapper, menu } = await mountHost({
            openOnClick: true,
        })

        await wrapper.get('[data-test="activator"]').trigger('click')
        await flushAll()

        expect(menu.emitted('update:modelValue')).toBeTruthy()
        expect(document.body.textContent).toContain('Menu content')
    })

    it('закрывается по клику на контент при closeOnContentClick=true', async () => {
        const { menuVm, menu } = await mountHost({
            closeOnContentClick: true,
        })

        const { menuRoot } = await openMenu(menuVm)

        menuRoot.click()
        await flushAll()

        expect(menu.emitted('update:modelValue')).toBeTruthy()
    })

    it('закрывается при клике вне', async () => {
        const { menuVm, menu } = await mountHost({
            closeOnClickOutside: true,
        })

        const { menuRoot } = await openMenu(menuVm)

        const outsideTarget = document.createElement('div')
        document.body.appendChild(outsideTarget)

        ;(menuRoot as any).__outsideHandler__?.({ target: outsideTarget })
        await flushAll()

        expect(menu.emitted('update:modelValue')).toBeTruthy()
    })

    it('не закрывается по outside click, если target = activator', async () => {
        const { menuVm, menu, activator } = await mountHost({
            closeOnClickOutside: true,
        })

        const { menuRoot } = await openMenu(menuVm)

        ;(menuRoot as any).__outsideHandler__?.({ target: activator })
        await flushAll()

        expect(menu.emitted('outsideClick')).toBeFalsy()
        expect(menu.emitted('close')).toBeFalsy()
    })

    it('применяет width из props', async () => {
        const { menuVm } = await mountHost({
            width: 280,
        })

        const { menuRoot } = await openMenu(menuVm, { width: 280, height: 60 })

        expect(menuRoot.style.width).toBe('280px')
        expect(menuRoot.style.maxWidth).toBe('280px')
    })

    it('expose API open/close/toggle работает', async () => {
        const { menuVm } = await mountHost()

        await menuVm.open()
        await flushAll()

        expect(document.body.textContent).toContain('Menu content')

        menuVm.toggle()
        await flushAll()

        menuVm.close()
        await flushAll()

        expect(menuVm).toBeTruthy()
    })

    it('подписывается на resize и scroll после открытия', async () => {
        const addSpy = vi.spyOn(window, 'addEventListener')
        const { menuVm } = await mountHost()

        await openMenu(menuVm)

        expect(addSpy).toHaveBeenCalledWith('resize', expect.any(Function), { passive: true })
        expect(addSpy).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })
    })

    it('пересчитывает позицию при resize', async () => {
        const { menuVm, activator } = await mountHost()

        const { menuRoot } = await openMenu(menuVm, { width: 120, height: 60 })

        const firstTop = menuRoot.style.top
        const firstLeft = menuRoot.style.left

        setRect(activator, {
            top: 180,
            left: 320,
            width: 120,
            height: 40,
        })

        setContentBounds(menuRoot, { width: 120, height: 60 })

        window.dispatchEvent(new Event('resize'))
        await flushAll()

        expect(menuRoot.style.top).not.toBe(firstTop)
        expect(menuRoot.style.left).not.toBe(firstLeft)
    })

    it('пересчитывает позицию при scroll', async () => {
        const { menuVm, activator } = await mountHost()

        const { menuRoot } = await openMenu(menuVm, { width: 120, height: 60 })

        const firstTop = menuRoot.style.top

        Object.defineProperty(window, 'scrollY', {
            configurable: true,
            value: 150,
        })

        Object.defineProperty(window, 'pageYOffset', {
            configurable: true,
            value: 150,
        })

        setRect(activator, {
            top: 100,
            left: 200,
            width: 120,
            height: 40,
        })

        setOpenedMenuRects(menuRoot, { width: 120, height: 60 })

        window.dispatchEvent(new Event('scroll'))
        await flushAll()

        expect(menuRoot.style.top).not.toBe(firstTop)
    })

    it('strategy=reverse открывает меню в противоположную сторону, если снизу не хватает места', async () => {
        Object.defineProperty(window, 'innerHeight', {
            configurable: true,
            value: 320,
        })

        const { menuVm } = await mountHost(
            {
                bottom: true,
                strategy: 'reverse',
            },
            {
                activatorRect: {
                    top: 250,
                    left: 200,
                    width: 120,
                    height: 40,
                },
            },
        )

        const { menuRoot } = await openMenu(menuVm, {
            width: 120,
            height: 100,
        })

        console.log('menuRoot.style.top', menuRoot.style.top)

        expect(parseFloat(menuRoot.style.top)).toBe(150)
    })

    it('учитывает offsetY при bottom-позиционировании', async () => {
        const { menuVm } = await mountHost(
            {
                bottom: true,
                offsetY: 12,
            },
            {
                activatorRect: {
                    top: 100,
                    left: 200,
                    width: 120,
                    height: 40,
                },
            },
        )

        const { menuRoot } = await openMenu(menuVm, {
            width: 120,
            height: 60,
        })

        expect(parseFloat(menuRoot.style.top)).toBe(152)
    })

    it('учитывает offsetX при обычном позиционировании', async () => {
        const { menuVm } = await mountHost(
            {
                offsetX: 16,
            },
            {
                activatorRect: {
                    top: 100,
                    left: 200,
                    width: 120,
                    height: 40,
                },
            },
        )

        const { menuRoot } = await openMenu(menuVm, {
            width: 120,
            height: 60,
        })

        expect(parseFloat(menuRoot.style.left)).toBe(216)
    })

    it('bottom-сценарий позиционирует меню под activator', async () => {
        const { menuVm } = await mountHost(
            {
                bottom: true,
            },
            {
                activatorRect: {
                    top: 100,
                    left: 200,
                    width: 120,
                    height: 40,
                },
            },
        )

        const { menuRoot } = await openMenu(menuVm, {
            width: 120,
            height: 60,
        })

        expect(parseFloat(menuRoot.style.top)).toBe(140)
        expect(parseFloat(menuRoot.style.left)).toBe(200)
    })

    it('top-сценарий позиционирует меню над activator', async () => {
        const { menuVm } = await mountHost(
            {
                top: true,
            },
            {
                activatorRect: {
                    top: 300,
                    left: 200,
                    width: 120,
                    height: 40,
                },
            },
        )

        const { menuRoot } = await openMenu(menuVm, {
            width: 120,
            height: 80,
        })

        expect(parseFloat(menuRoot.style.top)).toBe(220)
        expect(parseFloat(menuRoot.style.left)).toBe(200)
    })

    it('left-сценарий позиционирует меню слева от activator', async () => {
        const { menuVm } = await mountHost(
            {
                left: true,
            },
            {
                activatorRect: {
                    top: 200,
                    left: 400,
                    width: 100,
                    height: 40,
                },
            },
        )

        const { menuRoot } = await openMenu(menuVm, {
            width: 120,
            height: 60,
        })

        expect(parseFloat(menuRoot.style.left)).toBe(280)
        expect(parseFloat(menuRoot.style.top)).toBe(200)
    })

    it('right-сценарий позиционирует меню справа от activator', async () => {
        const { menuVm } = await mountHost(
            {
                right: true,
            },
            {
                activatorRect: {
                    top: 200,
                    left: 400,
                    width: 100,
                    height: 40,
                },
            },
        )

        const { menuRoot } = await openMenu(menuVm, {
            width: 120,
            height: 60,
        })

        expect(parseFloat(menuRoot.style.left)).toBe(500)
        expect(parseFloat(menuRoot.style.top)).toBe(200)
    })

    it('bounce ограничивает меню по правому краю экрана', async () => {
        Object.defineProperty(window, 'innerWidth', {
            configurable: true,
            value: 500,
        })

        const { menuVm } = await mountHost(
            {
                strategy: 'bounce',
            },
            {
                activatorRect: {
                    top: 100,
                    left: 430,
                    width: 60,
                    height: 40,
                },
            },
        )

        const { menuRoot } = await openMenu(menuVm, {
            width: 120,
            height: 60,
        })

        expect(parseFloat(menuRoot.style.left)).toBe(360)
    })
})

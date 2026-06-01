import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { useActivator } from '../../src/composables'

describe('useActivator', () => {
    const mountComposable = (props: Record<string, any> = {}) => {
        let api!: ReturnType<typeof useActivator>

        const TestComponent = defineComponent({
            setup() {
                api = useActivator(props)
                return () => h('div')
            },
        })

        mount(TestComponent)

        return api
    }

    it('сохраняет activator через ref set', () => {
        const api = mountComposable()

        const el = document.createElement('button')

        api.activatorProps.ref(el)

        expect(api.getActivator<HTMLElement>()).toBe(el)
        expect(api.getActivatorElement()).toBe(el)
    })

    it('getActivatorElement возвращает $el для ComponentPublicInstance', () => {
        const api = mountComposable()

        const el = document.createElement('button')
        const vm = { $el: el }

        api.activatorProps.ref(vm as any)

        expect(api.getActivatorElement()).toBe(el)
    })

    it('генерирует click listener для openOnClick', () => {
        const open = vi.fn()
        const close = vi.fn()
        const toggle = vi.fn()

        const api = mountComposable({
            openOnClick: true,
        })

        const listeners = api.genListeners({
            open,
            close,
            toggle,
        })

        // если genListeners у тебя пока возвращает computed
        const value = 'value' in listeners ? listeners.value : listeners

        expect(value.click).toBeTypeOf('function')

        value.click?.()

        expect(open).toHaveBeenCalledTimes(1)
        expect(close).not.toHaveBeenCalled()
        expect(toggle).not.toHaveBeenCalled()
    })

    it('генерирует mouseenter listener для openOnHover', () => {
        const open = vi.fn()
        const close = vi.fn()
        const toggle = vi.fn()

        const api = mountComposable({
            openOnHover: true,
        })

        const listeners = api.genListeners({
            open,
            close,
            toggle,
        })

        const value = 'value' in listeners ? listeners.value : listeners

        expect(value.mouseenter).toBeTypeOf('function')

        value.mouseenter?.()

        expect(open).toHaveBeenCalledTimes(1)
    })

    it('генерирует mouseleave listener для closeOnLeave', () => {
        const open = vi.fn()
        const close = vi.fn()
        const toggle = vi.fn()

        const api = mountComposable({
            closeOnLeave: true,
        })

        const listeners = api.genListeners({
            open,
            close,
            toggle,
        })

        const value = 'value' in listeners ? listeners.value : listeners

        expect(value.mouseleave).toBeTypeOf('function')

        value.mouseleave?.()

        expect(close).toHaveBeenCalledTimes(1)
    })

    it('генерирует focus listener для openOnFocus', () => {
        const open = vi.fn()
        const close = vi.fn()
        const toggle = vi.fn()

        const api = mountComposable({
            openOnFocus: true,
        })

        const listeners = api.genListeners({
            open,
            close,
            toggle,
        })

        const value = 'value' in listeners ? listeners.value : listeners

        expect(value.focus).toBeTypeOf('function')

        value.focus?.()

        expect(open).toHaveBeenCalledTimes(1)
    })

    it('генерирует click listener для closeOnClick через toggle', () => {
        const open = vi.fn()
        const close = vi.fn()
        const toggle = vi.fn()

        const api = mountComposable({
            closeOnClick: true,
        })

        const listeners = api.genListeners({
            open,
            close,
            toggle,
        })

        const value = 'value' in listeners ? listeners.value : listeners

        expect(value.click).toBeTypeOf('function')

        value.click?.()

        expect(toggle).toHaveBeenCalledTimes(1)
        expect(open).not.toHaveBeenCalled()
        expect(close).not.toHaveBeenCalled()
    })

    it('не генерирует listeners без соответствующих props', () => {
        const open = vi.fn()
        const close = vi.fn()
        const toggle = vi.fn()

        const api = mountComposable()

        const listeners = api.genListeners({
            open,
            close,
            toggle,
        })

        const value = 'value' in listeners ? listeners.value : listeners

        expect(value.click).toBeUndefined()
        expect(value.mouseenter).toBeUndefined()
        expect(value.mouseleave).toBeUndefined()
        expect(value.focus).toBeUndefined()
    })
})

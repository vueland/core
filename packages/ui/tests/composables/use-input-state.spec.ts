import { describe, expect, it } from 'vitest'
import { defineComponent, effectScope, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { useInputState } from '../../src/composables'

const unwrap = <T>(maybeRef: any): T => {
    return maybeRef && typeof maybeRef === 'object' && 'value' in maybeRef
        ? maybeRef.value
        : maybeRef
}

const mountWithModelValue = (modelValue: any) => {
    const Comp = defineComponent({
        name: 'UseInputStateHarness',
        props: {
            modelValue: { type: null, default: undefined },
        },
        emits: ['focus', 'blur'],
        setup(props, { expose }) {
            const api = useInputState(props as any)
            expose(api)
            return () => h('div')
        },
    })

    return mount(Comp, { props: { modelValue } })
}

describe('useInputState', () => {
    it('инициализируется корректно', async () => {
        const wrapper = mountWithModelValue(undefined) as any
        await nextTick()

        expect(unwrap<boolean>(wrapper.vm.state.focused)).toBe(false)
        expect(unwrap<boolean>(wrapper.vm.state.isDirty)).toBe(false)
        expect(unwrap<boolean>(wrapper.vm.state.hasValue)).toBe(false)
    })

    it('immediate watch: hasValue = true для truthy, false для falsy', async () => {
        const w1 = mountWithModelValue('hello') as any
        await nextTick()
        expect(unwrap<boolean>(w1.vm.state.hasValue)).toBe(true)

        const w2 = mountWithModelValue('') as any
        await nextTick()
        expect(unwrap<boolean>(w2.vm.state.hasValue)).toBe(false)

        const w3 = mountWithModelValue(0) as any
        await nextTick()
        expect(unwrap<boolean>(w3.vm.state.hasValue)).toBe(true)
    })

    it('immediate watch: для массивов зависит от length', async () => {
        const w1 = mountWithModelValue([]) as any
        await nextTick()
        expect(unwrap<boolean>(w1.vm.state.hasValue)).toBe(false)

        const w2 = mountWithModelValue([1]) as any
        await nextTick()
        expect(unwrap<boolean>(w2.vm.state.hasValue)).toBe(true)
    })

    it('обновляет hasValue при изменении modelValue', async () => {
        const wrapper = mountWithModelValue('') as any
        await nextTick()
        expect(unwrap<boolean>(wrapper.vm.state.hasValue)).toBe(false)

        await wrapper.setProps({ modelValue: 'x' })
        await nextTick()
        expect(unwrap<boolean>(wrapper.vm.state.hasValue)).toBe(true)

        await wrapper.setProps({ modelValue: [] })
        await nextTick()
        expect(unwrap<boolean>(wrapper.vm.state.hasValue)).toBe(false)

        await wrapper.setProps({ modelValue: [1, 2] })
        await nextTick()
        expect(unwrap<boolean>(wrapper.vm.state.hasValue)).toBe(true)
    })

    it('onFocus: focused=true, эмит focus(true), isDirty становится true', async () => {
        const wrapper = mountWithModelValue('') as any
        await nextTick()

        wrapper.vm.onFocus()
        await nextTick()

        expect(unwrap<boolean>(wrapper.vm.state.focused)).toBe(true) as any
        expect(unwrap<boolean>(wrapper.vm.state.isDirty)).toBe(true)
        expect(wrapper.emitted('focus')).toEqual([[true]])

        wrapper.vm.onFocus()
        await nextTick()
        expect(wrapper.emitted('focus')).toEqual([[true], [true]])
    })

    it('onBlur: focused=false, эмит blur(false)', async () => {
        const wrapper = mountWithModelValue('') as any
        await nextTick()

        wrapper.vm.onFocus()
        await nextTick()
        expect(unwrap<boolean>(wrapper.vm.state.focused)).toBe(true)

        wrapper.vm.onBlur()
        await nextTick()

        expect(unwrap<boolean>(wrapper.vm.state.focused)).toBe(false)
        expect(wrapper.emitted('blur')).toEqual([[false]])
    })

    it('не падает без instance (вне setup) — через effectScope', () => {
        const scope = effectScope()
        scope.run(() => {
            const api = useInputState({ modelValue: 'x' })
            expect(() => api.onFocus()).not.toThrow()
            expect(() => api.onBlur()).not.toThrow()
        })
        scope.stop()
    })
})

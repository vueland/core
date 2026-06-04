import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { InputEvents, useInputState, useValidate, type ValidateFn } from '../../src/composables'

const mountUseValidate = (initialProps: {
    modelValue: any
    rules?: ValidateFn[]
    validateOn?: 'input' | 'blur'
}) => {
    const Comp = defineComponent({
        name: 'UseValidateHarness',
        props: {
            modelValue: { type: null, required: true },
            rules: { type: Array as () => ValidateFn[] | undefined, default: undefined },
            validateOn: { type: String as () => 'input' | 'blur' | undefined, default: undefined },
        },
        setup(props, { expose }) {
            const { state, onBlur, onInput, onFocus } = useInputState(props)
            const api = useValidate(props as any, state)
            expose({ ...api, state, onFocus, onBlur, onInput })
            return () => h('div')
        },
    })

    return mount(Comp, {
        props: initialProps,
    }) as any
}

describe('useValidate', () => {
    it('без rules: hasRules=false, validate возвращает true, ошибок нет', () => {
        const wrapper = mountUseValidate({
            modelValue: '',
        })

        expect(wrapper.vm.hasRules).toBe(false)
        expect(wrapper.vm.errors.hasError).toBe(false)
        expect(wrapper.vm.errors.errorMessage).toBeUndefined()
        expect(wrapper.vm.validate()).toBe(true)
        expect(wrapper.vm.errors.hasError).toBe(false)
        expect(wrapper.vm.errors.errorMessage).toBeUndefined()
    })

    it('с пустым rules: hasRules=false, validate возвращает true', () => {
        const wrapper = mountUseValidate({
            modelValue: '',
            rules: [],
        })

        expect(wrapper.vm.hasRules).toBe(false)
        expect(wrapper.vm.validate()).toBe(true)
        expect(wrapper.vm.errors.hasError).toBe(false)
        expect(wrapper.vm.errors.errorMessage).toBeUndefined()
    })

    it('hasRules=true если rules переданы', () => {
        const rule: ValidateFn = () => ({
            valid: true,
            message: '',
        })

        const wrapper = mountUseValidate({
            modelValue: '',
            rules: [rule],
        })

        expect(wrapper.vm.hasRules).toBe(true)
    })

    it('validate проходит все rules и возвращает true если все валидны', () => {
        const rule1 = vi.fn<ValidateFn>().mockReturnValue({
            valid: true,
            message: '',
        })

        const rule2 = vi.fn<ValidateFn>().mockReturnValue({
            valid: true,
            message: '',
        })

        const wrapper = mountUseValidate({
            modelValue: 'hello',
            rules: [rule1, rule2],
        })

        expect(wrapper.vm.validate()).toBe(true)
        expect(rule1).toHaveBeenCalledWith('hello')
        expect(rule2).toHaveBeenCalledWith('hello')
        expect(wrapper.vm.errors.hasError).toBe(false)
        expect(wrapper.vm.errors.errorMessage).toBeUndefined()
    })

    it('validate останавливается на первой невалидной rule', () => {
        const rule1 = vi.fn<ValidateFn>().mockReturnValue({
            valid: false,
            message: 'Required',
        })

        const rule2 = vi.fn<ValidateFn>().mockReturnValue({
            valid: true,
            message: '',
        })

        const wrapper = mountUseValidate({
            modelValue: '',
            rules: [rule1, rule2],
        })

        expect(wrapper.vm.validate()).toBe(false)
        expect(rule1).toHaveBeenCalledWith('')
        expect(rule2).not.toHaveBeenCalled()
        expect(wrapper.vm.errors.hasError).toBe(true)
        expect(wrapper.vm.errors.errorMessage).toBe('Required')
    })

    it('после успешной validate ошибки очищаются', () => {
        const rule = vi.fn<ValidateFn>()
            .mockReturnValueOnce({
                valid: false,
                message: 'Error',
            })
            .mockReturnValueOnce({
                valid: true,
                message: '',
            })

        const wrapper = mountUseValidate({
            modelValue: 'value',
            rules: [rule],
        })

        expect(wrapper.vm.validate()).toBe(false)
        expect(wrapper.vm.errors.hasError).toBe(true)
        expect(wrapper.vm.errors.errorMessage).toBe('Error')

        expect(wrapper.vm.validate()).toBe(true)
        expect(wrapper.vm.errors.hasError).toBe(false)
        expect(wrapper.vm.errors.errorMessage).toBeUndefined()
    })

    it('watch modelValue валидирует при изменении значения, если modelValue !== null', async () => {
        const rule = vi.fn<ValidateFn>().mockReturnValue({
            valid: false,
            message: 'Too short',
        })

        const wrapper = mountUseValidate({
            modelValue: 'a',
            rules: [rule],
        })

        rule.mockClear()

        await wrapper.setProps({
            modelValue: 'ab',
        })
        await nextTick()

        expect(rule).toHaveBeenCalledWith('ab')
        expect(wrapper.vm.errors.hasError).toBe(true)
        expect(wrapper.vm.errors.errorMessage).toBe('Too short')
    })

    it('при modelValue=null и validateOn=blur не валидирует сразу, а ждет blur', async () => {
        const rule = vi.fn<ValidateFn>().mockReturnValue({
            valid: false,
            message: 'Required',
        })

        const wrapper = mountUseValidate({
            modelValue: 'start',
            rules: [rule],
            validateOn: InputEvents.BLUR,
        })

        rule.mockClear()

        await wrapper.setProps({
            modelValue: null,
        })
        await nextTick()

        expect(rule).not.toHaveBeenCalled()
        expect(wrapper.vm.errors.hasError).toBe(false)
        expect(wrapper.vm.errors.errorMessage).toBeUndefined()

        wrapper.vm.onFocus()
        wrapper.vm.onBlur()
        await nextTick()

        expect(rule).toHaveBeenCalledWith(null)
        expect(wrapper.vm.errors.hasError).toBe(true)
        expect(wrapper.vm.errors.errorMessage).toBe('Required')
    })

    it('валидирует на blur', async () => {
        const rule = vi.fn<ValidateFn>().mockReturnValue({
            valid: false,
            message: 'Blur error',
        })

        const wrapper = mountUseValidate({
            modelValue: 'abc',
            rules: [rule],
            validateOn: InputEvents.INPUT,
        })

        rule.mockClear()

        wrapper.vm.onFocus()
        wrapper.vm.onBlur()
        await nextTick()

        expect(rule).toHaveBeenCalledWith('abc')
        expect(wrapper.vm.errors.hasError).toBe(true)
        expect(wrapper.vm.errors.errorMessage).toBe('Blur error')
    })
})

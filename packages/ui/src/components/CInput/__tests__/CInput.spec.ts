import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'

import { CInput } from '../index'

function getInputValue(event: Event) {
    return (event.target as HTMLInputElement).value
}

function createWrapper(props: Record<string, any> = {}, slots: Record<string, any> = {}) {
    return mount(CInput, {
        props: {
            modelValue: '',
            ...props,
        },
        slots: {
            field: (slotProps: any) => [
                h('input', {
                    class: 'test-field',
                    id: slotProps.uid,
                    ...slotProps.attrs,
                    'data-label': slotProps.label,
                    'data-focused': String(slotProps.focused),
                    'data-disabled': String(slotProps.disabled),
                    'data-readonly': String(slotProps.readonly),
                    'data-clearable': String(slotProps.clearable),
                    'data-has-error': String(slotProps.hasError),
                    'data-error-message': slotProps.errorMessage,
                    onFocus: slotProps.focus,
                    onInput: (event: Event) => slotProps.input(getInputValue(event)),
                    onBlur: slotProps.blur,
                }),

                h(
                    'button',
                    {
                        class: 'test-reset',
                        type: 'button',
                        onClick: slotProps.reset,
                    },
                    'reset',
                ),

                h(
                    'button',
                    {
                        class: 'test-validate',
                        type: 'button',
                        onClick: slotProps.validate,
                    },
                    'validate',
                ),
            ],
            details: (slotProps: any) => slotProps.errorMessage || slotProps.details || '',
            ...slots,
        },
    })
}

describe('CInput', () => {
    it('рендерит field slot и передает базовый публичный slot API', () => {
        const wrapper = createWrapper({
            id: 'email',
            label: 'Email',
            clearable: true,
        })

        const field = wrapper.get('.test-field')

        expect(field.attributes('id')).toBe('email')
        expect(field.attributes('data-label')).toBe('Email')
        expect(field.attributes('data-focused')).toBe('false')
        expect(field.attributes('data-disabled')).toBe('false')
        expect(field.attributes('data-readonly')).toBe('false')
        expect(field.attributes('data-clearable')).toBe('true')
        expect(field.attributes('data-has-error')).toBe('false')
    })

    it('генерирует uid, если id не передан', () => {
        const wrapper = createWrapper()

        const id = wrapper.get('.test-field').attributes('id')

        expect(id).toMatch(/^input-.+/)
    })

    it('использует пользовательский id как есть', () => {
        const wrapper = createWrapper({
            id: 'user-email',
        })

        expect(wrapper.get('.test-field').attributes('id')).toBe('user-email')
    })

    it('пробрасывает разрешенные attrs, aria-* и data-* в field slot attrs', () => {
        const wrapper = mount(CInput, {
            props: {
                modelValue: '',
                id: 'username',
            },
            attrs: {
                type: 'email',
                name: 'email',
                placeholder: 'Введите email',
                autocomplete: 'email',
                'aria-label': 'User email',
                'data-test-id': 'email-field',
                title: 'не должен попасть в поле',
            },
            slots: {
                field: (slotProps: any) => h('input', {
                    class: 'test-field',
                    id: slotProps.uid,
                    ...slotProps.attrs,
                }),
            },
        })

        const field = wrapper.get('.test-field')

        expect(field.attributes('type')).toBe('email')
        expect(field.attributes('name')).toBe('email')
        expect(field.attributes('placeholder')).toBe('Введите email')
        expect(field.attributes('autocomplete')).toBe('email')
        expect(field.attributes('aria-label')).toBe('User email')
        expect(field.attributes('data-test-id')).toBe('email-field')
        expect(field.attributes('title')).toBeUndefined()

        expect(wrapper.attributes('type')).toBeUndefined()
        expect(wrapper.attributes('name')).toBeUndefined()
        expect(wrapper.attributes('placeholder')).toBeUndefined()
        expect(wrapper.attributes('title')).toBeUndefined()
    })

    it('добавляет aria-labelledby, если передан label', () => {
        const wrapper = createWrapper({
            id: 'login',
            label: 'Login',
        })

        expect(wrapper.get('.test-field').attributes('aria-labelledby')).toBe('login-label')
    })

    it('рендерит details и связывает поле через aria-describedby', () => {
        const wrapper = createWrapper({
            id: 'password',
            details: 'Минимум 8 символов',
        })

        expect(wrapper.get('.c-input__details').attributes('id')).toBe('password-details')
        expect(wrapper.get('.c-input__details').text()).toBe('Минимум 8 символов')
        expect(wrapper.get('.test-field').attributes('aria-describedby')).toBe('password-details')
    })

    it('не рендерит details, если noDetails=true', () => {
        const wrapper = createWrapper({
            id: 'password',
            details: 'Минимум 8 символов',
            noDetails: true,
        })

        expect(wrapper.find('.c-input__details').exists()).toBe(false)
        expect(wrapper.get('.test-field').attributes('aria-describedby')).toBeUndefined()
    })

    it('эмитит input через публичную функцию input из field slot', async () => {
        const wrapper = createWrapper()

        await wrapper.get('.test-field').setValue('John')

        expect(wrapper.emitted('input')).toEqual([['John']])
    })

    it('эмитит focus и обновляет focused в slot API', async () => {
        const wrapper = createWrapper()

        await wrapper.get('.test-field').trigger('focus')

        expect(wrapper.emitted('focus')).toEqual([[true]])
        expect(wrapper.get('.test-field').attributes('data-focused')).toBe('true')
        expect(wrapper.classes()).toContain('c-input--focused')
    })

    it('не эмитит focus, если disabled=true', async () => {
        const wrapper = createWrapper({
            disabled: true,
        })

        await wrapper.get('.test-field').trigger('focus')

        expect(wrapper.emitted('focus')).toBeUndefined()
        expect(wrapper.get('.test-field').attributes('data-focused')).toBe('false')
        expect(wrapper.classes()).toContain('c-input--disabled')
        expect(wrapper.get('.test-field').attributes('aria-disabled')).toBe('true')
    })

    it('не эмитит focus, если readonly=true', async () => {
        const wrapper = createWrapper({
            readonly: true,
        })

        await wrapper.get('.test-field').trigger('focus')

        expect(wrapper.emitted('focus')).toBeUndefined()
        expect(wrapper.get('.test-field').attributes('data-focused')).toBe('false')
        expect(wrapper.classes()).toContain('c-input--readonly')
        expect(wrapper.get('.test-field').attributes('aria-readonly')).toBe('true')
    })

    it('эмитит blur и сбрасывает focused', async () => {
        const wrapper = createWrapper()

        await wrapper.get('.test-field').trigger('focus')
        await wrapper.get('.test-field').trigger('blur')

        expect(wrapper.emitted('blur')).toEqual([[false]])
        expect(wrapper.get('.test-field').attributes('data-focused')).toBe('false')
        expect(wrapper.classes()).not.toContain('c-input--focused')
    })

    it('показывает ошибку после validate из slot API', async () => {
        const wrapper = createWrapper({
            id: 'first-name',
            modelValue: '',
            rules: [
                (value: string) => ({
                    valid: !!value,
                    message: 'Required field',
                }),
            ],
        })

        expect(wrapper.get('.test-field').attributes('data-has-error')).toBe('false')
        expect(wrapper.get('.test-field').attributes('aria-invalid')).toBeUndefined()

        await wrapper.get('.test-validate').trigger('click')
        await nextTick()

        expect(wrapper.get('.test-field').attributes('data-has-error')).toBe('true')
        expect(wrapper.get('.test-field').attributes('data-error-message')).toBe('Required field')
        expect(wrapper.get('.test-field').attributes('aria-invalid')).toBe('true')
        expect(wrapper.get('.test-field').attributes('aria-describedby')).toBe('first-name-details')
        expect(wrapper.get('.test-field').attributes('aria-errormessage')).toBe('first-name-details')
        expect(wrapper.get('.c-input__details').text()).toBe('Required field')
        expect(wrapper.classes()).toContain('c-input--has-error')
    })

    it('валидирует значение по input, если validateOn=input', async () => {
        const Host = defineComponent({
            setup() {
                const value = ref('')

                return () => h(
                    CInput,
                    {
                        modelValue: value.value,
                        id: 'nickname',
                        validateOn: 'input',
                        rules: [
                            (currentValue: string) => ({
                                valid: currentValue.length >= 3,
                                message: 'Минимум 3 символа',
                            }),
                        ],
                        onInput: (nextValue: string) => {
                            value.value = nextValue
                        },
                    },
                    {
                        field: (slotProps: any) => h('input', {
                            class: 'test-field',
                            id: slotProps.uid,
                            ...slotProps.attrs,
                            'data-has-error': String(slotProps.hasError),
                            'data-error-message': slotProps.errorMessage,
                            onInput: (event: Event) => slotProps.input(getInputValue(event)),
                        }),
                        details: (slotProps: any) => slotProps.errorMessage || '',
                    },
                )
            },
        })

        const wrapper = mount(Host)

        await wrapper.get('.test-field').setValue('ab')
        await nextTick()

        expect(wrapper.get('.test-field').attributes('data-has-error')).toBe('true')
        expect(wrapper.get('.test-field').attributes('data-error-message')).toBe('Минимум 3 символа')

        await wrapper.get('.test-field').setValue('abc')
        await nextTick()

        expect(wrapper.get('.test-field').attributes('data-has-error')).toBe('false')
        expect(wrapper.get('.test-field').attributes('data-error-message')).toBeUndefined()
    })

    it('сбрасывает ошибку через reset из slot API', async () => {
        const wrapper = createWrapper({
            id: 'last-name',
            modelValue: '',
            rules: [
                (value: string) => ({
                    valid: !!value,
                    message: 'Required field',
                }),
            ],
        })

        await wrapper.get('.test-validate').trigger('click')
        await nextTick()

        expect(wrapper.get('.test-field').attributes('data-has-error')).toBe('true')

        await wrapper.get('.test-reset').trigger('click')
        await nextTick()

        expect(wrapper.get('.test-field').attributes('data-has-error')).toBe('false')
        expect(wrapper.get('.test-field').attributes('data-error-message')).toBe('')
        expect(wrapper.get('.test-field').attributes('aria-invalid')).toBeUndefined()
    })

    it('возвращает результат validate через exposed API', () => {
        const wrapper = createWrapper({
            modelValue: '',
            rules: [
                (value: string) => ({
                    valid: !!value,
                    message: 'Required field',
                }),
            ],
        })

        expect(wrapper.vm.validate()).toBe(false)
    })
})

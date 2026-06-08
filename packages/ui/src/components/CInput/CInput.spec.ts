import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'

import CInput from './CInput.vue'

const formMock = vi.hoisted(() => ({
    add: vi.fn(),
    remove: vi.fn(),
    api: undefined as undefined | {
        add: ReturnType<typeof vi.fn>
        remove: ReturnType<typeof vi.fn>
    },
}))

const coreMock = vi.hoisted(() => ({
    presets: {} as Record<string, any>,
}))

vi.mock('../../composables/use-core', () => ({
    useCore: vi.fn(() => ({
        presets: coreMock.presets,
    })),
}))

vi.mock('../../composables', async () => {
    const actual = await vi.importActual<typeof import('../../composables')>('../../composables')

    return {
        ...actual,
        useForm: vi.fn(() => formMock.api),
    }
})

type MountOptions = {
    attrs?: Record<string, any>
    slots?: Record<string, any>
}

function createWrapper(
    props: Record<string, any> = {},
    options: MountOptions = {},
) {
    return mount(CInput, {
        props: {
            modelValue: '',
            ...props,
        },

        attrs: options.attrs,

        slots: {
            field: `
                <template #field="{ attrs, uid, onFocus, onBlur, onInput, focused, validate, disabled, readonly }">
                    <input
                        class="test-field"
                        :id="uid"
                        v-bind="attrs"
                        :disabled="disabled"
                        :readonly="readonly"
                        :data-focused="String(focused)"
                        :data-disabled="String(disabled)"
                        :data-readonly="String(readonly)"
                        @focus="onFocus"
                        @blur="onBlur"
                        @input="onInput($event.target.value)"
                    />

                    <button
                        class="validate-button"
                        type="button"
                        @click="validate"
                    >
                        validate
                    </button>
                </template>
            `,
            ...options.slots,
        },

        global: {
            stubs: {
                CLabel: {
                    props: ['id', 'tag', 'for'],
                    template: `
                        <component
                            :is="tag || 'label'"
                            :id="id"
                            :for="$props.for"
                            class="c-label-stub"
                        >
                            <slot />
                        </component>
                    `,
                },
            },
        },
    })
}

describe('CInput', () => {
    beforeEach(() => {
        vi.clearAllMocks()

        formMock.api = {
            add: formMock.add,
            remove: formMock.remove,
        }

        coreMock.presets = {
            input: {
                default: {
                    root: ['preset-root'],
                    field: ['preset-field'],
                    label: ['preset-label'],
                    details: ['preset-details'],
                    prepend: ['preset-prepend'],
                    append: ['preset-append'],
                },
            },
        }
    })

    it('рендерит field slot и передает uid на основе props.id', () => {
        const wrapper = createWrapper({
            id: 'email',
            label: 'Email',
        })

        const input = wrapper.get('.test-field')

        expect(input.attributes('id')).toBe('input-email')
        expect(wrapper.get('.c-label-stub').attributes('id')).toBe('input-email-label')
        expect(wrapper.get('.c-label-stub').attributes('for')).toBe('input-email')
    })

    it('генерирует uid, если props.id не передан, и согласованно связывает input и label', () => {
        const wrapper = createWrapper({
            label: 'Name',
        })

        const inputId = wrapper.get('.test-field').attributes('id')
        const labelId = wrapper.get('.c-label-stub').attributes('id')

        expect(inputId).toMatch(/^input-.+/)
        expect(labelId).toBe(`${inputId}-label`)
        expect(wrapper.get('.c-label-stub').attributes('for')).toBe(inputId)
        expect(wrapper.get('.test-field').attributes('aria-labelledby')).toBe(labelId)
    })

    it('рендерит label из props.label', () => {
        const wrapper = createWrapper({
            id: 'name',
            label: 'User name',
        })

        expect(wrapper.find('.c-input__label').exists()).toBe(true)
        expect(wrapper.get('.c-label-stub').text()).toBe('User name')
    })

    it('рендерит кастомный label slot и передает uid', () => {
        const wrapper = createWrapper(
            {
                id: 'login',
                label: 'Login',
            },
            {
                slots: {
                    label: `
                        <template #label="{ uid }">
                            <label
                                class="custom-label"
                                :for="uid"
                            >
                                Custom {{ uid }}
                            </label>
                        </template>
                    `,
                },
            },
        )

        expect(wrapper.find('.c-label-stub').exists()).toBe(false)
        expect(wrapper.get('.custom-label').attributes('for')).toBe('input-login')
        expect(wrapper.get('.custom-label').text()).toBe('Custom input-login')
    })

    it('не рендерит label-блок, если нет props.label и label slot', () => {
        const wrapper = createWrapper()

        expect(wrapper.find('.c-input__label').exists()).toBe(false)
    })

    it('не добавляет aria-labelledby, если label отсутствует', () => {
        const wrapper = createWrapper()

        expect(wrapper.find('.c-input__label').exists()).toBe(false)
        expect(wrapper.get('.test-field').attributes('aria-labelledby')).toBeUndefined()
    })

    it('создает details-контейнер, если передан props.details', () => {
        const wrapper = createWrapper({
            id: 'password',
            details: 'Минимум 8 символов',
        })

        const details = wrapper.get('.c-input__details')

        expect(details.attributes('id')).toBe('input-password-details')
        expect(details.text()).toBe('')
    })

    it('передает props.details в details slot', () => {
        const wrapper = createWrapper(
            {
                id: 'password',
                details: 'Минимум 8 символов',
            },
            {
                slots: {
                    details: `
                        <template #details="{ uid, details }">
                            <p class="custom-details">
                                {{ uid }} / {{ details }}
                            </p>
                        </template>
                    `,
                },
            },
        )

        expect(wrapper.get('.custom-details').text()).toBe(
            'input-password / Минимум 8 символов',
        )
    })

    it('не рендерит details, если нет props.details, details slot и ошибки', () => {
        const wrapper = createWrapper({
            id: 'email',
        })

        expect(wrapper.find('.c-input__details').exists()).toBe(false)
    })

    it('не рендерит details, если props.details — пустая строка', () => {
        const wrapper = createWrapper({
            details: '',
        })

        expect(wrapper.find('.c-input__details').exists()).toBe(false)
        expect(wrapper.get('.test-field').attributes('aria-describedby')).toBeUndefined()
    })

    it('добавляет aria-describedby, если есть props.details', () => {
        const wrapper = createWrapper({
            id: 'email',
            details: 'Введите email',
        })

        expect(wrapper.get('.test-field').attributes('aria-describedby')).toBe('input-email-details')
    })

    it('добавляет aria-describedby, если есть details slot', () => {
        const wrapper = createWrapper(
            {
                id: 'email',
            },
            {
                slots: {
                    details: '<template #details>Описание из слота</template>',
                },
            },
        )

        expect(wrapper.get('.test-field').attributes('aria-describedby')).toBe('input-email-details')
    })

    it('не рендерит details и не добавляет aria-describedby, если noDetails=true', async () => {
        const wrapper = createWrapper({
            id: 'email',
            noDetails: true,
            details: 'Описание',
            rules: [
                () => ({
                    valid: false,
                    message: 'Ошибка',
                }),
            ],
        })

        await (wrapper.vm as any).validate()
        await nextTick()

        expect(wrapper.find('.c-input__details').exists()).toBe(false)
        expect(wrapper.get('.test-field').attributes('aria-describedby')).toBeUndefined()
    })

    it('не добавляет aria-describedby и aria-errormessage при ошибке, если noDetails=true', async () => {
        const wrapper = createWrapper({
            id: 'email',
            noDetails: true,
            modelValue: '',
            rules: [
                () => ({
                    valid: false,
                    message: 'Ошибка',
                }),
            ],
        })

        await (wrapper.vm as any).validate()
        await nextTick()

        const input = wrapper.get('.test-field')

        expect(wrapper.find('.c-input__details').exists()).toBe(false)
        expect(input.attributes('aria-invalid')).toBe('true')
        expect(input.attributes('aria-describedby')).toBeUndefined()
        expect(input.attributes('aria-errormessage')).toBeUndefined()
    })

    it('передает errors в details slot после неуспешной validate', async () => {
        const wrapper = createWrapper(
            {
                id: 'password',
                modelValue: '',
                rules: [
                    () => ({
                        valid: false,
                        message: 'Некорректное значение',
                    }),
                ],
            },
            {
                slots: {
                    details: `
                        <template #details="{ uid, hasError, errorMessage }">
                            <p
                                class="custom-details"
                                :data-uid="uid"
                                :data-error="String(hasError)"
                            >
                                {{ errorMessage }}
                            </p>
                        </template>
                    `,
                },
            },
        )

        await (wrapper.vm as any).validate()
        await nextTick()

        expect(wrapper.get('.custom-details').attributes('data-uid')).toBe('input-password')
        expect(wrapper.get('.custom-details').attributes('data-error')).toBe('true')
        expect(wrapper.get('.custom-details').text()).toBe('Некорректное значение')
    })

    it('передает validation state в field slot для кастомных сценариев', async () => {
        const wrapper = createWrapper(
            {
                modelValue: '',
                rules: [
                    () => ({
                        valid: false,
                        message: 'Ошибка',
                    }),
                ],
            },
            {
                slots: {
                    field: `
                        <template #field="{ hasError, errorMessage, validate }">
                            <button
                                class="custom-validate"
                                type="button"
                                @click="validate"
                            >
                                validate
                            </button>

                            <div
                                class="custom-field"
                                :data-error="String(hasError)"
                                :data-message="errorMessage"
                            />
                        </template>
                    `,
                },
            },
        )

        expect(wrapper.get('.custom-field').attributes('data-error')).toBe('false')
        expect(wrapper.get('.custom-field').attributes('data-message')).toBeUndefined()

        await wrapper.get('.custom-validate').trigger('click')
        await nextTick()

        expect(wrapper.get('.custom-field').attributes('data-error')).toBe('true')
        expect(wrapper.get('.custom-field').attributes('data-message')).toBe('Ошибка')
    })

    it('создает details-контейнер при ошибке даже без props.details', async () => {
        const wrapper = createWrapper({
            id: 'email',
            modelValue: '',
            rules: [
                () => ({
                    valid: false,
                    message: 'Поле обязательно',
                }),
            ],
        })

        expect(wrapper.find('.c-input__details').exists()).toBe(false)

        await (wrapper.vm as any).validate()
        await nextTick()

        const details = wrapper.get('.c-input__details')

        expect(details.attributes('id')).toBe('input-email-details')
        expect(details.text()).toBe('')
    })

    it('рендерит prepend и append slots', () => {
        const wrapper = createWrapper(
            {},
            {
                slots: {
                    prepend: '<span class="prepend-content">before</span>',
                    append: '<span class="append-content">after</span>',
                },
            },
        )

        expect(wrapper.get('.c-input__prepend').text()).toBe('before')
        expect(wrapper.get('.c-input__append').text()).toBe('after')
    })

    it('добавляет классы для prepend и append', () => {
        const wrapper = createWrapper(
            {},
            {
                slots: {
                    prepend: '<span>before</span>',
                    append: '<span>after</span>',
                },
            },
        )

        expect(wrapper.classes()).toContain('c-input--has-prepend')
        expect(wrapper.classes()).toContain('c-input--has-append')
    })

    it('рендерит структурные блоки root, field, label и details', () => {
        const wrapper = createWrapper({
            label: 'Email',
            details: 'Введите email',
        })

        expect(wrapper.classes()).toContain('c-input')
        expect(wrapper.find('.c-input__field').exists()).toBe(true)
        expect(wrapper.find('.c-input__label').exists()).toBe(true)
        expect(wrapper.find('.c-input__details').exists()).toBe(true)
    })

    it('прокидывает разрешенные field attrs в slot field', () => {
        const wrapper = createWrapper(
            {},
            {
                attrs: {
                    type: 'email',
                    name: 'email',
                    autocomplete: 'email',
                    placeholder: 'Enter email',
                    inputmode: 'email',
                    'aria-label': 'Email field',
                    'data-test-id': 'email-input',
                },
            },
        )

        const input = wrapper.get('.test-field')

        expect(input.attributes('type')).toBe('email')
        expect(input.attributes('name')).toBe('email')
        expect(input.attributes('autocomplete')).toBe('email')
        expect(input.attributes('placeholder')).toBe('Enter email')
        expect(input.attributes('inputmode')).toBe('email')
        expect(input.attributes('aria-label')).toBe('Email field')
        expect(input.attributes('data-test-id')).toBe('email-input')
    })

    it('прокидывает validation-related attrs в field slot', () => {
        const wrapper = createWrapper(
            {},
            {
                attrs: {
                    required: true,
                    minlength: 3,
                    maxlength: 10,
                    pattern: '[a-z]+',
                },
            },
        )

        const input = wrapper.get('.test-field')

        expect(input.attributes('required')).toBeDefined()
        expect(input.attributes('minlength')).toBe('3')
        expect(input.attributes('maxlength')).toBe('10')
        expect(input.attributes('pattern')).toBe('[a-z]+')
    })

    it('прокидывает readonly и disabled из attrs в field attrs', () => {
        const wrapper = createWrapper(
            {},
            {
                attrs: {
                    readonly: true,
                    disabled: true,
                },
            },
        )

        const input = wrapper.get('.test-field')

        expect(input.attributes('readonly')).toBeDefined()
        expect(input.attributes('disabled')).toBeDefined()
    })

    it('не прокидывает id из attrs в field attrs и не ломает связку label/input', () => {
        const wrapper = createWrapper(
            {
                label: 'Email',
            },
            {
                attrs: {
                    id: 'external-id',
                },
            },
        )

        const input = wrapper.get('.test-field')
        const label = wrapper.get('.c-label-stub')
        const inputId = input.attributes('id')

        expect(inputId).toMatch(/^input-.+/)
        expect(inputId).not.toBe('external-id')
        expect(label.attributes('for')).toBe(inputId)
        expect(label.attributes('id')).toBe(`${inputId}-label`)
        expect(input.attributes('aria-labelledby')).toBe(label.attributes('id'))
    })

    it('не прокидывает неизвестные attrs в field slot', () => {
        const wrapper = createWrapper(
            {},
            {
                attrs: {
                    title: 'Should not be passed',
                    role: 'textbox',
                    random: 'value',
                },
            },
        )

        const input = wrapper.get('.test-field')

        expect(input.attributes('title')).toBeUndefined()
        expect(input.attributes('role')).toBeUndefined()
        expect(input.attributes('random')).toBeUndefined()
    })

    it('добавляет class из attrs на root, но не прокидывает class в field attrs', () => {
        const wrapper = createWrapper(
            {},
            {
                attrs: {
                    class: 'external-class',
                },
            },
        )

        expect(wrapper.classes()).toContain('external-class')
        expect(wrapper.get('.test-field').classes()).not.toContain('external-class')
    })

    it('добавляет aria-labelledby, если есть label', () => {
        const wrapper = createWrapper({
            id: 'email',
            label: 'Email',
        })

        expect(wrapper.get('.test-field').attributes('aria-labelledby')).toBe('input-email-label')
    })

    it('добавляет aria-invalid и aria-errormessage после ошибки валидации', async () => {
        const wrapper = createWrapper({
            id: 'email',
            modelValue: '',
            rules: [
                () => ({
                    valid: false,
                    message: 'Поле обязательно',
                }),
            ],
        })

        await (wrapper.vm as any).validate()
        await nextTick()

        const input = wrapper.get('.test-field')

        expect(input.attributes('aria-invalid')).toBe('true')
        expect(input.attributes('aria-errormessage')).toBe('input-email-details')
        expect(input.attributes('aria-describedby')).toBe('input-email-details')
    })

    it('добавляет aria-invalid без aria-errormessage, если сообщение ошибки пустое', async () => {
        const wrapper = createWrapper({
            id: 'email',
            modelValue: '',
            rules: [
                () => ({
                    valid: false,
                    message: '',
                }),
            ],
        })

        await (wrapper.vm as any).validate()
        await nextTick()

        const input = wrapper.get('.test-field')

        expect(input.attributes('aria-invalid')).toBe('true')
        expect(input.attributes('aria-errormessage')).toBeUndefined()
    })

    it('controlled aria перезаписывает пользовательские aria attrs', async () => {
        const wrapper = createWrapper(
            {
                id: 'email',
                label: 'Email',
                details: 'Введите email',
                rules: [
                    () => ({
                        valid: false,
                        message: 'Ошибка',
                    }),
                ],
            },
            {
                attrs: {
                    'aria-labelledby': 'external-label',
                    'aria-describedby': 'external-details',
                    'aria-invalid': 'false',
                    'aria-errormessage': 'external-error',
                },
            },
        )

        await (wrapper.vm as any).validate()
        await nextTick()

        const input = wrapper.get('.test-field')

        expect(input.attributes('aria-labelledby')).toBe('input-email-label')
        expect(input.attributes('aria-describedby')).toBe('input-email-details')
        expect(input.attributes('aria-invalid')).toBe('true')
        expect(input.attributes('aria-errormessage')).toBe('input-email-details')
    })

    it('добавляет aria-readonly и aria-disabled из props', () => {
        const wrapper = createWrapper({
            readonly: true,
            disabled: true,
        })

        const input = wrapper.get('.test-field')

        expect(input.attributes('aria-readonly')).toBe('true')
        expect(input.attributes('aria-disabled')).toBe('true')
    })

    it('имеет default-класс без ошибки', () => {
        const wrapper = createWrapper()

        expect(wrapper.classes()).toContain('c-input--default')
        expect(wrapper.classes()).not.toContain('c-input--has-error')
    })

    it('имеет error-класс после неуспешной validate', async () => {
        const wrapper = createWrapper({
            modelValue: '',
            rules: [
                () => ({
                    valid: false,
                    message: 'Ошибка',
                }),
            ],
        })

        await (wrapper.vm as any).validate()
        await nextTick()

        expect(wrapper.classes()).toContain('c-input--has-error')
        expect(wrapper.classes()).not.toContain('c-input--default')
    })

    it('добавляет disabled и readonly классы из props', () => {
        const wrapper = createWrapper({
            disabled: true,
            readonly: true,
        })

        expect(wrapper.classes()).toContain('c-input--disabled')
        expect(wrapper.classes()).toContain('c-input--readonly')
    })

    it('инициализирует focused из props.focused', () => {
        const wrapper = createWrapper({
            focused: true,
        })

        expect(wrapper.classes()).toContain('c-input--focused')
        expect(wrapper.get('.test-field').attributes('data-focused')).toBe('true')
    })

    it('при focus выставляет focused=true и эмитит focus', async () => {
        const wrapper = createWrapper()

        await wrapper.get('.test-field').trigger('focus')

        expect(wrapper.classes()).toContain('c-input--focused')
        expect(wrapper.emitted('focus')).toEqual([[true]])
        expect(wrapper.get('.test-field').attributes('data-focused')).toBe('true')
    })

    it('не делает focus и не эмитит focus, если disabled=true', async () => {
        const wrapper = createWrapper({
            disabled: true,
        })

        await wrapper.get('.test-field').trigger('focus')

        expect(wrapper.classes()).not.toContain('c-input--focused')
        expect(wrapper.emitted('focus')).toBeUndefined()
    })

    it('не делает focus и не эмитит focus, если readonly=true', async () => {
        const wrapper = createWrapper({
            readonly: true,
        })

        await wrapper.get('.test-field').trigger('focus')

        expect(wrapper.classes()).not.toContain('c-input--focused')
        expect(wrapper.emitted('focus')).toBeUndefined()
    })

    it('при blur сбрасывает focused=false и эмитит blur', async () => {
        const wrapper = createWrapper({
            focused: true,
        })

        await wrapper.get('.test-field').trigger('blur')

        expect(wrapper.classes()).not.toContain('c-input--focused')
        expect(wrapper.emitted('blur')).toEqual([[false]])
        expect(wrapper.get('.test-field').attributes('data-focused')).toBe('false')
    })

    it('при input эмитит input со значением', async () => {
        const wrapper = createWrapper()

        await wrapper.get<HTMLInputElement>('.test-field').setValue('hello')

        expect(wrapper.emitted('input')).toEqual([['hello']])
    })

    it('передает disabled и readonly в field slot', () => {
        const wrapper = createWrapper({
            disabled: true,
            readonly: true,
        })

        const input = wrapper.get('.test-field')

        expect(input.attributes('data-disabled')).toBe('true')
        expect(input.attributes('data-readonly')).toBe('true')
        expect(input.attributes('disabled')).toBeDefined()
        expect(input.attributes('readonly')).toBeDefined()
    })

    it('ставит c-input--has-value для непустой строки', () => {
        const wrapper = createWrapper({
            modelValue: 'hello',
        })

        expect(wrapper.classes()).toContain('c-input--has-value')
    })

    it('не ставит c-input--has-value для пустой строки', () => {
        const wrapper = createWrapper({
            modelValue: '',
        })

        expect(wrapper.classes()).not.toContain('c-input--has-value')
    })

    it('ставит c-input--has-value для числа 0', () => {
        const wrapper = createWrapper({
            modelValue: 0,
            type: 'number',
        })

        expect(wrapper.classes()).toContain('c-input--has-value')
    })

    it('ставит c-input--has-value для непустого массива', () => {
        const wrapper = createWrapper({
            modelValue: ['one'],
        })

        expect(wrapper.classes()).toContain('c-input--has-value')
    })

    it('не ставит c-input--has-value для пустого массива', () => {
        const wrapper = createWrapper({
            modelValue: [],
        })

        expect(wrapper.classes()).not.toContain('c-input--has-value')
    })

    it('не ставит c-input--has-value для null и undefined', async () => {
        const wrapper = createWrapper({
            modelValue: null,
        })

        expect(wrapper.classes()).not.toContain('c-input--has-value')

        await wrapper.setProps({
            modelValue: undefined,
        })

        expect(wrapper.classes()).not.toContain('c-input--has-value')
    })

    it('обновляет c-input--has-value при изменении modelValue', async () => {
        const wrapper = createWrapper({
            modelValue: '',
        })

        expect(wrapper.classes()).not.toContain('c-input--has-value')

        await wrapper.setProps({
            modelValue: 'new value',
        })

        expect(wrapper.classes()).toContain('c-input--has-value')

        await wrapper.setProps({
            modelValue: '',
        })

        expect(wrapper.classes()).not.toContain('c-input--has-value')
    })

    it('регистрирует validate в formApi при mount', () => {
        createWrapper()

        expect(formMock.add).toHaveBeenCalledTimes(1)
        expect(formMock.add).toHaveBeenCalledWith(expect.any(Function))
    })

    it('удаляет validate из formApi при unmount', () => {
        const wrapper = createWrapper()

        wrapper.unmount()

        expect(formMock.remove).toHaveBeenCalledTimes(1)
        expect(formMock.remove).toHaveBeenCalledWith(expect.any(Function))
    })

    it('передает в formApi.add и formApi.remove одну и ту же validate-функцию', () => {
        const wrapper = createWrapper()

        const registeredValidate = formMock.add.mock.calls[0][0]

        wrapper.unmount()

        expect(formMock.remove).toHaveBeenCalledWith(registeredValidate)
    })

    it('не падает, если useForm вернул undefined', () => {
        formMock.api = undefined

        const wrapper = createWrapper()

        expect(() => wrapper.unmount()).not.toThrow()
    })

    it('expose validate запускает правила валидации', async () => {
        const rule = vi.fn(() => ({
            valid: true,
            message: '',
        }))

        const wrapper = createWrapper({
            modelValue: 'hello',
            rules: [rule],
        })

        await (wrapper.vm as any).validate()

        expect(rule).toHaveBeenCalledTimes(1)
        expect(rule).toHaveBeenCalledWith('hello')
    })

    it('field slot получает validate и может вызвать его', async () => {
        const rule = vi.fn(() => ({
            valid: true,
            message: '',
        }))

        const wrapper = createWrapper({
            modelValue: 'hello',
            rules: [rule],
        })

        await wrapper.get('.validate-button').trigger('click')

        expect(rule).toHaveBeenCalledTimes(1)
        expect(rule).toHaveBeenCalledWith('hello')
    })

    it('expose onFocus работает как публичный метод', async () => {
        const wrapper = createWrapper()

        ;(wrapper.vm as any).onFocus()
        await nextTick()

        expect(wrapper.classes()).toContain('c-input--focused')
        expect(wrapper.emitted('focus')).toEqual([[true]])
    })

    it('expose onFocus ничего не делает при disabled=true', async () => {
        const wrapper = createWrapper({
                disabled: true,
            })

        ;(wrapper.vm as any).onFocus()
        await nextTick()

        expect(wrapper.classes()).not.toContain('c-input--focused')
        expect(wrapper.emitted('focus')).toBeUndefined()
    })

    it('expose onFocus ничего не делает при readonly=true', async () => {
        const wrapper = createWrapper({
                readonly: true,
            })

        ;(wrapper.vm as any).onFocus()
        await nextTick()

        expect(wrapper.classes()).not.toContain('c-input--focused')
        expect(wrapper.emitted('focus')).toBeUndefined()
    })

    it('expose onBlur работает как публичный метод', async () => {
        const wrapper = createWrapper({
                focused: true,
            })

        ;(wrapper.vm as any).onBlur()
        await nextTick()

        expect(wrapper.classes()).not.toContain('c-input--focused')
        expect(wrapper.emitted('blur')).toEqual([[false]])
    })

    it('expose onInput эмитит input', () => {
        const wrapper = createWrapper()

        ;(wrapper.vm as any).onInput(123)

        expect(wrapper.emitted('input')).toEqual([[123]])
    })

    it('обновляет aria, details и классы после ошибки валидации', async () => {
        const wrapper = createWrapper({
            id: 'email',
            modelValue: '',
            rules: [
                () => ({
                    valid: false,
                    message: 'Ошибка',
                }),
            ],
        })

        expect(wrapper.classes()).toContain('c-input--default')
        expect(wrapper.get('.test-field').attributes('aria-invalid')).toBeUndefined()
        expect(wrapper.find('.c-input__details').exists()).toBe(false)

        await (wrapper.vm as any).validate()
        await nextTick()

        expect(wrapper.classes()).toContain('c-input--has-error')
        expect(wrapper.get('.test-field').attributes('aria-invalid')).toBe('true')
        expect(wrapper.get('.test-field').attributes('aria-describedby')).toBe('input-email-details')
        expect(wrapper.get('.test-field').attributes('aria-errormessage')).toBe('input-email-details')
        expect(wrapper.find('.c-input__details').exists()).toBe(true)
    })

    it('применяет preset-классы к DOM-зонам CInput', () => {
        const wrapper = createWrapper(
            {
                preset: 'input.default',
                label: 'Email',
                details: 'Введите email',
            },
            {
                slots: {
                    prepend: '<span>before</span>',
                    append: '<span>after</span>',
                },
            },
        )

        expect(wrapper.classes()).toContain('preset-root')
        expect(wrapper.get('.c-input__field').classes()).toContain('preset-field')
        expect(wrapper.get('.c-input__label').classes()).toContain('preset-label')
        expect(wrapper.get('.c-input__details').classes()).toContain('preset-details')
        expect(wrapper.get('.c-input__prepend').classes()).toContain('preset-prepend')
        expect(wrapper.get('.c-input__append').classes()).toContain('preset-append')
    })

    it('передает field preset в field slot как presets', () => {
        const wrapper = createWrapper(
            {
                preset: 'input.default',
            },
            {
                slots: {
                    field: `
                        <template #field="{ presets }">
                            <div
                                class="custom-field"
                                :data-presets="presets.join(' ')"
                            />
                        </template>
                    `,
                },
            },
        )

        expect(wrapper.get('.custom-field').attributes('data-presets')).toContain('preset-field')
    })
})

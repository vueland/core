import { beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, reactive, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { CForm, CInput } from '../../src/components'
import { $FORM_API_KEY } from '../../src/constants'

const validateMock = vi.fn(() => true)
const onFocusMock = vi.fn()
const onBlurMock = vi.fn()
const onInputMock = vi.fn()

const focusedRef = ref(false)
const hasValueRef = ref(false)

const state = reactive({
    hasError: false,
    errorMessage: undefined as string | undefined,
})

vi.mock('../../src/composables', async () => {
    const actual = await vi.importActual<any>('../../src/composables')

    return {
        ...actual,
        useValidate: vi.fn(() => ({
            state: state,
            focused: focusedRef,
            hasValue: hasValueRef,
            onFocus: onFocusMock,
            onBlur: onBlurMock,
            onInput: onInputMock,
            validate: validateMock,
        })),
    }
})

const CLabelStub = defineComponent({
    name: 'CLabel',
    props: {
        tag: {
            type: String,
            default: 'label',
        },
    },
    setup(props, { slots }) {
        return () => h(props.tag, { class: 'c-label-stub' }, slots.default?.())
    },
})

const mountComponent = (
    props: Record<string, any> = {},
    options: Record<string, any> = {},
) => {
    return mount(CInput as any, {
        props: {
            modelValue: '',
            ...props,
        },
        global: {
            stubs: {
                CLabel: CLabelStub,
            },
            ...(options.global ?? {}),
        },
        ...options,
    })
}

describe('CInput', () => {
    beforeEach(() => {
        vi.clearAllMocks()

        focusedRef.value = false
        hasValueRef.value = false

        state.hasError = false
        state.errorMessage = undefined
    })

    it('рендерит корневой элемент и базовые классы', () => {
        const wrapper = mountComponent()

        expect(wrapper.classes()).toContain('c-input')
        expect(wrapper.classes()).toContain('c-input--default')
        expect(wrapper.classes()).not.toContain('c-input--has-error')
        expect(wrapper.classes()).not.toContain('c-input--focused')
        expect(wrapper.classes()).not.toContain('c-input--has-value')
    })

    it('добавляет внешний class из attrs', () => {
        const wrapper = mountComponent({}, {
            attrs: {
                class: 'custom-class',
            },
        })

        expect(wrapper.classes()).toContain('custom-class')
    })

    it('ставит error-классы если есть ошибка', () => {
        state.hasError = true
        state.errorMessage = 'Required'

        const wrapper = mountComponent()

        expect(wrapper.classes()).toContain('c-input--has-error')
        expect(wrapper.classes()).not.toContain('c-input--default')
    })

    it('ставит focused-класс из useValidate', () => {
        focusedRef.value = true

        const wrapper = mountComponent()

        expect(wrapper.classes()).toContain('c-input--focused')
    })

    it('ставит disabled/readonly/hasValue классы', () => {
        hasValueRef.value = true

        const wrapper = mountComponent({
            disabled: true,
            readonly: true,
        })

        expect(wrapper.classes()).toContain('c-input--disabled')
        expect(wrapper.classes()).toContain('c-input--readonly')
        expect(wrapper.classes()).toContain('c-input--has-value')
    })

    it('рендерит field slot и пробрасывает в него API', () => {
        let slotProps: any

        const wrapper = mountComponent({}, {
            slots: {
                field: (props: any) => {
                    slotProps = props
                    return h('input', { class: 'field-slot' })
                },
            },
        })

        expect(wrapper.find('.field-slot').exists()).toBe(true)

        expect(slotProps).toBeTruthy()
        expect(slotProps.validate).toBe(validateMock)
        expect(slotProps.onFocus).toBe(onFocusMock)
        expect(slotProps.onBlur).toBe(onBlurMock)
        expect(slotProps.onInput).toBe(onInputMock)
        expect(slotProps.focused).toBe(focusedRef.value)
        expect(slotProps.hasError).toBe(false)
        expect(slotProps.errorMessage).toBeUndefined()
    })

    it('передает актуальные errors в field slot', () => {
        state.hasError = true
        state.errorMessage = 'Invalid value'

        let slotProps: any

        mountComponent({}, {
            slots: {
                field: (props: any) => {
                    slotProps = props
                    return h('input')
                },
            },
        })

        expect(slotProps.hasError).toBe(true)
        expect(slotProps.errorMessage).toBe('Invalid value')
    })

    it('рендерит label через prop', () => {
        const wrapper = mountComponent({
            label: 'Email',
        }, {
            slots: {
                field: () => h('input'),
            },
        })

        expect(wrapper.find('.c-input__label').exists()).toBe(true)
        expect(wrapper.find('.c-label-stub').exists()).toBe(true)
        expect(wrapper.find('.c-input__label').text()).toContain('Email')
    })

    it('рендерит label slot вместо fallback label', () => {
        const wrapper = mountComponent({
            label: 'Fallback label',
        }, {
            slots: {
                field: () => h('input'),
                label: () => h('div', { class: 'label-slot' }, 'Custom label'),
            },
        })

        expect(wrapper.find('.c-input__label').exists()).toBe(true)
        expect(wrapper.find('.label-slot').exists()).toBe(true)
        expect(wrapper.find('.c-label-stub').exists()).toBe(false)
    })

    it('не рендерит label блок если нет ni label prop ni label slot', () => {
        const wrapper = mountComponent({}, {
            slots: {
                field: () => h('input'),
            },
        })

        expect(wrapper.find('.c-input__label').exists()).toBe(false)
    })

    it('рендерит prepend slot и класс c-input--has-prepend', () => {
        const wrapper = mountComponent({}, {
            slots: {
                field: () => h('input'),
                prepend: () => h('span', { class: 'prepend-slot' }, 'P'),
            },
        })

        expect(wrapper.find('.c-input__prepend').exists()).toBe(true)
        expect(wrapper.find('.prepend-slot').exists()).toBe(true)
        expect(wrapper.classes()).toContain('c-input--has-prepend')
    })

    it('рендерит append slot и класс c-input--has-append', () => {
        const wrapper = mountComponent({}, {
            slots: {
                field: () => h('input'),
                append: () => h('span', { class: 'append-slot' }, 'A'),
            },
        })

        expect(wrapper.find('.c-input__append').exists()).toBe(true)
        expect(wrapper.find('.append-slot').exists()).toBe(true)
        expect(wrapper.classes()).toContain('c-input--has-append')
    })

    it('рендерит details через prop details', () => {
        const wrapper = mountComponent({
            details: 'Helper text',
        }, {
            slots: {
                field: () => h('input'),
            },
        })

        expect(wrapper.find('.c-input__details').exists()).toBe(true)
        expect(wrapper.find('.c-input__details').text()).toContain('Helper text')
    })

    it('рендерит details slot и пробрасывает errors', () => {
        state.hasError = true
        state.errorMessage = 'Some error'

        let slotProps: any

        const wrapper = mountComponent({}, {
            slots: {
                field: () => h('input'),
                details: (props: any) => {
                    slotProps = props
                    return h('div', { class: 'details-slot' }, props.errorMessage)
                },
            },
        })

        expect(wrapper.find('.c-input__details').exists()).toBe(true)
        expect(wrapper.find('.details-slot').exists()).toBe(true)
        expect(wrapper.find('.details-slot').text()).toBe('Some error')
        expect(slotProps).toEqual({
            hasError: true,
            errorMessage: 'Some error',
        })
    })

    it('не рендерит details если noDetails=true', () => {
        const wrapper = mountComponent({
            details: 'Helper text',
            noDetails: true,
        }, {
            slots: {
                field: () => h('input'),
            },
        })

        expect(wrapper.find('.c-input__details').exists()).toBe(false)
    })

    it('регистрирует validate в form api при mount', () => {
        const add = vi.fn()
        const remove = vi.fn()

        mountComponent({}, {
            slots: {
                field: () => h('input'),
            },
            global: {
                provide: {
                    [$FORM_API_KEY as symbol]: {
                        add,
                        remove,
                    },
                },
            },
        })

        expect(add).toHaveBeenCalledTimes(1)
        expect(add).toHaveBeenCalledWith(validateMock)
        expect(remove).not.toHaveBeenCalled()
    })

    it('удаляет validate из form api при unmount', () => {
        const add = vi.fn()
        const remove = vi.fn()

        const wrapper = mountComponent({}, {
            slots: {
                field: () => h('input'),
            },
            global: {
                provide: {
                    [$FORM_API_KEY as symbol]: {
                        add,
                        remove,
                    },
                },
            },
        })

        wrapper.unmount()

        expect(add).toHaveBeenCalledWith(validateMock)
        expect(remove).toHaveBeenCalledTimes(1)
        expect(remove).toHaveBeenCalledWith(validateMock)
    })

    it('работает внутри реального CForm: форма регистрирует валидатор и вызывает его через expose.validate()', async () => {
        const form = ref()
        const value = ref('')

        const wrapper = mount({
            components: { CForm, CInput },
            setup() {
                return () => h(CForm, { ref: form }, {
                    default: () => [
                        h(CInput as any, { modelValue: value }, {
                            field: () => h('input'),
                        }),
                    ],
                })
            },
        }, {
            global: {
                stubs: {
                    CLabel: CLabelStub,
                },
            },
        }) as any

        expect(validateMock).not.toHaveBeenCalled()

        const result = await form.value.validate()

        expect(result).toBe(true)
        expect(validateMock).toHaveBeenCalledTimes(1)
    })

    it('внутри CForm после unmount input валидатор удаляется и больше не вызывается', async () => {
        const form = ref()
        const value = ref('')
        const show = ref(true)

        const Host = defineComponent({
            components: { CForm, CInput },
            setup() {
                return () => h(CForm, { ref: form }, {
                    default: () => show.value
                        ? [h(CInput as any, { modelValue: value.value }, { field: () => h('input') })]
                        : [],
                })
            },
        })

        mount(Host, {
            global: {
                stubs: {
                    CLabel: CLabelStub,
                },
            },
        }) as any

        await form.value.validate()
        expect(validateMock).toHaveBeenCalledTimes(1)

        show.value = false
        await nextTick()

        validateMock.mockClear()

        const result = await form.value.validate()

        expect(result).toBe(true)
        expect(validateMock).not.toHaveBeenCalled()
    })

    it('не падает без form api', () => {
        const wrapper = mountComponent({}, {
            slots: {
                field: () => h('input'),
            },
        })

        expect(wrapper.exists()).toBe(true)
        expect(() => wrapper.unmount()).not.toThrow()
    })

    it('expose пробрасывает validate/onFocus/onBlur/onInput', () => {
        const wrapper = mountComponent({}, {
            slots: {
                field: () => h('input'),
            },
        }) as any

        expect(wrapper.vm.validate).toBe(validateMock)
        expect(wrapper.vm.onFocus).toBe(onFocusMock)
        expect(wrapper.vm.onBlur).toBe(onBlurMock)
        expect(wrapper.vm.onInput).toBe(onInputMock)
    })
})

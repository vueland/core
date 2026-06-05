import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import {
    InputEvents,
    type InputState,
    type ValidateFn,
    type ValidateProps,
    useValidate,
} from '../../src/composables'

type TestComponentVm = {
    errors: {
        errorMessage: string | undefined
        hasError: boolean
    }
    hasRules: boolean
    validate: () => boolean
    state: InputState
}

function createRule(valid: boolean, message = ''): ValidateFn {
    return vi.fn(() => ({
        valid,
        message,
    }))
}

function mountUseValidate(options: ValidateProps & {
    modelValue?: any
    state?: Partial<InputState>
} = {}) {
    const TestComponent = defineComponent({
        name: 'UseValidateTestComponent',

        props: {
            modelValue: {
                type: null,
                default: undefined,
            },
            rules: {
                type: Array as () => ValidateFn[],
                default: undefined,
            },
            validateOn: {
                type: String as () => 'input' | 'blur',
                default: undefined,
            },
        },

        setup(props, { expose }) {
            const state = reactive<InputState>({
                focused: options.state?.focused ?? false,
                isDirty: options.state?.isDirty ?? false,
                hasValue: options.state?.hasValue ?? false,
            })

            const api = useValidate(props, state)

            expose({
                ...api,
                state,
            })

            return () => h('input')
        },
    })

    return mount(TestComponent, {
        props: {
            modelValue: options.modelValue,
            rules: options.rules,
            validateOn: options.validateOn,
        },
    })
}

describe('useValidate', () => {
    describe('начальное состояние', () => {
        it('создает пустое состояние ошибок', () => {
            const wrapper = mountUseValidate()
            const vm = wrapper.vm as unknown as TestComponentVm

            expect(vm.errors.hasError).toBe(false)
            expect(vm.errors.errorMessage).toBeUndefined()
        })

        it('hasRules возвращает false, если rules не переданы', () => {
            const wrapper = mountUseValidate()
            const vm = wrapper.vm as unknown as TestComponentVm

            expect(vm.hasRules).toBe(false)
        })

        it('hasRules возвращает false, если rules пустой массив', () => {
            const wrapper = mountUseValidate({
                rules: [],
            })
            const vm = wrapper.vm as unknown as TestComponentVm

            expect(vm.hasRules).toBe(false)
        })

        it('hasRules возвращает true, если есть хотя бы одно правило', () => {
            const wrapper = mountUseValidate({
                rules: [createRule(true)],
            })
            const vm = wrapper.vm as unknown as TestComponentVm

            expect(vm.hasRules).toBe(true)
        })

        it('реактивно обновляет hasRules при изменении rules', async () => {
            const wrapper = mountUseValidate({
                rules: [],
            })
            const vm = wrapper.vm as unknown as TestComponentVm

            expect(vm.hasRules).toBe(false)

            await wrapper.setProps({
                rules: [createRule(true)],
            })

            expect(vm.hasRules).toBe(true)

            await wrapper.setProps({
                rules: [],
            })

            expect(vm.hasRules).toBe(false)
        })
    })

    describe('validate', () => {
        it('возвращает true, если правил нет', () => {
            const wrapper = mountUseValidate()
            const vm = wrapper.vm as unknown as TestComponentVm

            expect(vm.validate()).toBe(true)
            expect(vm.errors.hasError).toBe(false)
            expect(vm.errors.errorMessage).toBeUndefined()
        })

        it('вызывает правило с текущим modelValue', () => {
            const rule = createRule(true)

            const wrapper = mountUseValidate({
                modelValue: 'hello',
                rules: [rule],
            })
            const vm = wrapper.vm as unknown as TestComponentVm

            vm.validate()

            expect(rule).toHaveBeenCalledTimes(1)
            expect(rule).toHaveBeenCalledWith('hello')
        })

        it('возвращает true и не устанавливает ошибку, если все правила валидны', () => {
            const firstRule = createRule(true)
            const secondRule = createRule(true)

            const wrapper = mountUseValidate({
                modelValue: 'hello',
                rules: [firstRule, secondRule],
            })
            const vm = wrapper.vm as unknown as TestComponentVm

            expect(vm.validate()).toBe(true)

            expect(firstRule).toHaveBeenCalledTimes(1)
            expect(secondRule).toHaveBeenCalledTimes(1)

            expect(vm.errors.hasError).toBe(false)
            expect(vm.errors.errorMessage).toBeUndefined()
        })

        it('возвращает false и устанавливает ошибку, если правило невалидно', () => {
            const rule = createRule(false, 'Обязательное поле')

            const wrapper = mountUseValidate({
                modelValue: '',
                rules: [rule],
            })
            const vm = wrapper.vm as unknown as TestComponentVm

            expect(vm.validate()).toBe(false)

            expect(vm.errors.hasError).toBe(true)
            expect(vm.errors.errorMessage).toBe('Обязательное поле')
        })

        it('останавливает проверку на первом невалидном правиле', () => {
            const firstRule = createRule(true)
            const secondRule = createRule(false, 'Минимум 3 символа')
            const thirdRule = createRule(false, 'Это правило не должно вызваться')

            const wrapper = mountUseValidate({
                modelValue: 'ab',
                rules: [firstRule, secondRule, thirdRule],
            })
            const vm = wrapper.vm as unknown as TestComponentVm

            expect(vm.validate()).toBe(false)

            expect(firstRule).toHaveBeenCalledTimes(1)
            expect(secondRule).toHaveBeenCalledTimes(1)
            expect(thirdRule).not.toHaveBeenCalled()

            expect(vm.errors.hasError).toBe(true)
            expect(vm.errors.errorMessage).toBe('Минимум 3 символа')
        })

        it('очищает предыдущую ошибку после успешной повторной валидации', async () => {
            const rule = vi.fn((value: string) => ({
                valid: value.length >= 3,
                message: 'Минимум 3 символа',
            }))

            const wrapper = mountUseValidate({
                modelValue: 'ab',
                rules: [rule],
            })
            const vm = wrapper.vm as unknown as TestComponentVm

            expect(vm.validate()).toBe(false)
            expect(vm.errors.hasError).toBe(true)
            expect(vm.errors.errorMessage).toBe('Минимум 3 символа')

            await wrapper.setProps({
                modelValue: 'abcd',
            })

            expect(vm.validate()).toBe(true)
            expect(vm.errors.hasError).toBe(false)
            expect(vm.errors.errorMessage).toBeUndefined()
        })

        it('использует актуальный modelValue при повторной ручной валидации', async () => {
            const rule = createRule(true)

            const wrapper = mountUseValidate({
                modelValue: 'initial',
                rules: [rule],
            })
            const vm = wrapper.vm as unknown as TestComponentVm

            vm.validate()

            await wrapper.setProps({
                modelValue: 'updated',
            })

            vm.validate()

            expect(rule).toHaveBeenNthCalledWith(1, 'initial')
            expect(rule).toHaveBeenNthCalledWith(2, 'updated')
        })
    })

    describe('автовалидация при validateOn="input"', () => {
        it('валидирует при изменении modelValue, если validateOn не передан', async () => {
            const rule = createRule(true)

            const wrapper = mountUseValidate({
                modelValue: '',
                rules: [rule],
            })

            await wrapper.setProps({
                modelValue: 'hello',
            })

            await nextTick()

            expect(rule).toHaveBeenCalledTimes(1)
            expect(rule).toHaveBeenCalledWith('hello')
        })

        it('валидирует при изменении modelValue, если validateOn="input"', async () => {
            const rule = createRule(false, 'Ошибка')

            const wrapper = mountUseValidate({
                modelValue: '',
                rules: [rule],
                validateOn: InputEvents.INPUT,
            })
            const vm = wrapper.vm as unknown as TestComponentVm

            await wrapper.setProps({
                modelValue: 'new value',
            })

            await nextTick()

            expect(rule).toHaveBeenCalledTimes(1)
            expect(rule).toHaveBeenCalledWith('new value')

            expect(vm.errors.hasError).toBe(true)
            expect(vm.errors.errorMessage).toBe('Ошибка')
        })

        it('не валидирует при изменении modelValue на undefined', async () => {
            const rule = createRule(true)

            const wrapper = mountUseValidate({
                modelValue: 'initial',
                rules: [rule],
                validateOn: InputEvents.INPUT,
            })

            await wrapper.setProps({
                modelValue: undefined,
            })

            await nextTick()

            expect(rule).not.toHaveBeenCalled()
        })

        it('не валидирует при изменении modelValue на null', async () => {
            const rule = createRule(true)

            const wrapper = mountUseValidate({
                modelValue: 'initial',
                rules: [rule],
                validateOn: InputEvents.INPUT,
            })

            await wrapper.setProps({
                modelValue: null,
            })

            await nextTick()

            expect(rule).not.toHaveBeenCalled()
        })

        it('валидирует при изменении modelValue на пустую строку, потому что пустая строка определена', async () => {
            const rule = createRule(false, 'Пустое значение')

            const wrapper = mountUseValidate({
                modelValue: 'initial',
                rules: [rule],
                validateOn: InputEvents.INPUT,
            })
            const vm = wrapper.vm as unknown as TestComponentVm

            await wrapper.setProps({
                modelValue: '',
            })

            await nextTick()

            expect(rule).toHaveBeenCalledTimes(1)
            expect(rule).toHaveBeenCalledWith('')

            expect(vm.errors.hasError).toBe(true)
            expect(vm.errors.errorMessage).toBe('Пустое значение')
        })

        it('валидирует при каждом изменении modelValue', async () => {
            const rule = createRule(true)

            const wrapper = mountUseValidate({
                modelValue: '',
                rules: [rule],
                validateOn: InputEvents.INPUT,
            })

            await wrapper.setProps({
                modelValue: 'a',
            })

            await nextTick()

            await wrapper.setProps({
                modelValue: 'ab',
            })

            await nextTick()

            await wrapper.setProps({
                modelValue: 'abc',
            })

            await nextTick()

            expect(rule).toHaveBeenCalledTimes(3)
            expect(rule).toHaveBeenNthCalledWith(1, 'a')
            expect(rule).toHaveBeenNthCalledWith(2, 'ab')
            expect(rule).toHaveBeenNthCalledWith(3, 'abc')
        })
    })

    describe('автовалидация при validateOn="blur"', () => {
        it('не валидирует при изменении modelValue, если validateOn="blur"', async () => {
            const rule = createRule(false, 'Ошибка')

            const wrapper = mountUseValidate({
                modelValue: '',
                rules: [rule],
                validateOn: InputEvents.BLUR,
            })
            const vm = wrapper.vm as unknown as TestComponentVm

            await wrapper.setProps({
                modelValue: 'new value',
            })

            await nextTick()

            expect(rule).not.toHaveBeenCalled()

            expect(vm.errors.hasError).toBe(false)
            expect(vm.errors.errorMessage).toBeUndefined()
        })

        it('валидирует при потере фокуса', async () => {
            const rule = createRule(false, 'Поле заполнено неверно')

            const wrapper = mountUseValidate({
                modelValue: 'invalid',
                rules: [rule],
                validateOn: InputEvents.BLUR,
                state: {
                    focused: true,
                },
            })
            const vm = wrapper.vm as unknown as TestComponentVm

            vm.state.focused = false

            await nextTick()

            expect(rule).toHaveBeenCalledTimes(1)
            expect(rule).toHaveBeenCalledWith('invalid')

            expect(vm.errors.hasError).toBe(true)
            expect(vm.errors.errorMessage).toBe('Поле заполнено неверно')
        })

        it('не валидирует при получении фокуса', async () => {
            const rule = createRule(false, 'Ошибка')

            const wrapper = mountUseValidate({
                modelValue: 'invalid',
                rules: [rule],
                validateOn: InputEvents.BLUR,
                state: {
                    focused: false,
                },
            })
            const vm = wrapper.vm as unknown as TestComponentVm

            vm.state.focused = true

            await nextTick()

            expect(rule).not.toHaveBeenCalled()
        })

        it('валидирует актуальное значение modelValue на blur', async () => {
            const rule = createRule(false, 'Ошибка')

            const wrapper = mountUseValidate({
                modelValue: 'initial',
                rules: [rule],
                validateOn: InputEvents.BLUR,
                state: {
                    focused: true,
                },
            })
            const vm = wrapper.vm as unknown as TestComponentVm

            await wrapper.setProps({
                modelValue: 'latest value',
            })

            vm.state.focused = false

            await nextTick()

            expect(rule).toHaveBeenCalledTimes(1)
            expect(rule).toHaveBeenCalledWith('latest value')
        })
    })

    describe('поведение focused watcher', () => {
        it('по текущей реализации валидирует на blur даже при validateOn="input"', async () => {
            const rule = createRule(false, 'Ошибка на blur')

            const wrapper = mountUseValidate({
                modelValue: 'invalid',
                rules: [rule],
                validateOn: InputEvents.INPUT,
                state: {
                    focused: true,
                },
            })
            const vm = wrapper.vm as unknown as TestComponentVm

            vm.state.focused = false

            await nextTick()

            expect(rule).toHaveBeenCalledTimes(1)
            expect(rule).toHaveBeenCalledWith('invalid')

            expect(vm.errors.hasError).toBe(true)
            expect(vm.errors.errorMessage).toBe('Ошибка на blur')
        })

        it('валидирует каждый раз при переходе focused из true в false', async () => {
            const rule = createRule(true)

            const wrapper = mountUseValidate({
                modelValue: 'value',
                rules: [rule],
                validateOn: InputEvents.BLUR,
                state: {
                    focused: true,
                },
            })
            const vm = wrapper.vm as unknown as TestComponentVm

            vm.state.focused = false
            await nextTick()

            vm.state.focused = true
            await nextTick()

            vm.state.focused = false
            await nextTick()

            expect(rule).toHaveBeenCalledTimes(2)
        })
    })

    describe('rules', () => {
        it('использует актуальный список rules после изменения props.rules', async () => {
            const firstRule = createRule(true)
            const secondRule = createRule(false, 'Новая ошибка')

            const wrapper = mountUseValidate({
                modelValue: 'value',
                rules: [firstRule],
            })
            const vm = wrapper.vm as unknown as TestComponentVm

            expect(vm.validate()).toBe(true)
            expect(firstRule).toHaveBeenCalledTimes(1)

            await wrapper.setProps({
                rules: [secondRule],
            })

            expect(vm.validate()).toBe(false)

            expect(firstRule).toHaveBeenCalledTimes(1)
            expect(secondRule).toHaveBeenCalledTimes(1)

            expect(vm.errors.hasError).toBe(true)
            expect(vm.errors.errorMessage).toBe('Новая ошибка')
        })

        it('не запускает автовалидацию, если на момент mounted правил не было', async () => {
            const rule = createRule(false, 'Ошибка')

            const wrapper = mountUseValidate({
                modelValue: '',
                rules: [],
                validateOn: InputEvents.INPUT,
            })

            await wrapper.setProps({
                rules: [rule],
            })

            await wrapper.setProps({
                modelValue: 'new value',
            })

            await nextTick()

            expect(rule).not.toHaveBeenCalled()
        })

        it('после добавления rules ручной validate работает', async () => {
            const rule = createRule(false, 'Ошибка')

            const wrapper = mountUseValidate({
                modelValue: 'value',
                rules: [],
            })
            const vm = wrapper.vm as unknown as TestComponentVm

            expect(vm.validate()).toBe(true)

            await wrapper.setProps({
                rules: [rule],
            })

            expect(vm.validate()).toBe(false)
            expect(rule).toHaveBeenCalledTimes(1)

            expect(vm.errors.hasError).toBe(true)
            expect(vm.errors.errorMessage).toBe('Ошибка')
        })
    })
})

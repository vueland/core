import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, reactive, type Reactive } from 'vue'

import { $VUELAND_UI_KEY } from '../../constants'
import type { CInputProps } from '../../components'
import type { InputState } from '../../components'
import type { ValidateState } from '../use-validate'
import { useInputPresets } from '../use-input-presets'

type TestInputProps = CInputProps & {
    modelValue?: any
}

function mountUseInputPresets({
    props: initialProps,
    state: initialState,
    errors: initialErrors,
    presets = {},
}: {
    props?: Partial<TestInputProps>
    state?: Partial<InputState>
    errors?: Partial<ValidateState>
    presets?: Record<string, any>
} = {}) {
    let result!: ReturnType<typeof useInputPresets>

    const props = reactive({
        modelValue: '',
        ...initialProps,
    }) as Reactive<TestInputProps>

    const state = reactive({
        focused: false,
        isDirty: false,
        ...initialState,
    }) as Reactive<InputState>

    const errors = reactive({
        hasError: false,
        errorMessage: undefined,
        ...initialErrors,
    }) as Reactive<ValidateState>

    const wrapper = mount(defineComponent({
        setup() {
            result = useInputPresets({
                props,
                state,
                errors,
                slots: {},
            })

            return () => h('div')
        },
    }), {
        global: {
            provide: {
                [$VUELAND_UI_KEY as symbol]: {
                    presets,
                },
            },
        },
    })

    return {
        wrapper,
        props,
        state,
        errors,
        result,
    }
}

describe('useInputPresets', () => {
    it('возвращает пустые значения, если preset не передан', () => {
        const { result } = mountUseInputPresets({
            presets: {
                input: {
                    root: ['root'],
                    field: 'field',
                    details: ['details'],
                },
            },
        })

        expect(result.value).toEqual({
            root: [],
            field: undefined,
            details: [],
        })
    })

    it('возвращает базовые preset-значения для root, field и details', () => {
        const { result } = mountUseInputPresets({
            props: {
                preset: 'input',
            },
            presets: {
                input: {
                    root: ['root'],
                    field: 'field',
                    details: ['details'],
                },
            },
        })

        expect(result.value).toEqual({
            root: ['root'],
            field: 'field',
            details: ['details'],
        })
    })

    it('поддерживает вложенный путь preset через точку', () => {
        const { result } = mountUseInputPresets({
            props: {
                preset: 'fields.text',
            },
            presets: {
                fields: {
                    text: {
                        root: ['text-root'],
                        field: 'text-field',
                        details: ['text-details'],
                    },
                },
            },
        })

        expect(result.value).toEqual({
            root: ['text-root'],
            field: 'text-field',
            details: ['text-details'],
        })
    })

    it('возвращает focused preset, когда поле сфокусировано и активно', () => {
        const { result } = mountUseInputPresets({
            props: {
                preset: 'input',
            },
            state: {
                focused: true,
            },
            presets: {
                input: {
                    root: ['root'],
                    field: 'field',
                    details: ['details'],
                    focused: {
                        root: ['focused-root'],
                        field: 'focused-field',
                        details: ['focused-details'],
                    },
                },
            },
        })

        expect(result.value.root).toEqual(['focused-root'])
        expect(result.value.field).toBe('focused-field')
        expect(result.value.details).toEqual(['details'])
    })

    it('не применяет focused preset, если поле disabled', () => {
        const { result } = mountUseInputPresets({
            props: {
                preset: 'input',
                disabled: true,
            },
            state: {
                focused: true,
            },
            presets: {
                input: {
                    root: ['root'],
                    field: 'field',
                    disabled: {
                        root: ['disabled-root'],
                        field: 'disabled-field',
                    },
                    focused: {
                        root: ['focused-root'],
                        field: 'focused-field',
                    },
                },
            },
        })

        expect(result.value.root).toEqual(['disabled-root'])
        expect(result.value.field).toBe('disabled-field')
    })

    it('не применяет focused preset, если поле readonly', () => {
        const { result } = mountUseInputPresets({
            props: {
                preset: 'input',
                readonly: true,
            },
            state: {
                focused: true,
            },
            presets: {
                input: {
                    root: ['root'],
                    field: 'field',
                    readonly: {
                        root: ['readonly-root'],
                        field: 'readonly-field',
                    },
                    focused: {
                        root: ['focused-root'],
                        field: 'focused-field',
                    },
                },
            },
        })

        expect(result.value.root).toEqual(['readonly-root'])
        expect(result.value.field).toBe('readonly-field')
    })

    it('возвращает error preset для root и field, если есть ошибка', () => {
        const { result } = mountUseInputPresets({
            props: {
                preset: 'input',
            },
            errors: {
                hasError: true,
                errorMessage: 'Required field',
            },
            presets: {
                input: {
                    root: ['root'],
                    field: 'field',
                    details: ['details'],
                    error: {
                        root: ['error-root'],
                        field: 'error-field',
                        details: ['error-details'],
                    },
                },
            },
        })

        expect(result.value.root).toEqual(['error-root'])
        expect(result.value.field).toBe('error-field')
        expect(result.value.details).toEqual(['error-details'])
    })

    it('для details применяет error preset только если есть errorMessage', () => {
        const { result } = mountUseInputPresets({
            props: {
                preset: 'input',
            },
            errors: {
                hasError: true,
                errorMessage: undefined,
            },
            presets: {
                input: {
                    details: ['details'],
                    error: {
                        details: ['error-details'],
                    },
                },
            },
        })

        expect(result.value.details).toEqual(['details'])
    })

    it('соблюдает приоритет состояний: disabled важнее readonly, error и focused', () => {
        const { result } = mountUseInputPresets({
            props: {
                preset: 'input',
                disabled: true,
                readonly: true,
            },
            state: {
                focused: true,
            },
            errors: {
                hasError: true,
                errorMessage: 'Required field',
            },
            presets: {
                input: {
                    root: ['root'],
                    field: 'field',
                    disabled: {
                        root: ['disabled-root'],
                        field: 'disabled-field',
                    },
                    readonly: {
                        root: ['readonly-root'],
                        field: 'readonly-field',
                    },
                    error: {
                        root: ['error-root'],
                        field: 'error-field',
                    },
                    focused: {
                        root: ['focused-root'],
                        field: 'focused-field',
                    },
                },
            },
        })

        expect(result.value.root).toEqual(['disabled-root'])
        expect(result.value.field).toBe('disabled-field')
    })

    it('соблюдает приоритет состояний: readonly важнее error и focused', () => {
        const { result } = mountUseInputPresets({
            props: {
                preset: 'input',
                readonly: true,
            },
            state: {
                focused: true,
            },
            errors: {
                hasError: true,
                errorMessage: 'Required field',
            },
            presets: {
                input: {
                    readonly: {
                        root: ['readonly-root'],
                        field: 'readonly-field',
                    },
                    error: {
                        root: ['error-root'],
                        field: 'error-field',
                    },
                    focused: {
                        root: ['focused-root'],
                        field: 'focused-field',
                    },
                },
            },
        })

        expect(result.value.root).toEqual(['readonly-root'])
        expect(result.value.field).toBe('readonly-field')
    })

    it('соблюдает приоритет состояний: error важнее focused', () => {
        const { result } = mountUseInputPresets({
            props: {
                preset: 'input',
            },
            state: {
                focused: true,
            },
            errors: {
                hasError: true,
                errorMessage: 'Required field',
            },
            presets: {
                input: {
                    error: {
                        root: ['error-root'],
                        field: 'error-field',
                    },
                    focused: {
                        root: ['focused-root'],
                        field: 'focused-field',
                    },
                },
            },
        })

        expect(result.value.root).toEqual(['error-root'])
        expect(result.value.field).toBe('error-field')
    })

    it('реактивно обновляет preset при изменении состояния', () => {
        const { result, state, errors, props } = mountUseInputPresets({
            props: {
                preset: 'input',
            },
            presets: {
                input: {
                    root: ['root'],
                    field: 'field',
                    focused: {
                        root: ['focused-root'],
                        field: 'focused-field',
                    },
                    error: {
                        root: ['error-root'],
                        field: 'error-field',
                        details: ['error-details'],
                    },
                    disabled: {
                        root: ['disabled-root'],
                        field: 'disabled-field',
                    },
                },
            },
        })

        expect(result.value.root).toEqual(['root'])
        expect(result.value.field).toBe('field')

        state.focused = true

        expect(result.value.root).toEqual(['focused-root'])
        expect(result.value.field).toBe('focused-field')

        errors.hasError = true
        errors.errorMessage = 'Required field'

        expect(result.value.root).toEqual(['error-root'])
        expect(result.value.field).toBe('error-field')
        expect(result.value.details).toEqual(['error-details'])

        props.disabled = true

        expect(result.value.root).toEqual(['disabled-root'])
        expect(result.value.field).toBe('disabled-field')
        expect(result.value.details).toEqual(['error-details'])
    })

    it('возвращает root и details как массивы из preset', () => {
        const { result } = mountUseInputPresets({
            props: {
                preset: 'input',
            },
            presets: {
                input: {
                    root: ['root', 'root-2'],
                    details: ['details', 'details-2'],
                },
            },
        })

        expect(result.value.root).toEqual(['root', 'root-2'])
        expect(result.value.details).toEqual(['details', 'details-2'])
    })

    it('возвращает undefined для field, если значение field не задано', () => {
        const { result } = mountUseInputPresets({
            props: {
                preset: 'input',
            },
            presets: {
                input: {
                    root: ['root'],
                },
            },
        })

        expect(result.value.field).toBeUndefined()
    })
})

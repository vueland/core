import { beforeEach, describe, expect, it, vi } from 'vitest'
import { reactive } from 'vue'
import { useInputPresets } from '../../composables'

const coreMock = vi.hoisted(() => ({
    presets: {} as Record<string, any>,
}))

vi.mock('../../composables/use-core', () => ({
    useCore: vi.fn(() => ({
        presets: coreMock.presets,
    })),
}))

const inputPreset = {
    root: ['preset-root'],
    field: ['preset-field'],
    input: ['preset-input'],
    label: ['preset-label'],
    details: ['preset-details'],
    prepend: ['preset-prepend'],
    append: ['preset-append'],

    focused: {
        root: ['preset-focused-root'],
        field: ['preset-focused-field'],
        label: ['preset-focused-label'],
        append: ['preset-focused-append'],
    },

    error: {
        root: ['preset-error-root'],
        field: ['preset-error-field'],
        input: ['preset-error-input'],
        label: ['preset-error-label'],
        details: ['preset-error-details'],
    },

    disabled: {
        root: ['preset-disabled-root'],
        field: ['preset-disabled-field'],
        input: ['preset-disabled-input'],
        label: ['preset-disabled-label'],
    },

    readonly: {
        root: ['preset-readonly-root'],
        field: ['preset-readonly-field'],
        input: ['preset-readonly-input'],
    },

    hasValue: {
        root: ['preset-has-value-root'],
        label: ['preset-has-value-label'],
    },

    hasPrepend: {
        root: ['preset-has-prepend-root'],
        field: ['preset-has-prepend-field'],
        input: ['preset-has-prepend-input'],
        label: ['preset-has-prepend-label'],
        prepend: ['preset-has-prepend-prepend'],
    },

    hasAppend: {
        root: ['preset-has-append-root'],
        field: ['preset-has-append-field'],
        input: ['preset-has-append-input'],
        append: ['preset-has-append-append'],
    },
}

function createContext(overrides: {
    props?: Record<string, any>
    errors?: Record<string, any>
    state?: Record<string, any>
    slots?: Record<string, any>
} = {}) {
    const props = reactive({
        preset: 'input.default',
        disabled: false,
        readonly: false,
        ...overrides.props,
    })

    const errors = reactive({
        hasError: false,
        errorMessage: undefined as string | undefined,
        ...overrides.errors,
    })

    const state = reactive({
        focused: false,
        isDirty: false,
        hasValue: false,
        ...overrides.state,
    })

    const slots = {
        ...overrides.slots,
    }

    const presets = useInputPresets({
        props: props as any,
        errors: errors as any,
        state: state as any,
        slots: slots as any,
    })

    return {
        props,
        errors,
        state,
        slots,
        presets,
    }
}

describe('useInputPresets', () => {
    beforeEach(() => {
        coreMock.presets = {
            input: {
                default: inputPreset,
            },
        }
    })

    it('возвращает пустые preset-классы, если props.preset не передан', () => {
        const { presets } = createContext({
            props: {
                preset: undefined,
            },
        })

        expect(presets.value).toEqual({
            root: [],
            field: [],
            input: [],
            label: [],
            details: [],
            prepend: [],
            append: [],
        })
    })

    it('возвращает базовые preset-классы', () => {
        const { presets } = createContext()

        expect(presets.value.root).toEqual(['preset-root'])
        expect(presets.value.field).toEqual(['preset-field'])
        expect(presets.value.input).toEqual(['preset-input'])
        expect(presets.value.label).toEqual(['preset-label'])
        expect(presets.value.details).toEqual(['preset-details'])
        expect(presets.value.prepend).toEqual(['preset-prepend'])
        expect(presets.value.append).toEqual(['preset-append'])
    })

    it('добавляет focused preset-классы', () => {
        const { presets } = createContext({
            state: {
                focused: true,
            },
        })

        expect(presets.value.root).toEqual([
            'preset-root',
            'preset-focused-root',
        ])

        expect(presets.value.field).toEqual([
            'preset-field',
            'preset-focused-field',
        ])

        expect(presets.value.label).toEqual([
            'preset-label',
            'preset-focused-label',
        ])

        expect(presets.value.append).toEqual([
            'preset-append',
            'preset-focused-append',
        ])
    })

    it('реактивно добавляет focused preset-классы при изменении state.focused', () => {
        const { presets, state } = createContext()

        expect(presets.value.root).not.toContain('preset-focused-root')
        expect(presets.value.field).not.toContain('preset-focused-field')

        state.focused = true

        expect(presets.value.root).toContain('preset-focused-root')
        expect(presets.value.field).toContain('preset-focused-field')
    })

    it('добавляет error preset-классы', () => {
        const { presets } = createContext({
            errors: {
                hasError: true,
                errorMessage: 'Ошибка',
            },
        })

        expect(presets.value.root).toEqual([
            'preset-error-root',
        ])

        expect(presets.value.field).toEqual([
            'preset-field',
            'preset-error-field',
        ])

        expect(presets.value.input).toEqual([
            'preset-input',
            'preset-error-input',
        ])

        expect(presets.value.label).toEqual([
            'preset-error-label',
        ])

        expect(presets.value.details).toEqual([
            'preset-details',
            'preset-error-details',
        ])
    })

    it('не добавляет base root preset при ошибке', () => {
        const { presets } = createContext({
            errors: {
                hasError: true,
                errorMessage: 'Ошибка',
            },
        })

        expect(presets.value.root).not.toContain('preset-root')
        expect(presets.value.root).toContain('preset-error-root')
    })

    it('не добавляет error details preset, если errorMessage пустой', () => {
        const { presets } = createContext({
            errors: {
                hasError: true,
                errorMessage: '',
            },
        })

        expect(presets.value.details).toEqual([
            'preset-details',
        ])

        expect(presets.value.details).not.toContain('preset-error-details')
    })

    it('добавляет error details preset, если errorMessage есть', () => {
        const { presets } = createContext({
            errors: {
                hasError: true,
                errorMessage: 'Ошибка',
            },
        })

        expect(presets.value.details).toContain('preset-error-details')
    })

    it('добавляет disabled preset-классы', () => {
        const { presets } = createContext({
            props: {
                disabled: true,
            },
        })

        expect(presets.value.root).toEqual([
            'preset-root',
            'preset-disabled-root',
        ])

        expect(presets.value.field).toEqual([
            'preset-field',
            'preset-disabled-field',
        ])

        expect(presets.value.input).toEqual([
            'preset-input',
            'preset-disabled-input',
        ])

        expect(presets.value.label).toEqual([
            'preset-disabled-label',
        ])
    })

    it('при disabled не добавляет base label preset', () => {
        const { presets } = createContext({
            props: {
                disabled: true,
            },
        })

        expect(presets.value.label).not.toContain('preset-label')
        expect(presets.value.label).toContain('preset-disabled-label')
    })

    it('добавляет readonly preset-классы', () => {
        const { presets } = createContext({
            props: {
                readonly: true,
            },
        })

        expect(presets.value.root).toEqual([
            'preset-root',
            'preset-readonly-root',
        ])

        expect(presets.value.field).toEqual([
            'preset-field',
            'preset-readonly-field',
        ])

        expect(presets.value.input).toEqual([
            'preset-input',
            'preset-readonly-input',
        ])
    })

    it('добавляет hasValue preset-классы', () => {
        const { presets } = createContext({
            state: {
                hasValue: true,
            },
        })

        expect(presets.value.root).toEqual([
            'preset-root',
            'preset-has-value-root',
        ])

        expect(presets.value.label).toEqual([
            'preset-label',
            'preset-has-value-label',
        ])
    })

    it('реактивно добавляет hasValue preset-классы при изменении state.hasValue', () => {
        const { presets, state } = createContext()

        expect(presets.value.root).not.toContain('preset-has-value-root')
        expect(presets.value.label).not.toContain('preset-has-value-label')

        state.hasValue = true

        expect(presets.value.root).toContain('preset-has-value-root')
        expect(presets.value.label).toContain('preset-has-value-label')
    })

    it('добавляет hasPrepend preset-классы, если есть prepend slot', () => {
        const { presets } = createContext({
            slots: {
                prepend: () => 'prepend',
            },
        })

        expect(presets.value.root).toEqual([
            'preset-root',
            'preset-has-prepend-root',
        ])

        expect(presets.value.field).toEqual([
            'preset-field',
            'preset-has-prepend-field',
        ])

        expect(presets.value.input).toEqual([
            'preset-input',
            'preset-has-prepend-input',
        ])

        expect(presets.value.label).toEqual([
            'preset-label',
            'preset-has-prepend-label',
        ])

        expect(presets.value.prepend).toEqual([
            'preset-prepend',
            'preset-has-prepend-prepend',
        ])
    })

    it('добавляет hasAppend preset-классы, если есть append slot', () => {
        const { presets } = createContext({
            slots: {
                append: () => 'append',
            },
        })

        expect(presets.value.root).toEqual([
            'preset-root',
            'preset-has-append-root',
        ])

        expect(presets.value.field).toEqual([
            'preset-field',
            'preset-has-append-field',
        ])

        expect(presets.value.input).toEqual([
            'preset-input',
            'preset-has-append-input',
        ])

        expect(presets.value.append).toEqual([
            'preset-append',
            'preset-has-append-append',
        ])
    })

    it('комбинирует несколько состояний в ожидаемом порядке', () => {
        const { presets } = createContext({
            props: {
                disabled: true,
                readonly: true,
            },
            state: {
                focused: true,
                hasValue: true,
            },
            slots: {
                prepend: () => 'prepend',
                append: () => 'append',
            },
        })

        expect(presets.value.root).toEqual([
            'preset-root',
            'preset-focused-root',
            'preset-disabled-root',
            'preset-readonly-root',
            'preset-has-value-root',
            'preset-has-prepend-root',
            'preset-has-append-root',
        ])

        expect(presets.value.field).toEqual([
            'preset-field',
            'preset-focused-field',
            'preset-disabled-field',
            'preset-readonly-field',
            'preset-has-prepend-field',
            'preset-has-append-field',
        ])

        expect(presets.value.input).toEqual([
            'preset-input',
            'preset-disabled-input',
            'preset-readonly-input',
            'preset-has-prepend-input',
            'preset-has-append-input',
        ])

        expect(presets.value.label).toEqual([
            'preset-focused-label',
            'preset-disabled-label',
            'preset-has-value-label',
            'preset-has-prepend-label',
        ])

        expect(presets.value.prepend).toEqual([
            'preset-prepend',
            'preset-has-prepend-prepend',
        ])

        expect(presets.value.append).toEqual([
            'preset-append',
            'preset-focused-append',
            'preset-has-append-append',
        ])
    })

    it('при error и disabled применяет error root/field/input, но disabled label', () => {
        const { presets } = createContext({
            props: {
                disabled: true,
            },
            errors: {
                hasError: true,
                errorMessage: 'Ошибка',
            },
        })

        expect(presets.value.root).toEqual([
            'preset-error-root',
            'preset-disabled-root',
        ])

        expect(presets.value.field).toEqual([
            'preset-field',
            'preset-error-field',
            'preset-disabled-field',
        ])

        expect(presets.value.input).toEqual([
            'preset-input',
            'preset-error-input',
            'preset-disabled-input',
        ])

        expect(presets.value.label).toEqual([
            'preset-disabled-label',
        ])

        expect(presets.value.details).toEqual([
            'preset-details',
            'preset-error-details',
        ])
    })

    it('возвращает пустые массивы, если preset-ключ не найден', () => {
        const { presets } = createContext({
            props: {
                preset: 'input.unknown',
            },
        })

        expect(presets.value).toEqual({
            root: [],
            field: [],
            input: [],
            label: [],
            details: [],
            prepend: [],
            append: [],
        })
    })

    it('не падает, если preset содержит только часть зон', () => {
        coreMock.presets = {
            input: {
                partial: {
                    root: ['partial-root'],
                    error: {
                        field: ['partial-error-field'],
                    },
                },
            },
        }

        const { presets } = createContext({
            props: {
                preset: 'input.partial',
            },
            errors: {
                hasError: true,
                errorMessage: 'Ошибка',
            },
        })

        expect(presets.value.root).toEqual([])
        expect(presets.value.field).toEqual(['partial-error-field'])
        expect(presets.value.input).toEqual([])
        expect(presets.value.label).toEqual([])
        expect(presets.value.details).toEqual([])
        expect(presets.value.prepend).toEqual([])
        expect(presets.value.append).toEqual([])
    })
})

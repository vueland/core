import { reactive } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { useFieldAttrs, type ValidateState } from '../../src/composables'
import type { CInputProps } from '../../src/components'
import { unique } from '../../src/helpers'

function createProps(props: Partial<CInputProps> = {}): CInputProps {
    return {
        label: 'Email',
        ...props,
    } as CInputProps
}

function createState(state: Partial<ValidateState> = {}): ValidateState {
    return {
        hasError: false,
        errorMessage: undefined,
        ...state,
    } as ValidateState
}

describe('useFieldAttrs', () => {
    it('добавляет базовые aria-атрибуты из props и state', () => {
        const uid = unique(6)
        const fieldAttrs = useFieldAttrs({
            props: createProps({
                label: 'Email',
            }),
            attrs: {},
            state: createState({
                hasError: false,
                errorMessage: undefined,
            }),
            uid
        })

        expect(fieldAttrs.value).toEqual({
            'aria-labelledby': `${uid}-label`,
            'aria-describedby': `${uid}-details`,
        })
    })

    it('пробрасывает разрешённые html-атрибуты поля', () => {
        const fieldAttrs = useFieldAttrs({
            props: createProps(),
            attrs: {
                type: 'email',
                name: 'email',
                id: 'email-field',
                autocomplete: 'email',
                required: true,
                maxlength: 100,
            },
            state: createState(),
            uid: unique(6)
        })

        expect(fieldAttrs.value).toMatchObject({
            type: 'email',
            name: 'email',
            id: 'email-field',
            autocomplete: 'email',
            required: true,
            maxlength: 100,
        })
    })

    it('не пробрасывает html-атрибут поля из attrs, если такой prop уже задан', () => {
        const fieldAttrs = useFieldAttrs({
            props: createProps({
                type: 'text',
                name: 'userEmail',
                disabled: true,
            } as any),
            attrs: {
                type: 'email',
                name: 'email',
                disabled: false,
                placeholder: 'Введите email',
            },
            state: createState(),
            uid: unique(6)
        })

        expect(fieldAttrs.value).not.toHaveProperty('type')
        expect(fieldAttrs.value).not.toHaveProperty('name')
        expect(fieldAttrs.value).not.toHaveProperty('disabled')

        // placeholder не задан в props, поэтому он должен попасть в attrs поля
        expect(fieldAttrs.value).toHaveProperty('placeholder', 'Введите email')
    })

    it('пробрасывает aria-атрибуты независимо от FIELD_ATTRS', () => {
        const fieldAttrs = useFieldAttrs({
            props: createProps(),
            attrs: {
                'aria-controls': 'listbox-id',
                'aria-expanded': true,
                'aria-haspopup': 'listbox',
            },
            state: createState(),
            uid: unique(6)
        })

        expect(fieldAttrs.value).toMatchObject({
            'aria-controls': 'listbox-id',
            'aria-expanded': true,
            'aria-haspopup': 'listbox',
        })
    })

    it('пробрасывает data-атрибуты независимо от FIELD_ATTRS', () => {
        const fieldAttrs = useFieldAttrs({
            props: createProps(),
            attrs: {
                'data-testid': 'email-input',
                'data-size': 'lg',
            },
            state: createState(),
            uid: unique(6)
        })

        expect(fieldAttrs.value).toMatchObject({
            'data-testid': 'email-input',
            'data-size': 'lg',
        })
    })

    it('не пробрасывает посторонние attrs', () => {
        const fieldAttrs = useFieldAttrs({
            props: createProps(),
            attrs: {
                class: 'input',
                style: 'color: red',
                role: 'textbox',
                onclick: vi.fn(),
                unknown: 'value',
            },
            state: createState(),
            uid: unique(6)
        })

        expect(fieldAttrs.value).not.toHaveProperty('class')
        expect(fieldAttrs.value).not.toHaveProperty('style')
        expect(fieldAttrs.value).not.toHaveProperty('role')
        expect(fieldAttrs.value).not.toHaveProperty('onclick')
        expect(fieldAttrs.value).not.toHaveProperty('unknown')
    })

    it('добавляет aria-invalid и aria-errormessage при ошибке валидации', () => {
        const fieldAttrs = useFieldAttrs({
            props: createProps(),
            attrs: {},
            state: createState({
                hasError: true,
                errorMessage: 'Поле обязательно для заполнения',
            }),
            uid: unique(6)
        })

        expect(fieldAttrs.value).toMatchObject({
            'aria-invalid': true,
            'aria-errormessage': 'Поле обязательно для заполнения',
        })
    })

    it('позволяет aria-атрибутам из attrs переопределить вычисленные aria-атрибуты', () => {
        const fieldAttrs = useFieldAttrs({
            props: createProps({
                label: 'Email',
            }),
            attrs: {
                'aria-label': 'Пользовательский email',
                'aria-describedby': 'custom-description-id',
                'aria-invalid': 'true',
                'aria-errormessage': 'custom-error-id',
            },
            state: createState({
                hasError: false,
                errorMessage: undefined,
            }),
            uid: unique(6)
        })

        expect(fieldAttrs.value).toMatchObject({
            'aria-label': 'Пользовательский email',
            'aria-describedby': 'custom-description-id',
            'aria-invalid': 'true',
            'aria-errormessage': 'custom-error-id',
        })
    })

    it('реактивно обновляет attrs при изменении props, attrs и state', () => {
        const props = reactive(createProps({
            label: 'Email',
        }))

        const attrs = reactive<Record<string, any>>({
            placeholder: 'Введите email',
            required: true,
        })

        const state = reactive(createState({
            hasError: false,
            errorMessage: undefined,
        }))

        const uid = unique(6)

        const fieldAttrs = useFieldAttrs({
            props,
            attrs,
            state,
            uid
        })

        expect(fieldAttrs.value).toMatchObject({
            'aria-describedby': `${uid}-details`,
            'aria-labelledby': `${uid}-label`,
            required: true,
            placeholder: 'Введите email',
        })

        props.label = 'Новый email'
        attrs.placeholder = 'Введите новый email'
        state.hasError = true
        state.errorMessage = 'Некорректный email'

        console.log(fieldAttrs.value)

        expect(fieldAttrs.value).toMatchObject({
            'aria-labelledby': `${uid}-label`,
            'aria-describedby': `${uid}-details`,
            'aria-invalid': true,
            'aria-errormessage': 'Некорректный email',
            placeholder: 'Введите новый email',
            required: true,
        })
    })
})

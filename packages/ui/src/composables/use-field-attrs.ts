import { computed, type ComputedRef } from 'vue'
import type { CInputProps } from '../components'
import type { ValidateState } from './use-validate'
import { unique } from '../helpers'

const FIELD_ATTRS = new Set([
    'type',
    'name',
    'id',
    'placeholder',
    'autocomplete',
    'autofocus',
    'inputmode',
    'pattern',
    'min',
    'max',
    'step',
    'minlength',
    'maxlength',
    'readonly',
    'disabled',
    'required',
    'tabindex',
    'enterkeyhint',
])

export function useFieldAttrs({ props, attrs, state }: {
    props: CInputProps
    attrs: Record<string, any>
    state: ValidateState
}): ComputedRef<Record<string, any>> {
    console.log(props)
    return computed(() => {
        const map = Object.entries(attrs).reduce((acc, [k, v]) => {
            if (
                !props[k] && FIELD_ATTRS.has(k)
                || k.startsWith('aria-')
                || k.startsWith('data-')
            ) {
                acc[k] = v
            }

            return acc
        }, {})

        return {
            'aria-labelledby': `input-${unique(props.label ?? '')}-label`,
            'aria-describedby': `input-${unique(props.label ?? '')}-details`,
            'aria-invalid': state.hasError,
            'aria-errormessage': state.errorMessage,
            'aria-readonly': props.readonly,
            'aria-disabled': props.disabled,
            'aria-expanded': false,
            ...map
        }
    })
}

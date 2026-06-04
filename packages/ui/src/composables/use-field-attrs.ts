import { computed, type ComputedRef } from 'vue'
import type { CInputProps } from '../components'
import type { ValidateState } from './use-validate'

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

export function useFieldAttrs({ props, attrs, errors, uid }: {
    props: CInputProps
    attrs: Record<string, any>
    errors: ValidateState
    uid: string
}): ComputedRef<Record<string, any>> {

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
            'aria-labelledby': `${uid}-label`,
            ...(!props.noDetails ? { 'aria-describedby': `${uid}-details` } : {}),
            ...(errors.hasError ? { 'aria-invalid': errors.hasError } : {}),
            ...(errors.errorMessage ? { 'aria-errormessage': errors.errorMessage } : {}),
            ...(props.readonly ? { 'aria-readonly': props.readonly } : {}),
            ...(props.disabled ? { 'aria-disabled': props.disabled } : {}),
            ...map
        }
    })
}

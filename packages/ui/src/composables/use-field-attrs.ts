import { computed, type ComputedRef, unref, type Ref } from 'vue'
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

export function useFieldAttrs({ props, attrs, state, uid }: {
    props: CInputProps
    attrs: Record<string, any>
    state: ValidateState
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
            ...(state.hasError ? { 'aria-invalid': state.hasError } : {}),
            ...(state.errorMessage ? { 'aria-errormessage': state.errorMessage } : {}),
            ...(props.readonly ? { 'aria-readonly': props.readonly } : {}),
            ...(props.disabled ? { 'aria-disabled': props.disabled } : {}),
            ...map
        }
    })
}

import { computed, useAttrs } from 'vue'

const FIELD_ATTRS = new Set([
    'type',
    'name',
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

export function useFieldAttrs() {
    return computed(() => Object.entries(useAttrs()).reduce((acc, [k, v]) => {
        if (FIELD_ATTRS.has(k) || k.startsWith('aria-')) {
            acc[k] = v
        }

        return acc
    }, {}))
}

import type { InputPreset } from '@vueland/ui/types'

export const A: InputPreset = {
    root: ['text-green-darken-2'],
    focused: {
        root: ['text-cyan-darken-2'],
        field: 'field.base'
    },
    field: 'field.base',
    error: {
        root: ['text-pink'],
        field: 'field.error',
    },
    disabled: {},
    details: ['text-grey', 'fs-xs'],
}

export const B: InputPreset = {
    root: ['text-cyan'],
    field: 'field.base',
    error: {
        root: ['text-pink'],
        field: 'field.error',
    }
}

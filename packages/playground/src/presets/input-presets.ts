import type { InputPreset } from '@vueland/ui/types'

export const A: InputPreset = {
    root: ['text-green-darken-2'],
    focused: {
        root: ['text-cyan-darken-2'],
        label: ['text-amber-darken-2'],
    },
    label: ['text-uppercase'],
    error: {
        label: ['text-amber', ''],
        // root: ['text-red', ''],
    },
    disabled: {
        label: ['text-grey-lighten-1'],
    },
    details: ['text-grey', 'fs-xs'],
}

export const B: InputPreset = {
    root: ['text-cyan'],
    label: ['text-cyan'],
    error: {
        root: ['text-pink'],
        label: ['text-pink'],
    }
}

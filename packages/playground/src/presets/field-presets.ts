import type { FieldPreset } from '@vueland/ui/types'

export const base: FieldPreset = {
    root: [''],
    label: ['text-uppercase'],
    focused: {
        label: ['text-amber']
    },
    filled: {
        label: ['text-green', 'text-uppercase'],
    }
}

export const error: FieldPreset = {
    root: [''],
    filled: {
        label: ['text-red-darken-2', 'text-uppercase'],
    }
}

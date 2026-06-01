import type { VNode } from 'vue'
import type {
    ActivatorListeners,
    ActivatorProps,
    AutoPositionProps,
    CoordsProps,
    DelayProps,
    PositionProps,
    PresetProps
} from '../../composables'
import type { DimensionsProps } from '../../types'
import type { COverlayProps } from '../COverlay'

export type CMenuProps =
    ActivatorProps &
    CoordsProps &
    DimensionsProps &
    PositionProps &
    AutoPositionProps &
    DelayProps &
    PresetProps &
    Partial<COverlayProps> & {
    closeOnClickOutside?: boolean
    closeOnContentClick?: boolean
    ssr?: boolean
}

export type CMenuSlots = {
    activator?(props: { on: ActivatorListeners, activator: Record<string, any> }): VNode
    default(): VNode
}

export type CMenuEvents = {
    (e: 'outside-click'): void
    (e: 'click'): void
    (e: 'open'): void
    (e: 'close'): void
    (e: 'update:modelValue', val: boolean): void
}

import { computed } from 'vue'

type Classes = 'to--left' | 'to--right' | 'to--top' | 'to--bottom'

export interface PositionProps {
    left?: boolean
    right?: boolean
    top?: boolean
    bottom?: boolean
}

export function usePositionClasses(props: PositionProps) {
    return computed<Record<Classes, boolean>>(() => ({
        'to--left': !!props.left,
        'to--right': !!props.right,
        'to--top': !!props.top,
        'to--bottom': !!props.bottom,
    }))
}

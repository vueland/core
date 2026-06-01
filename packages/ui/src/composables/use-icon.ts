import { type Component, computed, type ComputedRef } from 'vue'
import { useCore } from './use-core'

type IconMode = 'lib' | 'sprite' | 'component' | 'raw'

export interface UseIconOptions {
    name?: string | number
    source?: IconMode
    component?: Component | null
    body?: string
    viewBox?: string
    spritePrefix?: string
    spritePath?: string
}

interface ResolvedIcon {
    component: Component | null
    body: string
    viewBox: string
    href: string
    found: boolean
    kind: 'svg' | 'component'
}

const DEFAULT_VIEW_BOX = '0 0 16 16'

export function useIcon(props: UseIconOptions): ComputedRef<ResolvedIcon> {
    const { icons } = useCore() ?? {}

    return computed(() => {
        if (props.component) {
            return {
                kind: 'component',
                component: props.component,
                body: '',
                viewBox: props.viewBox || DEFAULT_VIEW_BOX,
                href: '',
                found: true,
            }
        }

        if (props.body) {
            return {
                kind: 'svg',
                component: null,
                body: props.body,
                viewBox: props.viewBox || DEFAULT_VIEW_BOX,
                href: '',
                found: true,
            }
        }

        if (props.source === 'sprite') {
            const symbolId = `${props.spritePrefix ?? ''}${props.name ?? ''}`

            const href = props.spritePath
                ? `${props.spritePath}#${symbolId}`
                : `#${symbolId}`

            return {
                kind: 'svg',
                component: null,
                body: '',
                viewBox: props.viewBox || DEFAULT_VIEW_BOX,
                href,
                found: !!props.name,
            }
        }

        const icon = icons?.aliases?.[props.name!]

        return {
            kind: 'svg',
            component: null,
            body: icon?.body || '',
            viewBox: icon?.viewBox || props.viewBox || DEFAULT_VIEW_BOX,
            href: '',
            found: !!icon,
        }
    })
}

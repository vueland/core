import type { Component } from 'vue'

type IconMode = 'lib' | 'sprite' | 'component' | 'raw'

export type CIconProps = {
    name?: string | number
    source?: IconMode
    component?: Component | null
    body?: string
    viewBox?: string
    size?: string | number
    width?: string | number
    height?: string | number
    tag?: string
    spritePrefix?: string
    spritePath?: string
}

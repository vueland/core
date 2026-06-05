import { defineRule } from './core'

import {
    isMarginValue,
    isPaddingValue,
    isPositionValue,
    isRadiusValue,
    isSizeValue,
    isZIndexValue
} from './validators'

export const width = defineRule({
    name: 'width',
    matcher: /^w-\[(.+)\]$/,
    validate: (v: string) => isSizeValue(v),
    declaration: (value: string) => ({
        width: `${value} !important`,
    })
})

export const height = defineRule({
    name: 'height',
    matcher: /^h-\[(.+)\]$/,
    validate: (v: string) => isSizeValue(v),
    declaration: (value: string) => ({
        height: `${value} !important`,
    })
})

export const minWidth = defineRule({
    name: 'min-width',
    matcher: /^min-w-\[(.+)\]$/,
    validate: (v: string) => isSizeValue(v),
    declaration: (value: string) => ({
        minWidth: `${value} !important`,
    })
})

export const maxWidth = defineRule({
    name: 'max-width',
    matcher: /^max-w-\[(.+)\]$/,
    validate: (v: string) => isSizeValue(v),
    declaration: (value: string) => ({
        maxWidth: `${value} !important`,
    })
})

export const minHeight = defineRule({
    name: 'min-height',
    matcher: /^min-h-\[(.+)\]$/,
    validate: (v: string) => isSizeValue(v),
    declaration: (value: string) => ({
        minHeight: `${value} !important`,
    })
})

export const maxHeight = defineRule({
    name: 'max-height',
    matcher: /^max-h-\[(.+)\]$/,
    validate: (v: string) => isSizeValue(v),
    declaration: (value: string) => ({
        maxHeight: `${value} !important`,
    })
})

export const zIndex = defineRule({
    name: 'z-index',
    matcher: /^z-\[(.+)\]$/,
    validate: (v: string) => isZIndexValue(v),
    declaration: (value: string) => ({
        zIndex: `${value} !important`,
    })
})

export const margin = defineRule({
    name: 'margin',
    matcher: /^ma-\[(.+)\]$/,
    validate: (v: string) => isMarginValue(v),
    declaration: (value: string) => ({
        margin: `${value} !important`,
    })
})

export const marginX = defineRule({
    name: 'margin-x',
    matcher: /^mx-\[(.+)\]$/,
    validate: (v) => isMarginValue(v),
    declaration: (value) => ({
        marginLeft: `${value} !important`,
        marginRight: `${value} !important`,
    })
})

export const marginY = defineRule({
    name: 'margin-y',
    matcher: /^my-\[(.+)\]$/,
    validate: (v: string) => isMarginValue(v),
    declaration: (value: string) => ({
        marginTop: `${value} !important`,
        marginBottom: `${value} !important`,
    })
})

export const marginBottom = defineRule({
    name: 'margin-bottom',
    matcher: /^mb-\[(.+)\]$/,
    validate: (v: string) => isMarginValue(v),
    declaration: (value: string) => ({
        marginBottom: `${value} !important`,
    })
})

export const marginTop = defineRule({
    name: 'margin-top',
    matcher: /^mt-\[(.+)\]$/,
    validate: (v: string) => isMarginValue(v),
    declaration: (value: string) => ({
        marginTop: `${value} !important`,
    })
})

export const marginLeft = defineRule({
    name: 'margin-left',
    matcher: /^ml-\[(.+)\]$/,
    validate: (v: string) => isMarginValue(v),
    declaration: (value: string) => ({
        marginLeft: `${value} !important`,
    })
})

export const marginRight = defineRule({
    name: 'margin-right',
    matcher: /^mr-\[(.+)\]$/,
    validate: (v: string) => isMarginValue(v),
    declaration: (value: string) => ({
        marginRight: `${value} !important`,
    })
})

export const padding = defineRule({
    name: 'padding',
    matcher: /^pa-\[(.+)\]$/,
    validate: (v: string) => isPaddingValue(v),
    declaration: (value: string) => ({
        padding: `${value} !important`,
    })
})

export const paddingX = defineRule({
    name: 'padding-x',
    matcher: /^px-\[(.+)\]$/,
    validate: (v: string) => isPaddingValue(v),
    declaration: (value: string) => ({
        paddingLeft: `${value} !important`,
        paddingRight: `${value} !important`,
    })
})

export const paddingY  = defineRule({
    name: 'padding-y',
    matcher: /^py-\[(.+)\]$/,
    validate: (v: string) => isPaddingValue(v),
    declaration: (value: string) => ({
        paddingTop: `${value} !important`,
        paddingBottom: `${value} !important`,
    })
})

export const paddingBottom = defineRule({
    name: 'padding-bottom',
    matcher: /^pb-\[(.+)\]$/,
    validate: (v: string) => isPaddingValue(v),
    declaration: (value: string) => ({
        paddingBottom: `${value} !important`,
    })
})

export const paddingTop = defineRule({
    name: 'padding-top',
    matcher: /^pt-\[(.+)\]$/,
    validate: (v: string) => isPaddingValue(v),
    declaration: (value: string) => ({
        paddingTop: `${value} !important`,
    })
})

export const paddingLeft = defineRule({
    name: 'padding-left',
    matcher: /^pl-\[(.+)\]$/,
    validate: (v: string) => isPaddingValue(v),
    declaration: (value: string) => ({
        paddingLeft: `${value} !important`,
    })
})

export const paddingRight = defineRule({
    name: 'padding-right',
    matcher: /^pr-\[(.+)\]$/,
    validate: (v: string) => isPaddingValue(v),
    declaration: (value: string) => ({
        paddingRight: `${value} !important`,
    })
})

export const left = defineRule({
    name: 'left',
    matcher: /^left-\[(.+)\]$/,
    validate: (v: string) => isPositionValue(v),
    declaration: (value: string) => ({
        left: `${value} !important`,
    })
})

export const right = defineRule({
    name: 'right',
    matcher: /^right-\[(.+)\]$/,
    validate: (v: string) => isPositionValue(v),
    declaration: (value: string) => ({
        right: `${value} !important`,
    })
})

export const top = defineRule({
    name: 'top',
    matcher: /^top-\[(.+)\]$/,
    validate: (v: string) => isPositionValue(v),
    declaration: (value: string) => ({
        top: `${value} !important`,
    })
})

export const bottom = defineRule({
    name: 'bottom',
    matcher: /^bottom-\[(.+)\]$/,
    validate: (v: string) => isPositionValue(v),
    declaration: (value: string) => ({
        bottom: `${value} !important`,
    })
})

export const inset = defineRule({
    name: 'inset',
    matcher: /^inset-\[(.+)\]$/,
    validate: (v: string) => isPositionValue(v),
    declaration: (value: string) => ({
        inset: `${value} !important`,
    })
})

export const radius = defineRule({
    name: 'radius',
    matcher: /^radius-\[(.+)\]$/,
    validate: (v: string) => isRadiusValue(v),
    declaration: (value: string) => ({
        borderRadius: `${value} !important`,
    })
})

export const radiusTopLeft = defineRule({
    name: 'radius-tl',
    matcher: /^radius-tl-\[(.+)\]$/,
    validate: (v: string) => isRadiusValue(v),
    declaration: (value: string) => ({
        borderTopLeftRadius: `${value} !important`,
    })
})

export const radiusTopRight = defineRule({
    name: 'radius-tr',
    matcher: /^radius-tr-\[(.+)\]$/,
    validate: (v: string) => isRadiusValue(v),
    declaration: (value: string) => ({
        borderTopRightRadius: `${value} !important`,
    })
})

export const radiusBottomLeft = defineRule({
    name: 'radius-bl',
    matcher: /^radius-bl-\[(.+)\]$/,
    validate: (v: string) => isRadiusValue(v),
    declaration: (value: string) => ({
        borderBottomLeftRadius: `${value} !important`,
    })
})

export const radiusBottomRight = defineRule({
    name: 'radius-br',
    matcher: /^radius-br-\[(.+)\]$/,
    validate: (v: string) => isRadiusValue(v),
    declaration: (value: string) => ({
        borderBottomRightRadius: `${value} !important`,
    })
})

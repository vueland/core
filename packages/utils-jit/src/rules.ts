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
    validate: (v) => isSizeValue(v),
    declaration: (value) => ({
        width: `${value} !important`,
    })
})

export const height = defineRule({
    name: 'height',
    matcher: /^h-\[(.+)\]$/,
    validate: (v) => isSizeValue(v),
    declaration: (value) => ({
        height: `${value} !important`,
    })
})

export const minWidth = defineRule({
    name: 'min-width',
    matcher: /^min-w-\[(.+)\]$/,
    validate: (v) => isSizeValue(v),
    declaration: (value) => ({
        minWidth: `${value} !important`,
    })
})

export const maxWidth = defineRule({
    name: 'max-width',
    matcher: /^max-w-\[(.+)\]$/,
    validate: (v) => isSizeValue(v),
    declaration: (value) => ({
        maxWidth: `${value} !important`,
    })
})

export const minHeight = defineRule({
    name: 'min-height',
    matcher: /^min-h-\[(.+)\]$/,
    validate: (v) => isSizeValue(v),
    declaration: (value) => ({
        minHeight: `${value} !important`,
    })
})

export const maxHeight = defineRule({
    name: 'max-height',
    matcher: /^max-h-\[(.+)\]$/,
    validate: (v) => isSizeValue(v),
    declaration: (value) => ({
        maxHeight: `${value} !important`,
    })
})

export const zIndex = defineRule({
    name: 'z-index',
    matcher: /^z-\[(.+)\]$/,
    validate: (v) => isZIndexValue(v),
    declaration: (value) => ({
        zIndex: `${value} !important`,
    })
})

export const margin = defineRule({
    name: 'margin',
    matcher: /^ma-\[(.+)\]$/,
    validate: (v) => isMarginValue(v),
    declaration: (value) => ({
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
    validate: (v) => isMarginValue(v),
    declaration: (value) => ({
        marginTop: `${value} !important`,
        marginBottom: `${value} !important`,
    })
})

export const marginBottom = defineRule({
    name: 'margin-bottom',
    matcher: /^mb-\[(.+)\]$/,
    validate: (v) => isMarginValue(v),
    declaration: (value) => ({
        marginBottom: `${value} !important`,
    })
})

export const marginTop = defineRule({
    name: 'margin-top',
    matcher: /^mt-\[(.+)\]$/,
    validate: (v) => isMarginValue(v),
    declaration: (value) => ({
        marginTop: `${value} !important`,
    })
})

export const marginLeft = defineRule({
    name: 'margin-left',
    matcher: /^ml-\[(.+)\]$/,
    validate: (v) => isMarginValue(v),
    declaration: (value) => ({
        marginLeft: `${value} !important`,
    })
})

export const marginRight = defineRule({
    name: 'margin-right',
    matcher: /^mr-\[(.+)\]$/,
    validate: (v) => isMarginValue(v),
    declaration: (value) => ({
        marginRight: `${value} !important`,
    })
})

export const padding = defineRule({
    name: 'padding',
    matcher: /^pa-\[(.+)\]$/,
    validate: (v) => isPaddingValue(v),
    declaration: (value) => ({
        padding: `${value} !important`,
    })
})

export const paddingX = defineRule({
    name: 'padding-x',
    matcher: /^px-\[(.+)\]$/,
    validate: (v) => isPaddingValue(v),
    declaration: (value) => ({
        paddingLeft: `${value} !important`,
        paddingRight: `${value} !important`,
    })
})

export const paddingY  = defineRule({
    name: 'padding-y',
    matcher: /^py-\[(.+)\]$/,
    validate: (v) => isPaddingValue(v),
    declaration: (value) => ({
        paddingTop: `${value} !important`,
        paddingBottom: `${value} !important`,
    })
})

export const paddingBottom = defineRule({
    name: 'padding-bottom',
    matcher: /^pb-\[(.+)\]$/,
    validate: (v) => isPaddingValue(v),
    declaration: (value) => ({
        paddingBottom: `${value} !important`,
    })
})

export const paddingTop = defineRule({
    name: 'padding-top',
    matcher: /^pt-\[(.+)\]$/,
    validate: (v) => isPaddingValue(v),
    declaration: (value) => ({
        paddingTop: `${value} !important`,
    })
})

export const paddingLeft = defineRule({
    name: 'padding-left',
    matcher: /^pl-\[(.+)\]$/,
    validate: (v) => isPaddingValue(v),
    declaration: (value) => ({
        paddingLeft: `${value} !important`,
    })
})

export const paddingRight = defineRule({
    name: 'padding-right',
    matcher: /^pr-\[(.+)\]$/,
    validate: (v) => isPaddingValue(v),
    declaration: (value) => ({
        paddingRight: `${value} !important`,
    })
})

export const left = defineRule({
    name: 'left',
    matcher: /^left-\[(.+)\]$/,
    validate: (v) => isPositionValue(v),
    declaration: (value) => ({
        left: `${value} !important`,
    })
})

export const right = defineRule({
    name: 'right',
    matcher: /^right-\[(.+)\]$/,
    validate: (v) => isPositionValue(v),
    declaration: (value) => ({
        right: `${value} !important`,
    })
})

export const top = defineRule({
    name: 'top',
    matcher: /^top-\[(.+)\]$/,
    validate: (v) => isPositionValue(v),
    declaration: (value) => ({
        top: `${value} !important`,
    })
})

export const bottom = defineRule({
    name: 'bottom',
    matcher: /^bottom-\[(.+)\]$/,
    validate: (v) => isPositionValue(v),
    declaration: (value) => ({
        bottom: `${value} !important`,
    })
})

export const inset = defineRule({
    name: 'inset',
    matcher: /^inset-\[(.+)\]$/,
    validate: (v) => isPositionValue(v),
    declaration: (value) => ({
        inset: `${value} !important`,
    })
})

export const radius = defineRule({
    name: 'radius',
    matcher: /^radius-\[(.+)\]$/,
    validate: (v) => isRadiusValue(v),
    declaration: (value) => ({
        borderRadius: `${value} !important`,
    })
})

export const radiusTopLeft = defineRule({
    name: 'radius-tl',
    matcher: /^radius-tl-\[(.+)\]$/,
    validate: (v) => isRadiusValue(v),
    declaration: (value) => ({
        borderTopLeftRadius: `${value} !important`,
    })
})

export const radiusTopRight = defineRule({
    name: 'radius-tr',
    matcher: /^radius-tr-\[(.+)\]$/,
    validate: (v) => isRadiusValue(v),
    declaration: (value) => ({
        borderTopRightRadius: `${value} !important`,
    })
})

export const radiusBottomLeft = defineRule({
    name: 'radius-bl',
    matcher: /^radius-bl-\[(.+)\]$/,
    validate: (v) => isRadiusValue(v),
    declaration: (value) => ({
        borderBottomLeftRadius: `${value} !important`,
    })
})

export const radiusBottomRight = defineRule({
    name: 'radius-br',
    matcher: /^radius-br-\[(.+)\]$/,
    validate: (v) => isRadiusValue(v),
    declaration: (value) => ({
        borderBottomRightRadius: `${value} !important`,
    })
})

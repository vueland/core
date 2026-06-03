import { isMarginValue, isPaddingValue, isPositionValue, isRadiusValue, isSizeValue, isZIndexValue } from './validators'
import { createMultiDeclRule } from './core'

export const width = createMultiDeclRule('width', /^w-\[(.+)\]$/, ['width'], isSizeValue)
export const height = createMultiDeclRule('height', /^h-\[(.+)\]$/, ['height'], isSizeValue)
export const minWidth = createMultiDeclRule('min-width', /^min-w-\[(.+)\]$/, ['min-width'], isSizeValue)
export const minHeight = createMultiDeclRule('min-height', /^min-h-\[(.+)\]$/, ['min-height'], isSizeValue)
export const maxWidth = createMultiDeclRule('max-width', /^max-w-\[(.+)\]$/, ['max-width'], isSizeValue)
export const maxHeight = createMultiDeclRule('max-height', /^max-h-\[(.+)\]$/, ['max-height'], isSizeValue)

export const margin = createMultiDeclRule('margin', /^ma-\[(.+)\]$/, ['margin'], isMarginValue)
export const marginX = createMultiDeclRule('margin-x', /^mx-\[(.+)\]$/, ['margin-left', 'margin-right'], isMarginValue)
export const marginY = createMultiDeclRule('margin-y', /^my-\[(.+)\]$/, ['margin-top', 'margin-bottom'], isMarginValue)
export const marginBottom = createMultiDeclRule('margin-bottom', /^mb-\[(.+)\]$/, ['margin-bottom'], isMarginValue)
export const marginLeft = createMultiDeclRule('margin-left', /^ml-\[(.+)\]$/, ['margin-left'], isMarginValue)
export const marginRight = createMultiDeclRule('margin-right', /^mr-\[(.+)\]$/, ['margin-right'], isMarginValue)
export const marginTop = createMultiDeclRule('margin-top', /^mt-\[(.+)\]$/, ['margin-top'], isMarginValue)

export const padding = createMultiDeclRule('padding', /^pa-\[(.+)\]$/, ['padding'], isPaddingValue)
export const paddingX = createMultiDeclRule('padding-x', /^px-\[(.+)\]$/, ['padding-left', 'padding-right'], isPaddingValue)
export const paddingY = createMultiDeclRule('padding-y', /^py-\[(.+)\]$/, ['padding-top', 'padding-bottom'], isPaddingValue)
export const paddingBottom = createMultiDeclRule('padding-bottom', /^pb-\[(.+)\]$/, ['padding-bottom'], isPaddingValue)
export const paddingLeft = createMultiDeclRule('padding-left', /^pl-\[(.+)\]$/, ['padding-left'], isPaddingValue)
export const paddingRight = createMultiDeclRule('padding-right', /^pr-\[(.+)\]$/, ['padding-right'], isPaddingValue)
export const paddingTop = createMultiDeclRule('padding-top', /^pt-\[(.+)\]$/, ['padding-top'], isPaddingValue)

export const left = createMultiDeclRule('left', /^left-\[(.+)\]$/, ['left'], isPositionValue)
export const right = createMultiDeclRule('right', /^right-\[(.+)\]$/, ['right'], isPositionValue)
export const top = createMultiDeclRule('top', /^top-\[(.+)\]$/, ['top'], isPositionValue)
export const bottom = createMultiDeclRule('bottom', /^bottom-\[(.+)\]$/, ['bottom'], isPositionValue)
export const inset = createMultiDeclRule('inset', /^inset-\[(.+)\]$/, ['inset'], isPositionValue)

export const radius = createMultiDeclRule('radius', /^radius-\[(.+)\]$/, ['border-radius'], isRadiusValue)
export const radiusTopLeft = createMultiDeclRule('radius-top-left', /^radius-tl-\[(.+)\]$/, ['border-top-left-radius'], isRadiusValue)
export const radiusTopRight = createMultiDeclRule('radius-top-right', /^radius-tr-\[(.+)\]$/, ['border-top-right-radius'], isRadiusValue)
export const radiusBottomLeft = createMultiDeclRule('radius-bottom-left', /^radius-bl-\[(.+)\]$/, ['border-bottom-left-radius'], isRadiusValue)
export const radiusBottomRight = createMultiDeclRule('radius-bottom-right', /^radius-br-\[(.+)\]$/, ['border-bottom-right-radius'], isRadiusValue)

export const zIndex = createMultiDeclRule('z-index', /^z-\[(.+)\]$/, ['z-index'], isZIndexValue)

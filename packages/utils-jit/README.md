# @vueland/utils-jit

A lightweight Vite JIT utility engine for generating CSS from arbitrary utility classes.

`@vueland/utils-jit` scans your project files, detects utility tokens such as `w-[320px]`, `px-[16px]`, `hover:bg-[#fff]`, and generates only the CSS that is actually used in your source code.

It is designed for Vueland and Vue 3 projects, but can be used in any Vite-based application.

## Features

- JIT CSS generation for arbitrary utility classes
- Vite plugin integration
- Incremental updates during development
- File reference counting to remove unused generated rules
- Built-in utilities for sizing, spacing, radius, position, z-index, opacity and colors
- Built-in pseudo variants such as `hover:`, `focus:` and `active:`
- Responsive variants through configurable breakpoints
- Custom selector, attribute and media variants
- Custom rules through `defineRule`
- Safe value validation before CSS generation
- Configurable include / exclude patterns
- Configurable output file

## Installation

```bash
pnpm add -D @vueland/utils-jit
```

```bash
npm install -D @vueland/utils-jit
```

```bash
yarn add -D @vueland/utils-jit
```

## Usage

Add `utilsJIT()` to your `vite.config.ts`.

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { utilsJIT } from '@vueland/utils-jit'

export default defineConfig({
  plugins: [
    vue(),
    utilsJIT(),
  ],
})
```

By default, the plugin generates this file:

```txt
src/.generated/utils-jit.css
```

Import it in your application entry file:

```ts
import './.generated/utils-jit.css'
```

Now you can use arbitrary utility classes in your components:

```vue
<template>
  <div class="w-[320px] px-[16px] radius-[12px] hover:w-[360px] md:px-[24px]">
    Card content
  </div>
</template>
```

The generated CSS will contain only the rules used in your source files.

## Quick example

```vue
<template>
  <div class="w-[300px] h-[200px] px-[16px] radius-[12px] z-[10]">
    Hello Vueland
  </div>
</template>
```

Generated CSS example:

```css
/* @vueland/utils-jit: generated utilities */
.h-\[200px\]{height: 200px !important;}
.px-\[16px\]{padding-left: 16px !important;padding-right: 16px !important;}
.radius-\[12px\]{border-radius: 12px !important;}
.w-\[300px\]{width: 300px !important;}
.z-\[10\]{z-index: 10 !important;}
```

Generated rules are sorted by utility token for stable output.

## Built-in utilities

| Utility | CSS property | Example |
| --- | --- | --- |
| `w-[value]` | `width` | `w-[320px]` |
| `h-[value]` | `height` | `h-[200px]` |
| `min-w-[value]` | `min-width` | `min-w-[240px]` |
| `max-w-[value]` | `max-width` | `max-w-[1200px]` |
| `min-h-[value]` | `min-height` | `min-h-[100vh]` |
| `max-h-[value]` | `max-height` | `max-h-[600px]` |
| `ma-[value]` | `margin` | `ma-[16px]` |
| `mx-[value]` | `margin-left`, `margin-right` | `mx-[auto]` |
| `my-[value]` | `margin-top`, `margin-bottom` | `my-[24px]` |
| `mt-[value]` | `margin-top` | `mt-[16px]` |
| `mr-[value]` | `margin-right` | `mr-[12px]` |
| `mb-[value]` | `margin-bottom` | `mb-[24px]` |
| `ml-[value]` | `margin-left` | `ml-[12px]` |
| `pa-[value]` | `padding` | `pa-[20px]` |
| `px-[value]` | `padding-left`, `padding-right` | `px-[16px]` |
| `py-[value]` | `padding-top`, `padding-bottom` | `py-[12px]` |
| `pt-[value]` | `padding-top` | `pt-[10px]` |
| `pr-[value]` | `padding-right` | `pr-[8px]` |
| `pb-[value]` | `padding-bottom` | `pb-[20px]` |
| `pl-[value]` | `padding-left` | `pl-[16px]` |
| `left-[value]` | `left` | `left-[12px]` |
| `right-[value]` | `right` | `right-[12px]` |
| `top-[value]` | `top` | `top-[12px]` |
| `bottom-[value]` | `bottom` | `bottom-[12px]` |
| `inset-[value]` | `inset` | `inset-[0px]` |
| `radius-[value]` | `border-radius` | `radius-[12px]` |
| `radius-tl-[value]` | `border-top-left-radius` | `radius-tl-[8px]` |
| `radius-tr-[value]` | `border-top-right-radius` | `radius-tr-[8px]` |
| `radius-bl-[value]` | `border-bottom-left-radius` | `radius-bl-[8px]` |
| `radius-br-[value]` | `border-bottom-right-radius` | `radius-br-[8px]` |
| `z-[value]` | `z-index` | `z-[100]` |
| `opacity-[value]` | `opacity` | `opacity-[0.64]` |
| `color-[value]` | `color` | `color-[#111]` |
| `bg-[value]` | `background-color` | `bg-[#fff]` |

Built-in rules generate declarations with `!important`.

## Supported values

Values are validated before CSS is generated. Invalid or unsafe values are ignored.

### Size, padding, radius and position

The following utilities support length-like values:

- `w`
- `h`
- `min-w`
- `max-w`
- `min-h`
- `max-h`
- `pa`
- `px`
- `py`
- `pt`
- `pr`
- `pb`
- `pl`
- `radius`
- `left`
- `right`
- `top`
- `bottom`
- `inset`

Examples:

```html
<div class="w-[320px]"></div>
<div class="h-[50%]"></div>
<div class="px-[1rem]"></div>
<div class="radius-[12px]"></div>
<div class="left-[10vw]"></div>
<div class="w-[calc(100%-32px)]"></div>
<div class="max-w-[clamp(320px,50vw,960px)]"></div>
<div class="h-[var(--panel-height)]"></div>
```

Supported units:

```txt
px, em, rem, %, vw, vh, svw, svh, lvw, lvh, dvw, dvh, vmin, vmax, ch, ex, cm, mm, in, pt, pc
```

Supported functions:

```txt
calc(), min(), max(), clamp(), var()
```

### Margin

Margin utilities support length-like values and `auto`.

```html
<div class="ma-[16px]"></div>
<div class="mx-[auto]"></div>
<div class="mt-[2rem]"></div>
<div class="mb-[calc(100%-20px)]"></div>
<div class="ma-[10px 20px]"></div>
```

### Padding

Padding utilities support length-like values.

```html
<div class="pa-[16px]"></div>
<div class="px-[12px]"></div>
<div class="py-[8px 12px]"></div>
```

`auto` is not valid for padding and will be ignored.

### Radius

Radius utilities support length-like values.

```html
<div class="radius-[8px]"></div>
<div class="radius-[8px 12px]"></div>
<div class="radius-tl-[16px]"></div>
```

### Z-index

`z-[value]` supports numbers, `auto` and CSS variables.

```html
<div class="z-[1]"></div>
<div class="z-[999]"></div>
<div class="z-[auto]"></div>
<div class="z-[var(--z-modal)]"></div>
```

### Opacity

`opacity-[value]` supports values from `0` to `1`, CSS variables and global CSS values.

```html
<div class="opacity-[0]"></div>
<div class="opacity-[0.64]"></div>
<div class="opacity-[1]"></div>
<div class="opacity-[var(--opacity)]"></div>
```

### Color and background-color

`color-[value]` and `bg-[value]` support hex colors, CSS color functions, CSS variables and selected keyword values.

```html
<div class="color-[#111]"></div>
<div class="bg-[#fff]"></div>
<div class="bg-[rgb(255,255,255)]"></div>
<div class="color-[oklch(60% 0.2 20)]"></div>
<div class="bg-[var(--vl-surface)]"></div>
<div class="color-[currentColor]"></div>
```

Invalid values are ignored:

```html
<div class="w-[;]"></div>
<div class="radius-[.]"></div>
<div class="px-[auto]"></div>
<div class="z-[10px]"></div>
<div class="opacity-[2]"></div>
```

## Variants

Variants are added before the utility name using `:`.

```html
<div class="hover:w-[320px] md:px-[24px]"></div>
```

### Built-in pseudo variants

The following pseudo variants are available by default:

```txt
hover
focus
focus-visible
focus-within
active
disabled
checked
visited
first
last
odd
even
```

Example:

```vue
<template>
  <button class="w-[160px] hover:w-[180px] focus:px-[20px] active:radius-[10px]">
    Button
  </button>
</template>
```

Generated CSS:

```css
.hover\:w-\[180px\]:hover{width: 180px !important;}
.focus\:px-\[20px\]:focus{padding-left: 20px !important;padding-right: 20px !important;}
.active\:radius-\[10px\]:active{border-radius: 10px !important;}
```

## Responsive variants

The default breakpoints are:

```ts
{
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}
```

Example:

```vue
<template>
  <div class="w-[100%] md:w-[720px] lg:w-[960px] xl:w-[1200px] 2xl:w-[1440px]">
    Container
  </div>
</template>
```

Generated CSS:

```css
@media (min-width: 768px) { .md\:w-\[720px\]{width: 720px !important;} }
@media (min-width: 1024px) { .lg\:w-\[960px\]{width: 960px !important;} }
@media (min-width: 1280px) { .xl\:w-\[1200px\]{width: 1200px !important;} }
@media (min-width: 1536px) { .2xl\:w-\[1440px\]{width: 1440px !important;} }
```

## Custom variants

You can add custom selector, attribute and media variants.

```ts
utilsJIT({
  variants: {
    hocus: {
      kind: 'selector',
      value: '&:hover,&:focus',
    },
    selected: {
      kind: 'attribute',
      value: '[aria-selected="true"]',
    },
    tablet: {
      kind: 'media',
      value: 900,
    },
  },
})
```

Usage:

```html
<div class="hocus:w-[320px] selected:bg-[#eee] tablet:px-[24px]"></div>
```

Generated CSS:

```css
.hocus\:w-\[320px\]:hover,.hocus\:w-\[320px\]:focus{width: 320px !important;}
.selected\:bg-\[\#eee\][aria-selected="true"]{background-color: #eee !important;}
@media (min-width: 900px) { .tablet\:px-\[24px\]{padding-left: 24px !important;padding-right: 24px !important;} }
```

### Theme variants
Dark mode is part of the application theme strategy. Different projects may implement it through `.dark`, `data-theme`, CSS variables, a provider, or a custom theme layer. The plugin does not enforce one specific approach.

If you need `dark:`, add it explicitly.

Using `data-theme`:

```ts
utilsJIT({
  variants: {
    dark: {
      kind: 'selector',
      value: '[data-theme="dark"] &',
    },
  },
})
```

Usage:

```html
<div class="bg-[#fff] dark:bg-[#111] color-[#111] dark:color-[#fff]"></div>
```

Generated CSS:

```css
[data-theme="dark"] .dark\:bg-\[\#111\]{background-color: #111 !important;}
[data-theme="dark"] .dark\:color-\[\#fff\]{color: #fff !important;}
```

Using `.dark`:

```ts
utilsJIT({
  variants: {
    dark: {
      kind: 'selector',
      value: '.dark &',
    },
  },
})
```

Usage:

```html
<div class="dark:bg-[#111]"></div>
```

Generated CSS:

```css
.dark .dark\:bg-\[\#111\]{background-color: #111 !important;}
```

## Combining variants

Pseudo variants, custom selector variants and responsive variants can be combined.

`hocus:` is not built in. Add it first:

```ts
utilsJIT({
  variants: {
    hocus: {
      kind: 'selector',
      value: '&:hover,&:focus',
    },
  },
})
```

Then it can be combined with responsive variants:

```vue
<template>
  <button class="hover:md:w-[240px] focus:lg:px-[32px] hocus:xl:bg-[#eee]">
    Responsive button
  </button>
</template>
```

Generated CSS:

```css
@media (min-width: 768px) { .hover\:md\:w-\[240px\]:hover{width: 240px !important;} }
@media (min-width: 1024px) { .focus\:lg\:px-\[32px\]:focus{padding-left: 32px !important;padding-right: 32px !important;} }
@media (min-width: 1280px) { .hocus\:xl\:bg-\[\#eee\]:hover,.hocus\:xl\:bg-\[\#eee\]:focus{background-color: #eee !important;} }
```

## Configuration

`utilsJIT` accepts an options object.

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { utilsJIT } from '@vueland/utils-jit'

export default defineConfig({
  plugins: [
    vue(),
    utilsJIT({
      outFile: 'src/.generated/utils-jit.css',
      include: [/\.(vue|js|ts|jsx|tsx|html)$/],
      exclude: [/src\/fixtures/],
      breakpoints: {
        xs: 480,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        '2xl': 1536,
      },
      debug: false,
    }),
  ],
})
```

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `include` | `Array<string \| RegExp>` | `[/\.(vue\|js\|ts\|jsx\|tsx\|html)$/]` | Files to scan. |
| `exclude` | `Array<string \| RegExp>` | Internal service directories | Files and directories to ignore. |
| `outFile` | `string` | `src/.generated/utils-jit.css` | Generated CSS path relative to the Vite root. |
| `breakpoints` | `Record<string, number>` | `sm`, `md`, `lg`, `xl`, `2xl` | Responsive variants. |
| `rules` | `UtilityRule[]` | `[]` | Custom utility rules. |
| `variants` | `VariantMap` | Built-in variants | Custom variants. |
| `banner` | `string` | `/* @vueland/utils-jit: generated utilities */` | Banner at the top of the generated CSS file. |
| `emitEmptyFile` | `boolean` | `true` | Create a file with a comment when no utilities are found. |
| `debug` | `boolean` | `false` | Print diagnostic messages. |

### outFile

Path to the generated CSS file relative to the Vite project root.

```ts
utilsJIT({
  outFile: 'src/styles/generated/utils.css',
})
```

Then update your import accordingly:

```ts
import './styles/generated/utils.css'
```

### include

Patterns for files that should be scanned.

Default:

```ts
[/\.(vue|js|ts|jsx|tsx|html)$/]
```

Example:

```ts
utilsJIT({
  include: [/\.(vue|ts)$/],
})
```

### exclude

Patterns for files and directories that should be excluded from the initial scan, transform and HMR.

The following directories are excluded by default:

```txt
node_modules
.git
dist
build
coverage
.output
.nuxt
.turbo
.generated
storybook-static
playwright-report
```

Example:

```ts
utilsJIT({
  exclude: [
    /src\/fixtures/,
    /src\/legacy/,
    'storybook-static',
  ],
})
```

### breakpoints

Responsive variants. The key is used as the class prefix, and the value is used as `min-width` in pixels.

```ts
utilsJIT({
  breakpoints: {
    xs: 480,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
    '3xl': 1920,
  },
})
```

Usage:

```html
<div class="xs:w-[320px] 3xl:w-[1600px]"></div>
```

### variants

Custom variants extend the state and selector syntax.

```ts
utilsJIT({
  variants: {
    hocus: {
      kind: 'selector',
      value: '&:hover,&:focus',
    },
    selected: {
      kind: 'attribute',
      value: '[aria-selected="true"]',
    },
    tablet: {
      kind: 'media',
      value: 900,
    },
  },
})
```

### emitEmptyFile

When `emitEmptyFile` is `true`, the plugin creates a file with this content if no utilities are found:

```css
/* @vueland/utils-jit: no utilities found */
```

When `emitEmptyFile` is `false`, the file is not created until at least one utility class is found.

```ts
utilsJIT({
  emitEmptyFile: false,
})
```

## Custom utility rules

The plugin can be extended with custom rules through `rules` and `defineRule`.

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {
  defineRule,
  isColorValue,
  isSizeValue,
  utilsJIT,
} from '@vueland/utils-jit'

export default defineConfig({
  plugins: [
    vue(),
    utilsJIT({
      rules: [
        defineRule({
          name: 'surface',
          matcher: /^surface-\[(.+)\]$/,
          validate: isColorValue,
          declaration: (value) => ({
            backgroundColor: value,
          }),
          important: false,
        }),

        defineRule({
          name: 'size',
          matcher: /^size-\[(.+)\]$/,
          validate: isSizeValue,
          declaration: (value) => ({
            width: value,
            height: value,
          }),
        }),
      ],
    }),
  ],
})
```

Usage:

```vue
<template>
  <div class="surface-[#fff] size-[40px] hover:size-[48px]">
    Custom utilities
  </div>
</template>
```

Generated CSS:

```css
.surface-\[\#fff\]{background-color: #fff;}
.size-\[40px\]{width: 40px !important;height: 40px !important;}
.hover\:size-\[48px\]:hover{width: 48px !important;height: 48px !important;}
```

## defineRule API

```ts
defineRule({
  name: 'rule-name',
  matcher: /^rule-name-\[(.+)\]$/,
  validate: (value) => true,
  declaration: (value) => ({
    cssProperty: value,
  }),
  important: true,
})
```

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | Rule name for readability and debugging. |
| `matcher` | `RegExp` | Matcher for the utility part without variants. |
| `validate` | `(value: string) => boolean` | Validates the value inside `[]`. |
| `declaration` | `(value: string) => Record<string, string \| number> \| string[]` | Generates CSS declarations. |
| `important` | `boolean` | Adds `!important` to object-based declarations. Defaults to `true`. |

`declaration` usually returns a JS-style object:

```ts
defineRule({
  name: 'bg',
  matcher: /^bg-\[(.+)\]$/,
  validate: isColorValue,
  declaration: (value) => ({
    backgroundColor: value,
  }),
})
```

CamelCase CSS properties are converted to kebab-case:

```ts
{
  backgroundColor: '#fff',
  borderTopLeftRadius: '8px',
}
```

Result:

```css
background-color: #fff !important;
border-top-left-radius: 8px !important;
```

CSS variables are preserved:

```ts
defineRule({
  name: 'token',
  matcher: /^token-\[(.+)\]$/,
  declaration: (value) => ({
    '--vl-token': value,
  }),
  important: false,
})
```

Result:

```css
--vl-token: #fff;
```

If `declaration` returns `string[]`, the strings are treated as final CSS declarations. In this case, `!important` is not added automatically.

```ts
defineRule({
  name: 'raw',
  matcher: /^raw-\[(.+)\]$/,
  declaration: (value) => [
    `--raw-value: ${value};`,
  ],
})
```

## Validators

The package exports validators that can be reused in custom rules.

```ts
import {
  isColorValue,
  isMarginValue,
  isOpacityValue,
  isPaddingValue,
  isPositionValue,
  isRadiusValue,
  isSizeValue,
  isZIndexValue,
} from '@vueland/utils-jit'
```

Example:

```ts
defineRule({
  name: 'text',
  matcher: /^text-\[(.+)\]$/,
  validate: isColorValue,
  declaration: (value) => ({
    color: value,
  }),
})
```

For production rules, prefer strict validation.

```ts
import { defineRule } from '@vueland/utils-jit'

const gridColsRule = defineRule({
  name: 'grid-cols',
  matcher: /^grid-cols-\[(.+)\]$/,
  validate: (value) => /^\d+$/.test(value),
  declaration: (value) => ({
    gridTemplateColumns: `repeat(${value}, minmax(0, 1fr))`,
  }),
})
```

Usage:

```html
<div class="grid-cols-[3]"></div>
```

Generated CSS:

```css
.grid-cols-\[3\]{grid-template-columns: repeat(3, minmax(0, 1fr)) !important;}
```

## Vue class scanning

The plugin first tries to extract content from `class="..."` and `:class="..."`, then tokenizes the found chunks.

Static strings inside `:class` are supported:

```vue
<template>
  <div :class="['w-[200px]', active && 'px-[16px]']"></div>
  <div :class="{ 'radius-[12px]': rounded }"></div>
</template>
```

Runtime-generated class names are not evaluated. The class must exist as a static token in the source code.

This will not work:

```vue
<script setup lang="ts">
const width = 320
</script>

<template>
  <div :class="`w-[${width}px]`"></div>
</template>
```

This will work:

```vue
<template>
  <div :class="isWide ? 'w-[320px]' : 'w-[240px]'"></div>
</template>
```

## How generation works

During startup, the plugin:

1. Walks through project files.
2. Skips service directories like `node_modules`, `.git`, `dist`, `build` and `.generated`.
3. Scans only files that match `include`.
4. Extracts utility tokens.
5. Validates values.
6. Generates the final CSS file.

During development, the plugin updates CSS incrementally:

- adds rules for new tokens;
- removes rules when a token is no longer used anywhere;
- keeps a rule when the same token is still used in another file;
- reuses token parsing and CSS rule caches;
- notifies the Vite watcher when the generated CSS changes.

## Safety limits

To avoid unsafe or invalid CSS, the plugin limits arbitrary values:

- minimum token length: `5`;
- maximum token length: `180`;
- maximum value length: `160`;
- forbidden characters: `;`, `{`, `}`, `<`, `>`;
- CSS comments inside values are forbidden;
- the value must contain at least one letter or digit;
- only a safe subset of CSS value characters is allowed.

The following classes are ignored:

```html
<div class="w-[;]"></div>
<div class="w-[{}]"></div>
<div class="w-[<script>]"></div>
<div class="w-[...........................................]"></div>
```

## Recommendations

Use Utils JIT for precise one-off arbitrary values, not as a replacement for a design system.

Good:

```vue
<template>
  <c-card class="max-w-[720px] px-[24px] radius-[16px]">
    Content
  </c-card>
</template>
```

If a value is repeated across the project, prefer moving it into a theme, preset, token or component variant.

## Troubleshooting

### The CSS file was not created

Check that:

- `utilsJIT()` is added to `vite.config.ts`;
- there is at least one supported utility class in the project;
- `outFile` is correct;
- the generated CSS file is imported by the application;
- the file matches `include`;
- the file is not ignored by `exclude`.

If no utilities are found and `emitEmptyFile` is `true`, the file is created with this content:

```css
/* @vueland/utils-jit: no utilities found */
```

If `emitEmptyFile` is `false`, the file appears only after at least one utility class is found.

### A class exists, but CSS is not generated

Check that:

- the file matches `include`;
- the file is not ignored by `exclude`;
- the class is written statically and is not generated at runtime;
- the value passes validation;
- the utility is supported by built-in rules or added through `rules`;
- the variant exists in `breakpoints` or `variants`.

### `xs:` or `3xl:` does not work

Add the breakpoint manually:

```ts
utilsJIT({
  breakpoints: {
    xs: 480,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
    '3xl': 1920,
  },
})
```

### A custom rule does not work

Make sure `matcher` matches only the utility part without variants.

For this class:

```html
<div class="hover:surface-[#fff]"></div>
```

The matcher receives:

```txt
surface-[#fff]
```

Correct rule:

```ts
defineRule({
  name: 'surface',
  matcher: /^surface-\[(.+)\]$/,
  validate: isColorValue,
  declaration: (value) => ({
    backgroundColor: value,
  }),
})
```

## Full Vite config example

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {
  defineRule,
  isColorValue,
  isSizeValue,
  utilsJIT,
} from '@vueland/utils-jit'

export default defineConfig({
  plugins: [
    vue(),

    utilsJIT({
      outFile: 'src/.generated/utils-jit.css',

      include: [
        /\.(vue|js|ts|jsx|tsx|html)$/,
      ],

      exclude: [
        /src\/fixtures/,
      ],

      breakpoints: {
        xs: 480,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        '2xl': 1536,
      },

      variants: {
        hocus: {
          kind: 'selector',
          value: '&:hover,&:focus',
        },

        selected: {
          kind: 'attribute',
          value: '[aria-selected="true"]',
        },

        dark: {
          kind: 'selector',
          value: '[data-theme="dark"] &',
        },
      },

      rules: [
        defineRule({
          name: 'surface',
          matcher: /^surface-\[(.+)\]$/,
          validate: isColorValue,
          declaration: (value) => ({
            backgroundColor: value,
          }),
          important: false,
        }),

        defineRule({
          name: 'size',
          matcher: /^size-\[(.+)\]$/,
          validate: isSizeValue,
          declaration: (value) => ({
            width: value,
            height: value,
          }),
        }),
      ],
    }),
  ],
})
```

## License

MIT

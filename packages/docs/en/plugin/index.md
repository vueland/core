# Utils JIT

`@vueland/utils-jit` is a Vite plugin for generating CSS utilities in JIT mode.

The plugin scans project source files, finds arbitrary utility classes that are actually used and generates CSS only for those classes.

## Installation

::: code-group
```bash [pnpm]
pnpm add -D @vueland/utils-jit
```

```bash [npm]
npm install -D @vueland/utils-jit
```

```bash [yarn]
yarn add -D @vueland/utils-jit
```
:::

## Setup

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

By default the plugin creates this file:

```txt
src/.generated/utils-jit.css
```

Import it in the application entry point:

```ts
import './.generated/utils-jit.css'
```

## Quick example

```vue
<template>
  <div class="w-[300px] h-[200px] px-[16px] radius-[12px] bg-[#111]">
    Hello Vueland
  </div>
</template>
```

## Supported utilities

| Utility | CSS properties | Example |
| --- | --- | --- |
| `w-[value]` | `width` | `w-[320px]` |
| `h-[value]` | `height` | `h-[200px]` |
| `ma-[value]` | `margin` | `ma-[16px]` |
| `px-[value]` | `padding-left`, `padding-right` | `px-[16px]` |
| `radius-[value]` | `border-radius` | `radius-[12px]` |
| `z-[value]` | `z-index` | `z-[100]` |
| `opacity-[value]` | `opacity` | `opacity-[0.64]` |
| `color-[value]` | `color` | `color-[#111]` |
| `bg-[value]` | `background-color` | `bg-[#fff]` |

## Variants

Variants are added before the utility with `:`.

```html
<button class="hover:w-[180px] focus:px-[20px] active:radius-[10px]">
  Button
</button>
```

## Configuration

```ts
utilsJIT({
  outFile: 'src/.generated/utils-jit.css',
  include: [/\.(vue|js|ts|jsx|tsx|html)$/],
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
  debug: false,
})
```

## Recommendations

Use Utils JIT for focused arbitrary values, not as a replacement for the entire design system. If a value repeats across the project, move it into the theme, a preset or a component variant.

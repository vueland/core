# Utils JIT

`@vueland/utils-jit` — Vite-плагин для генерации CSS-утилит в JIT-режиме.

Плагин сканирует исходники проекта, находит используемые arbitrary utility classes и генерирует CSS только для реально найденных классов.

## Установка

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

## Подключение

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

По умолчанию плагин создает файл:

```txt
src/.generated/utils-jit.css
```

Импортируйте его в точке входа приложения:

```ts
import './.generated/utils-jit.css'
```

## Быстрый пример

```vue
<template>
  <div class="w-[300px] h-[200px] px-[16px] radius-[12px] bg-[#111]">
    Hello Vueland
  </div>
</template>
```

## Поддерживаемые utilities

| Utility | CSS-свойства | Пример |
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

Variants добавляются перед utility через `:`.

```html
<button class="hover:w-[180px] focus:px-[20px] active:radius-[10px]">
  Button
</button>
```

## Конфигурация

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

## Рекомендации

Используйте Utils JIT для точечных arbitrary-значений, а не как замену всей дизайн-системе. Если значение повторяется по всему проекту, лучше добавить его в тему, preset или отдельный компонентный вариант.

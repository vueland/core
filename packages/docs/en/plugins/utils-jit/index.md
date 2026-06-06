# Utils JIT

`@vueland/utils-jit` — Vite-плагин для генерации CSS-утилит в JIT-режиме.

Плагин сканирует исходники проекта, находит используемые arbitrary utility classes и генерирует CSS только для реально найденных классов. Это удобно для точечных CSS-значений, которые не хочется заранее описывать в теме, preset-ах или большом наборе готовых классов.

```vue
<template>
  <div class="w-[320px] px-[16px] radius-[12px] hover:w-[360px] md:px-[24px]">
    Card content
  </div>
</template>
```

## Когда использовать

Utils JIT полезен, когда нужно быстро применить точное CSS-значение прямо в разметке:

```vue
<template>
  <aside class="w-[280px] min-h-[100vh] px-[20px] z-[10]">
    Sidebar
  </aside>
</template>
```

Плагин хорошо подходит для:

- размеров блоков;
- внутренних и внешних отступов;
- радиусов;
- позиционирования;
- z-index;
- opacity;
- цветов;
- responsive-вариантов;
- pseudo-состояний;
- selector и attribute variants;
- кастомных utility-правил через `defineRule`.

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

## Подключение плагина

Добавьте `utilsJIT()` в `vite.config.ts`.

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

По умолчанию плагин создаёт файл:

```txt
src/.generated/utils-jit.css
```

Импортируйте его в точке входа приложения, например в `src/main.ts`:

```ts
import './.generated/utils-jit.css'
```

## Быстрый пример

```vue
<template>
  <div class="w-[300px] h-[200px] px-[16px] radius-[12px] z-[10]">
    Hello Vueland
  </div>
</template>
```

Сгенерированный CSS будет выглядеть примерно так:

```css
/* @vueland/utils-jit: generated utilities */
.h-\[200px\]{height: 200px !important;}
.px-\[16px\]{padding-left: 16px !important;padding-right: 16px !important;}
.radius-\[12px\]{border-radius: 12px !important;}
.w-\[300px\]{width: 300px !important;}
.z-\[10\]{z-index: 10 !important;}
```

Порядок правил в итоговом файле сортируется по имени utility-токена, поэтому не стоит завязывать поведение на порядок объявления классов в шаблоне.

## Разделы

- [Utilities](./utilities.md) — встроенные utility-классы и допустимые значения.
- [Variants](./variants.md) — pseudo, responsive и custom variants.
- [Custom Rules](./custom-rules.md) — расширение плагина через `defineRule`.
- [Configuration](./configuration.md) — options, генерация, ограничения и troubleshooting.

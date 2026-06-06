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

## Поддерживаемые utilities

| Utility | CSS-свойства | Пример |
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

Все встроенные правила генерируются с `!important`.

## Допустимые значения

Значения проходят валидацию перед генерацией CSS. Если значение не проходит проверку, CSS-правило не создаётся.

### Size, padding, radius и position

Для `w`, `h`, `min-w`, `max-w`, `min-h`, `max-h`, `pa`, `px`, `py`, `pt`, `pr`, `pb`, `pl`, `radius`, `left`, `right`, `top`, `bottom`, `inset` поддерживаются CSS length-like значения:

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

Поддерживаемые единицы:

```txt
px, em, rem, %, vw, vh, svw, svh, lvw, lvh, dvw, dvh, vmin, vmax, ch, ex, cm, mm, in, pt, pc
```

Также поддерживаются функции:

```txt
calc(), min(), max(), clamp(), var()
```

### Margin

Для margin-утилит поддерживаются length-like значения и `auto`:

```html
<div class="ma-[16px]"></div>
<div class="mx-[auto]"></div>
<div class="mt-[2rem]"></div>
<div class="mb-[calc(100%-20px)]"></div>
<div class="ma-[10px 20px]"></div>
```

### Padding

Для padding-утилит поддерживаются length-like значения:

```html
<div class="pa-[16px]"></div>
<div class="px-[12px]"></div>
<div class="py-[8px 12px]"></div>
```

`auto` для padding невалиден и будет проигнорирован.

### Radius

Для radius-утилит поддерживаются length-like значения:

```html
<div class="radius-[8px]"></div>
<div class="radius-[8px 12px]"></div>
<div class="radius-tl-[16px]"></div>
```

### Z-index

Для `z-[value]` поддерживаются числа, `auto` и CSS-переменные:

```html
<div class="z-[1]"></div>
<div class="z-[999]"></div>
<div class="z-[auto]"></div>
<div class="z-[var(--z-modal)]"></div>
```

### Opacity

Для `opacity-[value]` поддерживаются значения от `0` до `1`, CSS-переменные и global CSS values:

```html
<div class="opacity-[0]"></div>
<div class="opacity-[0.64]"></div>
<div class="opacity-[1]"></div>
<div class="opacity-[var(--opacity)]"></div>
```

### Color и background-color

Для `color-[value]` и `bg-[value]` поддерживаются hex, CSS color functions, CSS-переменные и некоторые ключевые значения:

```html
<div class="color-[#111]"></div>
<div class="bg-[#fff]"></div>
<div class="bg-[rgb(255,255,255)]"></div>
<div class="color-[oklch(60% 0.2 20)]"></div>
<div class="bg-[var(--vl-surface)]"></div>
<div class="color-[currentColor]"></div>
```

Некорректные значения игнорируются:

```html
<div class="w-[;]"></div>
<div class="radius-[.]"></div>
<div class="px-[auto]"></div>
<div class="z-[10px]"></div>
<div class="opacity-[2]"></div>
```

## Variants

Variants добавляются перед utility через `:`.

```html
<div class="hover:w-[320px] md:px-[24px] focus-visible:bg-[#eee]"></div>
```

### Псевдоклассы

По умолчанию доступны:

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

Пример:

```vue
<template>
  <button class="w-[160px] hover:w-[180px] focus:px-[20px] active:radius-[10px]">
    Button
  </button>
</template>
```

Результат:

```css
.hover\:w-\[180px\]:hover{width: 180px !important;}
.focus\:px-\[20px\]:focus{padding-left: 20px !important;padding-right: 20px !important;}
.active\:radius-\[10px\]:active{border-radius: 10px !important;}
```

### Theme variants
Dark mode — это часть стратегии темизации приложения. В разных проектах она может быть реализована через `.dark`, `data-theme`, CSS variables, provider или собственный theme layer. Поэтому плагин не навязывает конкретную модель.

Если нужен `dark:` variant, добавьте его явно через `variants`.

#### Через `data-theme`

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

Использование:

```html
<div class="bg-[#fff] dark:bg-[#111] color-[#111] dark:color-[#fff]"></div>
```

Результат:

```css
[data-theme="dark"] .dark\:bg-\[\#111\]{background-color: #111 !important;}
[data-theme="dark"] .dark\:color-\[\#fff\]{color: #fff !important;}
```

#### Через `.dark`

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

Использование:

```html
<div class="dark:bg-[#111]"></div>
```

Результат:

```css
.dark .dark\:bg-\[\#111\]{background-color: #111 !important;}
```

## Responsive-варианты

По умолчанию доступны breakpoints:

```ts
{
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}
```

Пример:

```vue
<template>
  <div class="w-[100%] md:w-[720px] lg:w-[960px] xl:w-[1200px] 2xl:w-[1440px]">
    Container
  </div>
</template>
```

Результат:

```css
@media (min-width: 768px) { .md\:w-\[720px\]{width: 720px !important;} }
@media (min-width: 1024px) { .lg\:w-\[960px\]{width: 960px !important;} }
@media (min-width: 1280px) { .xl\:w-\[1200px\]{width: 1200px !important;} }
@media (min-width: 1536px) { .2xl\:w-\[1440px\]{width: 1440px !important;} }
```

## Комбинирование variants

Псевдоклассы, selector variants и responsive-варианты можно комбинировать:

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
```vue
<template>
  <button class="hover:md:w-[240px] focus:lg:px-[32px] hocus:xl:bg-[#eee]">
    Responsive button
  </button>
</template>
```

Результат:

```css
@media (min-width: 768px) { .hover\:md\:w-\[240px\]:hover{width: 240px !important;} }
@media (min-width: 1024px) { .focus\:lg\:px-\[32px\]:focus{padding-left: 32px !important;padding-right: 32px !important;} }
@media (min-width: 1280px) { .hocus\:xl\:bg-\[\#eee\]:hover,.hocus\:xl\:bg-\[\#eee\]:focus{background-color: #eee !important;} }
```

В примере `hocus` должен быть добавлен в `variants` как пользовательский selector variant.

## Конфигурация

`utilsJIT` принимает объект настроек:

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

| Option | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `include` | `Array<string \| RegExp>` | `[/\.(vue\|js\|ts\|jsx\|tsx\|html)$/]` | Файлы, которые нужно анализировать. |
| `exclude` | `Array<string \| RegExp>` | Служебные директории | Файлы и директории, которые нужно исключить. |
| `outFile` | `string` | `src/.generated/utils-jit.css` | Путь к генерируемому CSS-файлу относительно Vite root. |
| `breakpoints` | `Record<string, number>` | `sm`, `md`, `lg`, `xl`, `2xl` | Responsive variants. |
| `rules` | `UtilityRule[]` | `[]` | Пользовательские utility-правила. |
| `variants` | `VariantMap` | built-in variants | Пользовательские variants. |
| `banner` | `string` | `/* @vueland/utils-jit: generated utilities */` | Баннер в начале CSS-файла. |
| `emitEmptyFile` | `boolean` | `true` | Создавать файл с комментарием, если utilities не найдены. |
| `debug` | `boolean` | `false` | Выводить диагностические сообщения. |

### `outFile`

Путь до генерируемого CSS-файла относительно `root` Vite-проекта.

```ts
utilsJIT({
  outFile: 'src/styles/generated/utils.css',
})
```

После этого импорт должен соответствовать новому пути:

```ts
import './styles/generated/utils.css'
```

### `include`

Список паттернов для файлов, которые нужно анализировать.

По умолчанию:

```ts
[/\.(vue|js|ts|jsx|tsx|html)$/]
```

Пример:

```ts
utilsJIT({
  include: [/\.(vue|ts)$/],
})
```

### `exclude`

Список паттернов для файлов и директорий, которые нужно исключить из полного сканирования, `transform` и HMR.

По умолчанию исключаются:

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

Пример:

```ts
utilsJIT({
  exclude: [
    /src\/fixtures/,
    /src\/legacy/,
    'storybook-static',
  ],
})
```

### `breakpoints`

Объект responsive-вариантов. Ключ используется в классе, значение — `min-width` в пикселях.

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

После этого можно использовать:

```html
<div class="xs:w-[320px] 3xl:w-[1600px]"></div>
```

### `variants`

Пользовательские variants позволяют расширять синтаксис состояний.

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
    dark: {
      kind: 'selector',
      value: '[data-theme="dark"] &',
    },
  },
})
```

Использование:

```html
<div class="hocus:w-[320px] selected:bg-[#eee] tablet:px-[24px] dark:bg-[#111]"></div>
```

Результат:

```css
.hocus\:w-\[320px\]:hover,.hocus\:w-\[320px\]:focus{width: 320px !important;}
.selected\:bg-\[\#eee\][aria-selected="true"]{background-color: #eee !important;}
@media (min-width: 900px) { .tablet\:px-\[24px\]{padding-left: 24px !important;padding-right: 24px !important;} }
[data-theme="dark"] .dark\:bg-\[\#111\]{background-color: #111 !important;}
```

### `emitEmptyFile`

Если `emitEmptyFile: true`, при отсутствии utility-классов будет создан файл:

```css
/* @vueland/utils-jit: no utilities found */
```

Если `emitEmptyFile: false`, файл не будет создан, пока плагин не найдёт хотя бы один utility-класс.

```ts
utilsJIT({
  emitEmptyFile: false,
})
```

## Кастомные utility-правила

Плагин можно расширять через `rules` и `defineRule`.

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

Теперь можно использовать:

```vue
<template>
  <div class="surface-[#fff] size-[40px] hover:size-[48px]">
    Custom utilities
  </div>
</template>
```

Сгенерированный CSS:

```css
.surface-\[\#fff\]{background-color: #fff;}
.size-\[40px\]{width: 40px !important;height: 40px !important;}
.hover\:size-\[48px\]:hover{width: 48px !important;height: 48px !important;}
```

### API `defineRule`

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

| Поле | Тип | Описание |
| --- | --- | --- |
| `name` | `string` | Название правила для читаемости и отладки. |
| `matcher` | `RegExp` | Matcher utility-части без variants. |
| `validate` | `(value: string) => boolean` | Проверка значения внутри `[]`. |
| `declaration` | `(value: string) => Record<string, string \| number> \| string[]` | Генерация CSS declarations. |
| `important` | `boolean` | Добавлять ли `!important` к object-based declarations. По умолчанию `true`. |

`declaration` обычно возвращает JS-style object:

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

CSS-свойства в camelCase автоматически превращаются в kebab-case:

```ts
{
  backgroundColor: '#fff',
  borderTopLeftRadius: '8px',
}
```

Результат:

```css
background-color: #fff !important;
border-top-left-radius: 8px !important;
```

CSS-переменные не изменяются:

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

Результат:

```css
--vl-token: #fff;
```

Если `declaration` возвращает `string[]`, строки считаются готовым CSS. В этом случае `!important` автоматически не добавляется.

```ts
defineRule({
  name: 'raw',
  matcher: /^raw-\[(.+)\]$/,
  declaration: (value) => [
    `--raw-value: ${value};`,
  ],
})
```

### Более строгая валидация custom rule

Для production-правил лучше явно ограничивать допустимый формат:

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

Использование:

```html
<div class="grid-cols-[3]"></div>
```

Результат:

```css
.grid-cols-\[3\]{grid-template-columns: repeat(3, minmax(0, 1fr)) !important;}
```

## Validators

Пакет экспортирует validators, которые можно использовать в custom rules:

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

Пример:

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

## Работа с Vue `class` и `:class`

Плагин сначала пытается быстро извлечь содержимое `class="..."` и `:class="..."`, а затем токенизирует найденные участки.

Поддерживаются статические строки внутри `:class`:

```vue
<template>
  <div :class="['w-[200px]', active && 'px-[16px]']"></div>
  <div :class="{ 'radius-[12px]': rounded }"></div>
</template>
```

Runtime-значения не вычисляются. Класс должен существовать в исходном коде как статический токен.

Не сработает:

```vue
<script setup lang="ts">
const width = 320
</script>

<template>
  <div :class="`w-[${width}px]`"></div>
</template>
```

Сработает:

```vue
<template>
  <div :class="isWide ? 'w-[320px]' : 'w-[240px]'"></div>
</template>
```

## Как работает генерация

Во время запуска Vite плагин:

1. Обходит файлы проекта.
2. Пропускает служебные директории вроде `node_modules`, `.git`, `dist`, `build`, `.generated`.
3. Анализирует только файлы, подходящие под `include`.
4. Извлекает utility-токены.
5. Валидирует значения.
6. Генерирует итоговый CSS-файл.

Во время разработки плагин обновляет CSS инкрементально:

- добавляет правила для новых токенов;
- удаляет правила, если токен больше нигде не используется;
- не удаляет правило, если такой же токен используется в другом файле;
- переиспользует cache разбора токенов и CSS-правил;
- уведомляет Vite watcher об изменении сгенерированного CSS.

## Ограничения и безопасность

Чтобы не генерировать небезопасный или некорректный CSS, плагин ограничивает arbitrary-значения:

- минимальная длина токена: `5`;
- максимальная длина токена: `180`;
- максимальная длина значения: `160`;
- запрещены `;`, `{`, `}`, `<`, `>`;
- запрещены CSS comments внутри значения;
- значение должно содержать хотя бы одну букву или цифру;
- разрешены только безопасные символы для CSS-значений.

Поэтому такие классы будут проигнорированы:

```html
<div class="w-[;]"></div>
<div class="w-[{}]"></div>
<div class="w-[<script>]"></div>
<div class="w-[...........................................]"></div>
```

## Рекомендации

Используйте Utils JIT для точечных arbitrary-значений, а не как замену всей дизайн-системе.

Хорошо:

```vue
<template>
  <c-card class="max-w-[720px] px-[24px] radius-[16px]">
    Content
  </c-card>
</template>
```

Если значение повторяется по всему проекту, лучше добавить его в тему, preset или отдельный компонентный вариант.

## Troubleshooting

### CSS-файл не появился

Проверьте, что:

- `utilsJIT()` добавлен в `vite.config.ts`;
- в проекте есть хотя бы один поддерживаемый utility-класс;
- путь `outFile` корректный;
- приложение импортирует сгенерированный CSS;
- файл подходит под `include`;
- файл не попадает под `exclude`.

Если utility-классы не найдены и `emitEmptyFile: true`, файл будет создан с комментарием:

```css
/* @vueland/utils-jit: no utilities found */
```

Если `emitEmptyFile: false`, файл появится только после того, как будет найден хотя бы один utility-класс.

### Класс есть, но CSS не генерируется

Проверьте, что:

- файл подходит под `include`;
- файл не попадает под `exclude`;
- класс написан статически, а не собирается в runtime;
- значение проходит валидацию;
- utility поддерживается встроенными правилами или добавлен через `rules`;
- variant существует в `breakpoints` или `variants`.

### Не работает `xs:` или `3xl:`

Добавьте breakpoint в конфигурацию:

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

### Не работает custom rule

Проверьте, что `matcher` описывает именно utility-часть без variants.

Для класса:

```html
<div class="hover:surface-[#fff]"></div>
```

`matcher` должен матчить:

```txt
surface-[#fff]
```

Пример:

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

## Полный пример `vite.config.ts`

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

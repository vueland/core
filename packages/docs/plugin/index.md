# Utils JIT

**Utils JIT** — Vite-плагин для генерации CSS-утилит в JIT-режиме.

Плагин сканирует исходники проекта, находит используемые arbitrary utility classes и генерирует CSS только для реально найденных классов. Это удобно для точечных значений, которые не хочется заранее описывать в теме или держать в большом наборе готовых классов.

```vue
<template>
  <div class="w-[320px] px-[16px] radius-[12px] hover:w-[360px] md:px-[24px]">
    Card content
  </div>
</template>
```

В результате будет создан CSS только для этих utility-классов.

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
- responsive-вариантов;
- hover / focus / active-состояний;
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

Порядок правил в итоговом файле сортируется по имени utility-токена, поэтому не стоит завязывать поведение на порядок объявления классов.

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
px, em, rem, %, vw, vh, vmin, vmax, ch, ex, cm, mm, in, pt, pc
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
```

### Z-index

Для `z-[value]` поддерживаются числа, `auto` и CSS-переменные:

```html
<div class="z-[1]"></div>
<div class="z-[999]"></div>
<div class="z-[auto]"></div>
<div class="z-[var(--z-modal)]"></div>
```

Некорректные значения игнорируются:

```html
<div class="w-[;]"></div>
<div class="radius-[.]"></div>
<div class="px-[auto]"></div>
<div class="z-[10px]"></div>
```

## Псевдоклассы

Поддерживаются варианты:

```txt
hover
focus
active
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

## Responsive-варианты

По умолчанию доступны breakpoints:

```ts
{
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1440,
}
```

Пример:

```vue
<template>
  <div class="w-[100%] md:w-[720px] lg:w-[960px] xl:w-[1200px]">
    Container
  </div>
</template>
```

Результат:

```css
@media (min-width: 768px) { .md\:w-\[720px\]{width: 720px !important;} }
@media (min-width: 1024px) { .lg\:w-\[960px\]{width: 960px !important;} }
@media (min-width: 1440px) { .xl\:w-\[1200px\]{width: 1200px !important;} }
```

## Комбинирование вариантов

Псевдоклассы и responsive-варианты можно комбинировать:

```vue
<template>
  <button class="hover:md:w-[240px] focus:lg:px-[32px]">
    Responsive button
  </button>
</template>
```

Результат:

```css
@media (min-width: 768px) { .hover\:md\:w-\[240px\]:hover{width: 240px !important;} }
@media (min-width: 1024px) { .focus\:lg\:px-\[32px\]:focus{padding-left: 32px !important;padding-right: 32px !important;} }
```

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
      include: [/\.(vue|js|ts|html)$/],
      breakpoints: {
        xs: 480,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1440,
      },
    }),
  ],
})
```

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

Список регулярных выражений для файлов, которые нужно анализировать.

По умолчанию:

```ts
[/\.(vue|js|ts|html)$/]
```

Пример с поддержкой JSX / TSX:

```ts
utilsJIT({
  include: [/\.(vue|js|ts|jsx|tsx|html)$/],
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
    xl: 1440,
    xxl: 1600,
  },
})
```

После этого можно использовать:

```html
<div class="xs:w-[320px] xxl:w-[1440px]"></div>
```

## Кастомные utility-правила

Плагин можно расширять через `rules` и `defineRule`.

```ts
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { defineRule, utilsJIT } from '@vueland/utils-jit'

export default defineConfig({
  plugins: [
    vue(),
    utilsJIT({
      rules: [
        defineRule({
          name: 'translate',
          matcher: /^translate-\[(.+)\]$/,
          validate: (value) => !!value,
          declaration: (value) => ({
            transform: `translate(${value})`,
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
  <div class="translate-[10px,20px] hover:translate-[0px,10px]">
    Floating element
  </div>
</template>
```

Сгенерированный CSS:

```css
.translate-\[10px\,20px\]{transform: translate(10px,20px);}
.hover\:translate-\[0px\,10px\]:hover{transform: translate(0px,10px);}
```

### Более строгая валидация кастомного правила

Для production-правил лучше не использовать `validate: (value) => !!value`, а явно ограничивать допустимый формат:

```ts
import { defineRule } from '@vueland/utils-jit'

const opacityRule = defineRule({
  name: 'opacity',
  matcher: /^opacity-\[(.+)\]$/,
  validate: (value) => /^(0|1|0?\.\d+|var\(.+\))$/.test(value),
  declaration: (value) => ({
    opacity: value,
  }),
})
```

Использование:

```html
<div class="opacity-[0.64] hover:opacity-[1]"></div>
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
2. Пропускает служебные директории вроде `node_modules`, `.git`, `dist`, `.output`, `.nuxt`, `.turbo`, `.generated`.
3. Анализирует только файлы, подходящие под `include`.
4. Извлекает utility-токены.
5. Валидирует значения.
6. Генерирует итоговый CSS-файл.

Во время разработки плагин обновляет CSS инкрементально:

- добавляет правила для новых токенов;
- удаляет правила, если токен больше нигде не используется;
- переиспользует cache разбора токенов и CSS-правил;
- уведомляет Vite watcher об изменении сгенерированного CSS.

## Ограничения и безопасность

Чтобы не генерировать небезопасный или некорректный CSS, плагин ограничивает arbitrary-значения:

- минимальная длина токена: `5`;
- максимальная длина токена: `100`;
- максимальная длина значения: `120`;
- запрещены `;`, `{`, `}`;
- значение должно содержать хотя бы одну букву или цифру;
- разрешены только безопасные символы для CSS-значений.

Поэтому такие классы будут проигнорированы:

```html
<div class="w-[;]"></div>
<div class="w-[{}]"></div>
<div class="w-[.....................................................................................................]"></div>
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

Лучше вынести в компонентный API или theme token:

```vue
<template>
  <c-button class="px-[14px] py-[7px] radius-[6px]">
    Save
  </c-button>
</template>
```

Если значение повторяется по всему проекту, лучше добавить его в тему, preset или отдельный компонентный вариант.

## Troubleshooting

### CSS-файл не появился

Проверьте, что:

- `utilsJIT()` добавлен в `vite.config.ts`;
- в проекте есть хотя бы один поддерживаемый utility-класс;
- путь `outFile` корректный;
- приложение импортирует сгенерированный CSS.

Если utility-классы не найдены, файл всё равно будет создан с комментарием:

```css
/* @vueland/utils-jit: no utilities found */
```

### Класс есть, но CSS не генерируется

Проверьте, что:

- файл подходит под `include`;
- класс написан статически, а не собирается в runtime;
- значение проходит валидацию;
- variant существует в `breakpoints` или является одним из `hover`, `focus`, `active`.

### Не работает `xs:` или `xxl:`

Добавьте breakpoint в конфигурацию:

```ts
utilsJIT({
  breakpoints: {
    xs: 480,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1440,
    xxl: 1600,
  },
})
```

## Полный пример `vite.config.ts`

```ts
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { defineRule, utilsJIT } from '@vueland/utils-jit'

export default defineConfig({
  plugins: [
    vue(),
    utilsJIT({
      outFile: 'src/.generated/utils-jit.css',
      include: [/\.(vue|js|ts|jsx|tsx|html)$/],
      breakpoints: {
        xs: 480,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1440,
        xxl: 1600,
      },
      rules: [
        defineRule({
          name: 'translate',
          matcher: /^translate-\[(.+)\]$/,
          validate: (value) => !!value,
          declaration: (value) => ({
            transform: `translate(${value})`,
          }),
        }),
      ],
    }) as Plugin,
  ],
})
```

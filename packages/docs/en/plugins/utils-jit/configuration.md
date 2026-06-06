# Configuration

`utilsJIT` принимает объект настроек.

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
| `breakpoints` | `Record<string, number>` | `sm`, `md`, `lg`, `xl`, `2xl` | Responsive variants. Пользовательские значения добавляются к дефолтным или переопределяют их. |
| `rules` | `UtilityRule[]` | `[]` | Пользовательские utility-правила. |
| `variants` | `VariantMap` | `{}` | Пользовательские variants, которые добавляются к built-in variants. |
| `banner` | `string` | `/* @vueland/utils-jit: generated utilities */` | Баннер в начале CSS-файла. |
| `emitEmptyFile` | `boolean` | `true` | Создавать файл с комментарием, если utilities не найдены. |
| `debug` | `boolean` | `false` | Выводить диагностические сообщения. |

## `outFile`

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

## `include`

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

## `exclude`

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

## `breakpoints`

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

## `variants`

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

## `emitEmptyFile`

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
2. Пропускает служебные директории вроде `node_modules`, `.git`, `dist`, `build`, `.generated` и других.
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

### Не работает `dark:`

`dark:` не является встроенным variant. Добавьте его явно:

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

# Utils JIT

**Utils JIT** — это быстрый JIT-движок утилитарных CSS-классов для Vite.

Плагин анализирует исходный код проекта и генерирует CSS **только для используемых классов**, аналогично Tailwind JIT, но без тяжелой конфигурации и огромного CSS-бандла.

Поддерживаются arbitrary utilities:

```
w-[200px]
h-[100px]
px-[16px]
radius-[12px]
z-[999]
left-[12px]
top-[12px]
```

А также варианты с псевдоклассами и адаптивностью:

```
hover:w-[200px]
md:px-[24px]
hover:md:w-[300px]
focus:px-[20px]
active:radius-[10px]
```

---

# Возможности

* ⚡ JIT генерация CSS
* 🚀 быстрый incremental rebuild
* 🔥 полная поддержка HMR
* 🧠 fast class extraction
* 🧩 поддержка Vue / JS / TS
* 📦 минимальный итоговый CSS
* ⚙️ настраиваемые breakpoints

---

## Установка

```bash
yarn add -D @vueland/utils-jit
```

---

## Подключение

Добавьте плагин в `vite.config.ts`.

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { utilsJIT } from '@vueland/utils-jit'

export default defineConfig({
  plugins: [
    vue(),
    utilsJIT()
  ]
})
```

---

## Подключение CSS

JIT генерирует CSS файл:

```
src/.generated/utils-jit.css
```

Импортируйте его в приложение:

```ts
import './.generated/utils-jit.css'
```

Например в `main.ts`.

---

# Пример использования

```html

<template>
  <div class="absolute z-[10] w-[300px] h-[200px] px-[16px] radius-[12px]">
    Hello
  </div>
</template>
```

JIT автоматически сгенерирует:

```css
.z-\[10\]{
  z-index: 10 !important;
}

.w-\[300px\]{
  width: 300px !important;
}

.h-\[200px\]{
  height: 200px !important;
}

.px-\[16px\]{
  padding-left: 16px !important;
  padding-right: 16px !important;
}

.radius-\[12px\]{
  border-radius: 12px !important;
}
```

---

## Псевдо классы

Поддерживаются псевдо-классы:

```
hover
focus
active
```

### Пример

```html
<div class="hover:w-[300px]"></div>
```

Результат:

```css
.hover\:w-\[300px\]:hover{
  width: 300px !important;
}
```

---

## Breakpoints

Поддерживаются media variants.

По умолчанию:

```
{
  sm: 640,
  md: 768,
  lg: 1024
}
```

Использование:

```html

<c-btn class="md:w-[400px]">
  Кнопка
</c-btn>
```

Результат:

```css
@media (min-width:768px){
  .md\:w-\[400px\]{
    width: 400px !important;
  }
}
```

---

## Конфигурация

Плагин принимает объект настроек.

```ts
utilsJIT({
  outFile: './src/.generated/utils.css', // путь до генерируемого файла стилей
  include: [], // по умолчанию [/\.(vue|js|ts|html)$/]
  breakpoints: {
    xs: 480,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1440
  }
})
```

---

## Все доступные utilities

| Utility             | CSS свойства                    | Пример            |
|---------------------|---------------------------------|-------------------|
| `w-[value]`         | `width`                         | `w-[300px]`       |
| `h-[value]`         | `height`                        | `h-[100px]`       |
| `min-w-[value]`     | `min-width`                     | `min-w-[200px]`   |
| `min-h-[value]`     | `min-height`                    | `min-h-[100px]`   |
| `max-w-[value]`     | `max-width`                     | `max-w-[1200px]`  |
| `max-h-[value]`     | `max-height`                    | `max-h-[500px]`   |
| `ma-[value]`        | `margin`                        | `ma-[16px]`       |
| `mx-[value]`        | `margin-left`, `margin-right`   | `mx-[auto]`       |
| `my-[value]`        | `margin-top`, `margin-bottom`   | `my-[32px]`       |
| `mt-[value]`        | `margin-top`                    | `mt-[16px]`       |
| `mr-[value]`        | `margin-right`                  | `mr-[8px]`        |
| `mb-[value]`        | `margin-bottom`                 | `mb-[24px]`       |
| `ml-[value]`        | `margin-left`                   | `ml-[12px]`       |
| `pa-[value]`        | `padding`                       | `pa-[20px]`       |
| `px-[value]`        | `padding-left`, `padding-right` | `px-[16px]`       |
| `py-[value]`        | `padding-top`, `padding-bottom` | `py-[12px]`       |
| `pt-[value]`        | `padding-top`                   | `pt-[10px]`       |
| `pr-[value]`        | `padding-right`                 | `pr-[8px]`        |
| `pb-[value]`        | `padding-bottom`                | `pb-[20px]`       |
| `pl-[value]`        | `padding-left`                  | `pl-[16px]`       |
| `radius-[value]`    | `border-radius`                 | `radius-[8px]`    |
| `radius-tl-[value]` | `border-top-left-radius`        | `radius-tl-[8px]` |
| `radius-tr-[value]` | `border-top-right-radius`       | `radius-tr-[8px]` |
| `radius-bl-[value]` | `border-bottom-left-radius`     | `radius-bl-[8px]` |
| `radius-br-[value]` | `border-bottom-right-radius`    | `radius-br-[8px]` |
| `left-[value]`      | `left`                          | `left-[8px]`      |
| `right-[value]`     | `right`                         | `right-[8px]`     |
| `top-[value]`       | `top`                           | `top-[8px]`       |
| `bottom-[value]`    | `bottom`                        | `bottom-[8px]`    |
| `inset-[value]`     | `inset`                         | `inset-[8px]`     |
| `z-[value]`         | `z-index`                       | `z-[1]`           |

---

## Допустимые значения

Utils JIT поддерживает arbitrary значения, но они проходят проверку валидности.

Это предотвращает генерацию некорректного CSS.

---

## Width / Height

Поддерживаются:

```
length
percentage
calc()
var()
clamp()
min()
max()
```

Примеры:

```
w-[300px]
h-[50%]
w-[calc(100%-32px)]
w-[var(--sidebar-width)]
```

---

## Margin

Поддерживаются:

```
length
percentage
calc()
var()
auto
```

Примеры:

```
mx-[auto]
mt-[16px]
mb-[5%]
ml-[calc(100%-20px)]
```

---

## Padding

Поддерживаются:

```
length
percentage
calc()
var()
```

Примеры:

```
px-[16px]
py-[2rem]
pt-[10%]
pl-[calc(100%-32px)]
```

---

## Border Radius

Поддерживаются:

```
length
percentage
calc()
var()
```

Примеры:

```
radius-[12px]
radius-tl-[8px]
radius-tr-[16px]
radius-bl-[20px]
radius-br-[50%]
```

---
## Positions
Поддерживаются:
```
length
percentage
calc()
var()
```

Примеры:
```
top-[12px]
bottom-[5rem]
left-[20%]
right-[5vw]
```

---
## Z-Index

Поддерживаются:

```
integer
auto
var()
```

Примеры:

```
z-[10]
z-[999]
z-[auto]
z-[var(--z-modal)]
```

---

## Некорректные значения

Следующие значения игнорируются:

```
radius-[.]
px-[auto]
z-[10px]
w-[;]
```

CSS для них не генерируется.

---

## Ограничения

Для защиты сборки используются ограничения:

```
max token length = 100
max value length = 120
```

---

## Адаптивные модификаторы

Все утилиты поддерживают адаптивные модификаторы.

```
md:w-[400px]
lg:px-[32px]
xl:radius-[16px]

hover:w-[320px]
focus:px-[20px]
active:radius-[10px]
```

---

## Комбинирование

Модификаторы можно комбинировать:

```
hover:md:w-[400px]
```

Результат:

```css
@media (min-width:768px){
  .hover\:md\:w-\[400px\]:hover{
    width: 400px !important;
  }
}
```

---

## Fast Class Extraction

Плагин использует быстрый алгоритм извлечения классов.

Сначала анализируются только участки:

```
class="..."
:class="..."
```

После этого токенизируются только найденные части.

Это значительно ускоряет работу JIT на больших проектах.

Если классы не найдены, используется fallback на полный текст файла.

---

## Поддержка Vue :class

Поддерживаются статические варианты:

```vue
<div :class="['w-[200px]', active && 'px-[16px]']"></div>
<div :class="{ 'radius-[12px]': true }"></div>
```

---

## Ограничения

JIT не может вычислять runtime значения.

Не будет работать:

```
w-[${width}px]
```

Такие классы должны быть статическими.

---

## Производительность

JIT использует:

* incremental rebuild
* token caching
* css caching
* fast class extraction

Это позволяет обновлять CSS практически мгновенно при HMR.

---

## Поддерживаемые файлы

По умолчанию анализируются:

```
.vue
.js
.ts
.html
```

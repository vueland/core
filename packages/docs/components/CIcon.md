<script>import {CIcon} from '@vueland/ui/components'
import DemoBlock from '../.vitepress/components/DemoBlock.vue'

export default {
  components: {
    CIcon,
    DemoBlock
  }
}
</script>

# CIcon

`CIcon` — универсальный компонент для отображения SVG-иконок.  
Он поддерживает несколько источников иконок:

- локальный registry
- SVG sprite
- Vue-компоненты
- raw SVG body

Компонент обеспечивает единый API для всех типов иконок и подходит как для UI-библиотеки, так и для приложений.

---

### Базовое использование

```vue

<c-icon name="calendar" size="32" class="text-blue mr-4"/>
<c-icon name="checkboxOn" size="32" class="text-green"/>
```

<demo-block class="d-flex justify-space-evenly py-5">
    <c-icon name="calendar" size="32" class="text-blue" />
    <c-icon name="checkboxOn" size="32" class="text-green" />
</demo-block>

По умолчанию иконки берутся из **локального registry**.

---

# Источники иконок

## Локальный registry

По умолчанию иконки берутся из локального регистра иконок `icons.ts`.

```html

<c-icon name="check"/>
```

Пример registry:

```ts
export const icons = {
  check: {
    viewBox: '0 0 16 16',
    body: '<path d="..." />'
  }
}
```

---

## SVG Sprite

Иконка может быть получена из SVG-спрайта.

```vue

<c-icon
  name="check"
  source="sprite"
/>
```

Если используется prefix:

```vue

<c-icon
  name="check"
  source="sprite"
  sprite-prefix="core-ui-"
/>
```

Если используется внешний sprite:

```vue

<c-icon
  name="check"
  source="sprite"
  sprite-path="/icons/sprite.svg"
/>
```

Пример символа в спрайте:

```vue

<symbol id="check" viewBox="0 0 16 16">
  <path d="..."/>
</symbol>
```

---

## Vue компонент

Можно передать кастомный компонент.

```vue

<script setup lang="ts">
  import MyIcon from './MyIcon.vue'
</script>

<template>
  <c-icon :component="MyIcon"/>
</template>
```

---

## Raw SVG

Можно передать SVG напрямую.

```vue

<c-icon
  :body="'<path d=&quot;M7.6 11.3L3.2 7...&quot; />'"
  view-box="0 0 16 16"
/>
```

---

## Props

| Prop           | Type                | Default     | Description            |
|----------------|---------------------|-------------|------------------------|
| `name`         | `string`            | —           | имя иконки             |
| `source`       | `'lib' \| 'sprite'` | `lib`       | источник иконки        |
| `component`    | `Component`         | `null`      | Vue компонент иконки   |
| `body`         | `string`            | —           | raw SVG body           |
| `viewBox`      | `string`            | `0 0 16 16` | viewBox SVG            |
| `size`         | `number \| string`  | `16`        | размер иконки          |
| `width`        | `number \| string`  | —           | ширина                 |
| `height`       | `number \| string`  | —           | высота                 |
| `tag`          | `string`            | `span`      | корневой HTML элемент  |
| `spritePrefix` | `string`            | `''`        | prefix для sprite      |
| `spritePath`   | `string`            | `''`        | путь к внешнему sprite |

---

## Размеры

Размер можно задать через ```size```.

```html

<c-icon name="check" size="20"/>
```

Или отдельно:

```html

<c-icon
  name="check"
  width="24"
  height="24"
/>
```

---

## Цвет

По умолчанию используется `currentColor`.

```vue

<c-icon name="check" class="text-red"/>
```

Иконка также может наследовать цвет из CSS.

```css
.my-color {
  color: #1f77c4;
}
```

---

### Примеры

### Кнопка

```html

<c-btn class="btn">
  <c-icon name="check" size="18"/>
  Submit
</c-btn>
```

---

### С кастомной иконкой

```vue

<c-icon :component="MyIcon" size="24"/>
```

---

### Со спрайтом

```vue

<c-icon
  name="calendar"
  source="sprite"
  sprite-prefix="ui-"
/>
```

---

# Рекомендации
- Иконки желательно нормализовать к одному `viewBox` (например `0 0 16 16` или `0 0 24 24`).

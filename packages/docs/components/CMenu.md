<script>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import BaseExamples from './examples/CMenu/BaseExamples.vue'
import PositionsExamples from './examples/CMenu/PositionsExamples.vue'

export default {
  components: {
    DemoBlock,
    BaseExamples,
    PositionsExamples
  }
}

</script>

# CMenu

`CMenu` — компонент всплывающего меню, привязанного к activator-элементу.

Используется для:

* dropdown menu
* context menu
* action menu
* popover
* кастомных выпадающих списков

Компонент:

* использует `COverlay` для рендера поверх приложения
* автоматически позиционируется относительно activator
* перепозиционируется при `scroll` и `resize`
* поддерживает стратегии поведения у краёв экрана
* управляется через `v-model`

---

## Особенности

* 📦 Teleport через `COverlay`
* 🧠 Автоматическое позиционирование относительно activator
* 📐 Поддержка направлений (`top`, `bottom`, `left`, `right`)
* 🔄 Перепозиционирование при `scroll` и `resize`
* 🎯 Гибкий slot API для activator
* ⚙️ Поддержка offset и стратегий (`bounce`, `reverse`)

---

## Использование

```vue

<template>
  <c-menu
    open-on-click
    close-on-click
    offset-y="10"
    class="elevation-5 bg-grey-darken-4 text-white"
    top
  >
    <template #activator="{ on, activator }">
      <c-btn
        v-bind="activator"
        class="elevation-2 bg-green"
        v-on="on"
      >
        Открыть меню
      </c-btn>
    </template>
    <div class="pa-4">
      <c-list class="bg-grey-darken-4">
        <c-list-item
          v-for="it in 10"
          :key="it"
        >
          <c-list-item-title>
            {{ it }} item
          </c-list-item-title>
        </c-list-item>
      </c-list>
    </div>
  </c-menu>
</template>
```

<base-examples/>

---

## Как это работает

1. Activator передает события (`on`) и атрибуты (`activator`)
2. При открытии (`modelValue = true`) меню монтируется через `COverlay`
3. `useAutoPosition` рассчитывает позицию относительно activator
4. Позиция обновляется при `scroll`, `resize` и изменении размеров
5. Контент рендерится с учетом `z-index` из overlay stack

---

## Props

| Prop                  | Тип                     | По умолчанию      | Описание                                   |
|-----------------------|-------------------------|-------------------|--------------------------------------------|
| `modelValue`          | `boolean`               | `false`           | Управляет состоянием меню                  |
| `width`               | `string \| number`      | `activator.width` | Ширина меню                                |
| `height`              | `string \| number`      | `auto`            | Высота меню (до maxHeight)                 |
| `maxWidth`            | `string \| number`      | `auto`            | Высота меню (до maxHeight)                 |
| `maxHeight`           | `string \| number`      | `300`             | Максимальная высота                        |
| `top`                 | `boolean`               | `false`           | Открывать сверху                           |
| `bottom`              | `boolean`               | `false`           | Открывать снизу                            |
| `left`                | `boolean`               | `false`           | Открывать слева                            |
| `right`               | `boolean`               | `false`           | Открывать справа                           |
| `offsetX`             | `number \| string`      | `0`               | Смещение по X                              |
| `offsetY`             | `number \| string`      | `0`               | Смещение по Y                              |
| `openDelay`           | `number \| string`      | `0`               | Задержка перед открытием                   |
| `closeDelay`          | `number \| string`      | `0`               | Задержка перед закрытием                   |
| `strategy`            | `'bounce' \| 'reverse'` | `'bounce'`        | Стратегия позиционирования                 |
| `openOnClick`         | `boolean`               | `false`           | Открытие по клику на активатор             |
| `closeOnClick`        | `boolean`               | `false`           | Закрытие по клику на активатор             |
| `openOnHover`         | `boolean`               | `false`           | Открытие по наведению курсора на активатор |
| `closeOnLeave`        | `boolean`               | `false`           | Закрытие при уводе курсора на активатор    |
| `openOnFocus`         | `boolean`               | `false`           | Открытие при фокусе на активатор           |
| `closeOnClickOutside` | `boolean`               | `false`           | Закрытие при клике вне                     |
| `closeOnContentClick` | `boolean`               | `false`           | Закрытие при клике по контенту             |
| `to`                  | `string`                | `"body"`          | Teleport target                            |
| `ssr`                 | `boolean`               | `false`           | SSR рендер                                 |

---

## Slots

### activator

Слот activator-элемента.

| Prop        | Тип                        | Описание |
|-------------|----------------------------|----------|
| `on`        | `Record<string, Function>` | События  |
| `activator` | `Record<string, any>`      | Атрибуты |

### default

Основной контент меню.

---

## Пример

```html

<c-menu bottom open-on-hover close-on-content-click>
  <template #activator="{ on, activator }">
    <button v-on="on" v-bind="activator">
      Actions
    </button>
  </template>

  <div class="d-flex flex-column py-2">
    <button class="px-4 py-2 text-left">Edit</button>
    <button class="px-4 py-2 text-left">Delete</button>
  </div>
</c-menu>
```

---

## Позиционирование

Поддерживаются направления:

* `top`
* `bottom`
* `left`
* `right`

### Примеры во все стороны

```html

<c-menu
  open-on-click
  close-on-click
  close-on-content-click
  close-on-click-outside
  offset-y="5"
  class="elevation-5 bg-blue-darken-2 text-white"
  strategy="reverse"
  top
>
  <template #activator="{ on, activator }">
    <c-btn
      v-bind="activator"
      class="elevation-2 bg-blue-darken-2 w-[120px]"
      v-on="on"
    >
      Вверх
    </c-btn>
  </template>
  <c-list class="bg-blue-darken-2">
    <c-list-item
      v-for="it in 5"
      :key="it"
    >
      <c-list-item-title>
        {{ it }} item
      </c-list-item-title>
    </c-list-item>
  </c-list>
</c-menu>  
```

<positions-examples/>
---

## Стратегии

### bounce

Меню сдвигается внутрь доступной области экрана.

### reverse

Меню открывается в противоположную сторону при нехватке места.

---

## Offset

```vue

<c-menu bottom offset-y="8" offset-x="4">...</c-menu>
```

---

## Teleport

Контент рендерится через `COverlay` и по умолчанию телепортируется в `body`.

```vue

<c-menu to="#app-overlay-root">...</c-menu>
```

---

## События

| Event               | Тип       |
|---------------------|-----------|
| `update:modelValue` | `boolean` |
| `outside-click`     | `void`    |
| `click`             | `void`    |

---

## Expose API

```vue

<script setup>
  import {ref} from 'vue'

  const menu = ref()
</script>

<template>
  <button @click="menu?.open()">Open</button>

  <c-menu ref="menu">
    <template #activator="{ on, activator }">
      <button v-on="on" v-bind="activator">
        Activator
      </button>
    </template>

    <div class="pa-4">
      Content
    </div>
  </c-menu>
</template>
```

---

## Архитектура

Компонент построен на основе:

* `COverlay`
* `useAutoPosition`
* `useActivator`
* `useDelayedActions`

```
OverlayStack
 ├─ CMenu
 ├─ CTooltip
 ├─ CDialog
```

---

## Структура DOM

```html

<div class="c-menu">
  <div class="c-menu__content">
    <!-- slot -->
  </div>
</div>
```

---

## Связанные компоненты

* `COverlay`
* `CTooltip`
* `CDialog`

# COverlay

`COverlay` — это headless компонент для отображения контента поверх приложения.  
Он управляет **stack-индексами (`z-index`)**, **телепортирует контент** в указанный DOM-узел и обеспечивает корректную
работу компонентов вроде **menu, dialog, tooltip**.

Компонент не содержит собственной разметки и предоставляет только **механику overlay-слоя**.

---

## Особенности

- 📦 Teleport — переносит контент в `body` или любой указанный контейнер
- 🧠 Overlay stack — автоматическое управление `z-index`
- 🎯 Slot API — передает `z-index` внутрь слота
- 🔌 Используется как базовый слой для UI-компонентов

---

### Использование

```vue

<script setup lang="ts">
  import { ref } from 'vue'

  const open = ref(false)
</script>

<template>
  <button @click="open = true">
    Open overlay
  </button>

  <c-overlay v-model="open">
    <template #default="{ zIndex }">
      <div
        class="overlay"
        :style="{ zIndex }"
      >
        Overlay content
      </div>
    </template>
  </c-overlay>
</template>
```

---

## Как это работает

1. При открытии (`modelValue = true`) компонент регистрируется в **overlay stack**
2. `useOverlayStack()` возвращает следующий доступный `z-index`
3. Этот `z-index` передается в слот
4. При закрытии происходит `unregister()`

---

## Props

| Prop         | Тип       | По умолчанию | Описание                       |
|--------------|-----------|--------------|--------------------------------|
| `modelValue` | `boolean` | `false`      | Управляет отображением overlay |
| `to`         | `string`  | `"body"`     | DOM-контейнер для teleport     |

---

## Slots

### default

Основной слот для рендера overlay-контента.

## Slot props

| Prop     | Тип      | Описание                      |
|----------|----------|-------------------------------|
| `zIndex` | `number` | Вычисленный `z-index` overlay |

### Пример

```html

<c-overlay v-model="open">
  <template #default="{ zIndex }">
    <div :style="{ zIndex }">
      Content
    </div>
  </template>
</c-overlay>
```

---

## Teleport

Контент может быть телепортирован в любой DOM контейнер. Но по умолчанию портируется в ```body```.

```html

<c-overlay
  v-model="open"
  to="#app-overlay-root"
>
```

---

## Архитектура

Компонент использует `useOverlayStack` для управления порядком overlay-слоев.

```
OverlayStack
 ├─ Menu
 ├─ Dialog
 ├─ Tooltip
```

Каждый новый overlay получает **следующий `z-index`**.

---

# Пример использования в Menu

```html

<c-overlay v-model="open">
  <template #default="{ zIndex }">
    <div
      class="c-menu"
      :style="{ zIndex }"
    >
      <slot/>
    </div>
  </template>
</c-overlay>
```

---

# Связанные компоненты

- `CMenu`
- `CTooltip`
- `CDialog`

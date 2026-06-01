---
title: CTooltip
description: Документация компонента CTooltip
---

<script>
import BaseExample from './examples/CTooltip/BaseExample.vue'
import PositionsExamples from './examples/CTooltip/PositionsExamples.vue'

export default {
    components: {
       BaseExample,
      PositionsExamples
    }
}
</script>

# CTooltip

`CTooltip` — легковесная обертка над `CMenu` для отображения текстовых подсказок (tooltip). Использует overlay-логику (
`позиционирование`, `z-index`, `открытие/закрытие`) из `CMenu`.

---

## Базовое использование

```vue

<template>
  <c-tooltip
    top
    open-on-hover
    close-on-leave
    offset-y="5"
    offset-x="-15"
    class="elevation-2 bg-blue text-white"
  >
    <template #activator="{ on, activator }">
      <c-btn v-bind="activator" v-on="on">
        Наведи
      </c-btn>
    </template>
    <div class="pa-2">
      Tooltip текст
    </div>
  </c-tooltip>
</template>
```

<base-example/>

---

## Как это работает

- все атрибуты пробрасываются в `CMenu`
- `width="auto"` по умолчанию
- используется слот `activator`
- контент оборачивается в `.c-tooltip`

---

```html

<template>
  <c-tooltip 
    top 
    open-on-click
    close-on-click
  >
    <template #activator="{ on, activator }">
      <c-btn 
        v-bind="activator" 
        v-on="on"
      >
        Help
      </c-btn>
    </template>

    Подсказка
  </c-tooltip>
</template>
```

---

## Проброс пропсов (CMenu API)

```vue

<template>
  <c-tooltip
    top
    open-on-hover
    close-on-leave
    :offset-y="8"
    max-width="240"
  >
    <template #activator="{ on, activator }">
      <c-icon 
        v-bind="activator" 
        v-on="on" 
        name="help"
      />
    </template>

    Tooltip сверху
  </c-tooltip>
</template>
```
<positions-examples/>

---

## Кастомизация

Можно легко кастомизировать утилитарными классами как сам контейнер, так и блок контента:
```html

<c-tooltip class="w-[140px] r-4 bg-blue">
  <template #activator="{ on, activator }">
    <c-btn 
      v-bind="activator" 
      v-on="on"
    >
      Fixed
    </c-btn>
  </template>

  Фиксированная ширина
</c-tooltip>
```

---

## Слоты

### activator

| prop        | тип      |
|-------------|----------|
| `on`        | События  |
| `activator` | Атрибуты |

### default

Контент tooltip.

---

## Примеры

### Иконка

```vue

<template>
  <c-tooltip 
    top 
    open-on-hover
    close-on-leave
  >
    <template #activator="{ on, activator }">
      <c-icon 
        v-bind="activator" 
        v-on="on" 
        style="cursor: help;"
        name="info"
      />
    </template>

    Подсказка
  </c-tooltip>
</template>
```

---

## Структура DOM

```html

<div class="c-menu">
  <div class="c-menu__content">
    <div class="c-tooltip">
      <!-- slot -->
    </div>
  </div>
</div>
```
---

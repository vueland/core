# CSelectControl

`CSelectControl` — это низкоуровневый headless-компонент управления состоянием выбора.

Он инкапсулирует всю логику:
- одиночного выбора
- множественного выбора (array mode)
- boolean toggle режима

И отдает управление рендерингом через slot.

> ⚠️ Компонент НЕ имеет собственной разметки — только логика.

---

## Базовое использование

```html
<c-select-control
  v-model="value"
  :value="'apple'"
>
  <template #default="{ checked, toggle }">
    <button @click="toggle">
      {{ checked ? 'Selected' : 'Not selected' }}
    </button>
  </template>
</c-select-control>
```

---

## Назначение

Компонент используется как **ядро для контролов выбора**:

- checkbox
- radio
- select option
- list item selection
- toggle элементы

Позволяет:
- унифицировать логику
- убрать дублирование
- реализовать headless API

---

## Состав компонентов

Компонент не имеет вложенных частей.

---

## Примеры

### Одиночный выбор

```html
<c-select-control
  v-model="selected"
  :value="'banana'"
>
  <template #default="{ checked, toggle }">
    <div @click="toggle">
      {{ checked ? '✔' : '' }} Banana
    </div>
  </template>
</c-select-control>
```

---

### Множественный выбор

```html
<c-select-control
  v-model="selectedList"
  :value="'apple'"
>
  <template #default="{ checked, toggle }">
    <div @click="toggle">
      {{ checked ? '✔' : '' }} Apple
    </div>
  </template>
</c-select-control>
```

---

### Boolean режим (как checkbox)

```html
<c-select-control v-model="checked">
  <template #default="{ checked, toggle }">
    <input
      type="checkbox"
      :checked="checked"
      @change="toggle"
    />
  </template>
</c-select-control>
```

---

### Disabled / Readonly

```html
<c-select-control
  v-model="value"
  :value="'x'"
  disabled
>
  <template #default="{ checked, toggle, disabled }">
    <button :disabled="disabled" @click="toggle">
      Disabled
    </button>
  </template>
</c-select-control>
```

---

## Props

| Prop        | Тип                  | По умолчанию | Описание |
|------------|---------------------|-------------|---------|
| `modelValue` |`T \| T[] \| boolean` | —           | текущее значение |
| `value`      | `T`                  | —           | значение элемента |
| `multiple`   | `boolean`            | `false`       | (не используется напрямую, определяется по массиву) |
| `focused`    | `boolean`            | `false`       | состояние фокуса |
| `disabled`   | `boolean`            | `false`       | блокирует взаимодействие |
| `readonly`   | `boolean`            | `false`       | запрещает изменение |
| `name`       | `string`             | —           | имя контрола |

---

## Slots

### default

Передает API для управления:

| Prop     | Тип        | Описание |
|----------|-----------|---------|
| `checked`  | `boolean`   | выбран ли элемент |
| `disabled` | `boolean`   | состояние disabled |
| `readonly` | `boolean`   | состояние readonly |
| `toggle`   | `() => void`| переключение состояния |

---

## Events

Компонент использует `v-model` (modelValue).

События:
- update:modelValue

---

## CSS классы

Нет встроенных классов.

---

## CSS переменные

Нет.

---

## DOM структура

Компонент не рендерит DOM:

    <slot />

---

## Особенности

### 1. Авто-определение режима

Компонент сам определяет режим:

- `Array` → multiple select
- `value` задан → single select
- `value` отсутствует → boolean toggle

---

### 2. Headless архитектура

Компонент:
- не знает про UI
- не навязывает структуру
- полностью контролируется через slot

---

## Рекомендации

- Использовать как основу для:
  - `CCheckbox`
  - `CRadio`
  - `CSwitch`

- Всегда прокидывать `value`, если это не boolean режим

---

## Пример полного использования

```vue
<script setup lang="ts">
  const selected = ref<string[]>([])
</script>

<template>
  <c-select-control
    v-for="item in ['apple', 'banana', 'orange']"
    :key="item"
    v-model="selected"
    :value="item"
  >
    <template #default="{ checked, toggle }">
      <div
        @click="toggle"
        style="cursor: pointer"
      >
        <span>{{ checked ? '✔' : '○' }}</span>
        {{ item }}
      </div>
    </template>
  </c-select-control>
</template>

```

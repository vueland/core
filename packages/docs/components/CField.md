# CField

`CField` — низкоуровневый компонент поля ввода, который рендерит нативный `<input>` или `<textarea>`.

Поддерживает `v-model`, управляемый фокус и CSS-состояния (`focused`, `filled`).  
Используется как базовый слой для построения более сложных компонентов формы.

---

## Базовое использование

```vue

<script setup lang="ts">
  import { ref } from 'vue'

  const value = ref('')
</script>

<template>
  <c-field v-model="value"/>
</template>
```

---

## Назначение

- Базовый input для UI-библиотеки
- Унификация `input` и `textarea`
- Контроль состояний через CSS
- Минимальная логика без лишнего оверхеда
- Основа для более сложных компонентов (`CInput`, `CTextarea`)

---

## Состав компонентов

Компонент не содержит вложенных компонентов.

Рендерит:

- `input`
- `textarea`

---

## Примеры

### Input по умолчанию

```vue

<script setup lang="ts">
  import { ref } from 'vue'

  const model = ref('')
</script>

<template>
  <c-field v-model="model"/>
</template>
```

### Textarea

```vue

<script setup lang="ts">
  import { ref } from 'vue'

  const text = ref('')
</script>

<template>
  <c-field
    v-model="text"
    tag="textarea"
  />
</template>
```

### Управляемый фокус

```vue
<script setup lang="ts">
  import { ref } from 'vue'

  const value = ref('')
  const focused = ref(true)
</script>

<template>
  <c-field
    v-model="value"
    :focused="focused"
  />
</template>
```

### Динамический tag
```vue
<script setup lang="ts">
  import { ref } from 'vue'

  const multiline = ref(false)
  const value = ref('')
</script>

<template>
  <c-field
    v-model="value"
    :tag="multiline ? 'textarea' : 'input'"
  />
</template>
```

---

## Props

| Prop      | Type                    | Default   | Описание                    |
|-----------|-------------------------|-----------|-----------------------------|
| `tag`     | `'input' \| 'textarea'` | `'input'` | Тип рендеримого элемента    |
| `focused` | `boolean`               | `false`   | Управляет состоянием фокуса |

---

## Slots
Компонент не поддерживает слоты.

---

## Events
| Event               | Payload                         | Описание            |
|---------------------|---------------------------------|---------------------|
| `update:modelValue` | `string \| number \| undefined` | Обновление значения |

---

## CSS классы

| Класс              | Описание                                    |
|--------------------|---------------------------------------------|
| `c-field`          | Базовый класс                               |
| `c-field--focused` | Активен при `focused=true`                  |
| `c-field--filled`  | Активен если есть значение и `focused=true` |

---

## CSS переменные

| Переменная        | Значение  | Описание           |
|-------------------|-----------|--------------------|
| `--field-padding` | `4px 8px` | Внутренние отступы |

---

## DOM структура

```html
<input class="c-field c-field--focused c-field--filled" />
```

или

```html
<textarea class="c-field"></textarea>
```

---

## Особенности

- Использует `defineModel`
- Работает через `value + input`, без `v-model` внутри
- Фокус контролируется извне
- CSS управляет placeholder (через opacity)
- Минимальный runtime

---

## Рекомендации

- Использовать как базовый слой
- Не добавлять бизнес-логику
- Оборачивать в более высокоуровневые компоненты
- Управлять состоянием через composables

---

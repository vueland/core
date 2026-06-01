<script>
import BaseExamples from './examples/CInput/BaseExamples.vue'

export default {
  components: {
    BaseExamples,
  }
}
</script>

# CInput

`CInput` - headless компонент для построения полей ввода с полной
кастомизацией через слоты.

Он отвечает за:

- управление состоянием (`focused`, `dirty`, `hasValue`)
- валидацию (`rules`, `validateOn`)
- интеграцию с формой
- проброс API в слот `field`

Сам компонент **не рендерит input**, а только управляет логикой.

---

## Базовое использование

```html

<script setup lang="ts">
  import {ref} from 'vue'

  const value = ref('')
</script>
<c-input v-model="value">
  <template #field="{ onInput, onFocus, onBlur }">
    <c-field
      :value="value"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />
  </template>
</c-input>
```

<base-examples/>

---

## Label

### Через проп

```html

<c-input
  v-model="value"
  label="Email"
>
  <template #field="{ onInput }">
    <input @input="onInput"/>
  </template>
</c-input>
```

### Через слот

```html

<c-input v-model="value">
  <template #label>
    <span class="text-primary">Custom label</span>
  </template>

  <template #field="{ onInput }">
    <input @input="onInput"/>
  </template>
</c-input>
```

------------------------------------------------------------------------

## Prepend / Append

```html

<c-input v-model="value">
  <template #prepend>
    <c-icon name="search"/>
  </template>

  <template #field="{ onInput }">
    <input @input="onInput"/>
  </template>

  <template #append>
    <c-btn>Поиск</c-btn>
  </template>
</c-input>
```

---

## Details (подсказки / ошибки)

### Через проп

```html

<c-input
  v-model="value"
  details="Helper text"
>
  <template #field="{ onInput }">
    <input @input="onInput"/>
  </template>
</c-input>
```

### Через слот

```html

<c-input v-model="value">
  <template #field="{ onInput }">
    <input @input="onInput"/>
  </template>

  <template #details="{ hasError, errorMessage }">
    <span v-if="hasError" class="text-red">
      {{ errorMessage }}
    </span>
  </template>
</c-input>
```

---

## Валидация

```html

<script setup lang="ts">
  import {ref} from 'vue'

  const value = ref('')

  const rules = [
    v => ({valid: !!v, message: 'Required field'}),
    v => ({valid: v.length >= 3, message: 'Min 3 chars'}),
  ]
</script>
<template>
  <c-form v-slot="{validate}">
    <c-input
      v-model="value"
      :rules="rules"
    >
      <template #field="{ onInput, onBlur }">
        <c-field
          v-model="value"
          @input="onInput"
          @blur="onBlur"
        />
      </template>
    </c-input>
    <c-btn @click="validate">Отправить</c-btn>
  </c-form>
</template>
```

---

## validateOn

```html

<c-input
  v-model="value"
  :rules="rules"
  validate-on="blur"
>
  <template #field="{ onInput, onBlur }">
    <input
      :value="value"
      @input="e => { value = e.target.value; onInput() }"
      @blur="onBlur"
    />
  </template>
</c-input>
```

---

## Отключение details

```html

<c-input
  v-model="value"
  no-details
>
  <template #field="{ onInput }">
    <c-field @input="onInput"/>
  </template>
</c-input>
```

---

## Props

| Name       | Type                                       | Default     | Description                          |
|------------|--------------------------------------------|-------------|--------------------------------------|
| modelValue | `any`                                      | —           | Значение поля (v-model)              |
| rules      | `ValidateFn[]`                             | `undefined` | Массив функций валидации             |
| validateOn | `'input' \| 'blur'`                        | `'input'`   | Когда запускать валидацию            |
| label      | `string`                                   | `undefined` | Текст label                          |
| details    | `string`                                   | `undefined` | Текст под полем                      |
| focused    | `boolean`                                  | `undefined` | Принудительное состояние фокуса      |
| disabled   | `boolean`                                  | `false`*    | Отключает поле (визуально/логически) |
| readonly   | `boolean`                                  | `false`*    | Только для чтения                    |
| noDetails  | `boolean`                                  | `false`     | Скрывает блок details                |
| options    | `{ bgColor?: string; textColor?: string }` | `undefined` | Опции внешнего вида                  |

> \* `disabled` и `readonly` пробрасываются в классы, но реальное поведение зависит от реализации `field` слота.
---

## Slots

### field

Слот для проброса полей. Содержит следующие пропсы:

```ts
{
  onInput(): void 
  onFocus(): void
  onBlur(): void
  validate(): boolean
  focused: boolean
  hasError: boolean
  errorMessage?: string
}
```

### label

Слот для проброса лейбла инпута

### prepend

Слот для проброса префиксного элемента до поля ввода

### append

Слот для проброса суфиксного элемента после поля ввода

### details

Слот для проброса текста подсказки под полем ввода. Содержит следующие пропсы

```ts
{
  hasError: boolean
  errorMessage?: string
}
```

---

## Expose API

```ts
{
  validate(): boolean
  onFocus(): void
  onBlur(): void
  onInput(): void
}
```

---

## CSS переменные

| Name                          | Value                           | Description                    |
|-------------------------------|---------------------------------|--------------------------------|
| `--input-field-height`        | `#{$input-field-height}`        | Высота поля ввода              |
| `--input-hints-height`        | `#{$input-hints-height}`        | Высота области подсказок       |
| `--input-field-border-radius` | `#{$input-field-border-radius}` | Радиус скругления границы поля |
| `--input-field-border-color`  | `#{$input-field-border-color}`  | Цвет границы поля ввода        |
| `--input-field-text-color`    | `var(--global-text-color)`      | Цвет текста поля ввода         |
| `--input-details-height`      | `#{$input-details-height}`      | Высота области деталей         |
| `--input-error-color`         | `var(--global-error-color)`     | Цвет ошибки                    |
| `--input-primary-color`       | `var(--global-primary-color)`   | Основной цвет                  |
| `--input-prepend-width`       | `#{$input-field-height}`        | Ширина префиксного элемента    |
| `--input-append-width`        | `#{$input-field-height}`        | Ширина суффиксного элемента    |
| `--input-background-color`    | `var(--global-base-color)`      | Цвет фона                      |
| `--input-label-padding-x`     | `4px`                           | Горизонтальный отступ метки    |
| `--input-label-left`          | `#{$input-label-left}`          | Позиция метки слева            |
| `--input-label-font-size`     | `16px`                          | Размер шрифта метки            |

---

## Архитектура

`CInput` --- headless-компонент.
Он:

- не навязывает DOM
- не ограничивает UI
- отделяет логику от отображения

Это фундамент для построения любых input-компонентов.

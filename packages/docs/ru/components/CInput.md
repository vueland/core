# CInput

`CInput` — базовый компонент для создания полей ввода во Vueland UI. Он отвечает за общий API поля: label, details, validation, состояния, ARIA, presets, prepend/append и интеграцию с формой.

`CInput` не рендерит нативный `<input>` самостоятельно. Поле передаётся через слот `field`.

## Использование

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <c-input
    v-model="value"
    label="Email"
    details="Введите email"
    type="email"
    name="email"
    autocomplete="email"
  >
    <template #field="{ uid, attrs, focused, onFocus, onBlur, onInput }">
      <input
        :id="uid"
        v-bind="attrs"
        :value="value"
        :data-focused="focused"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput($event.target.value)"
      />
    </template>

    <template #details="{ errorMessage, details }">
      {{ errorMessage || details }}
    </template>
  </c-input>
</template>
```

## Props

| Prop           | Type                |     Default | Description                                                                                                                |
|----------------|---------------------|------------:|----------------------------------------------------------------------------------------------------------------------------|
| `modelValue`   | `T`                 |         —   | Значение поля.                                                                                                             |
| `id`           | `string`            |        auto | Пользовательская часть id. Итоговый `uid` формируется как `input-${id}`. Если `id` не передан, генерируется автоматически. |
| `label`        | `string`            | `undefined` | Текст label. Если есть `label` или слот `label`, создаётся label-блок.                                                     |
| `details`      | `string`            | `undefined` | Текст подсказки/details. Передаётся в слот `details`.                                                                      |
| `noDetails`    | `boolean`           |     `false` | Отключает details-блок, включая details при ошибке.                                                                        |
| `rules`        | `ValidateFn[]`      | `undefined` | Правила валидации.                                                                                                         |
| `validateOn`   | `'input' \| 'blur'` |   `'input'` | Режим запуска валидации.                                                                                                   |
| `preset`       | `string`            | `undefined` | Путь к preset в `core.presets`, например `input.default`.                                                                  |
| `clearable`    | `boolean`           | `undefined` | Зарезервировано для компонентов, которые реализуют очистку значения.                                                       |
| `disabled`     | `boolean`           | `undefined` | Disabled-состояние поля.                                                                                                   |
| `readonly`     | `boolean`           | `undefined` | Readonly-состояние поля.                                                                                                   |
| `focused`      | `boolean`           | `undefined` | Начальное focused-состояние.                                                                                               |

### ValidateFn

```ts
export type ValidateFn = (value: any) => {
  valid: boolean
  message: string
}
```

## Events
| Event   | Payload     | Description                                                          |
|---------|-------------|----------------------------------------------------------------------|
| `focus` | `boolean`   | Вызывается после `onFocus`. Payload — текущее значение `focused`.    |
| `blur`  | `boolean`   | Вызывается после `onBlur`. Payload — текущее значение `focused`.     |
| `input` | `T`         | Вызывается при `onInput(value)` из `field` slot.                     |
| `clear` | `undefined` | Вызывается при клике по кнопке очистки, если `clearable` установлен. |

```vue
<c-input
  v-model="value"
  @focus="focused => console.log(focused)"
  @blur="focused => console.log(focused)"
  @input="value => console.log(value)"
  @clear="() => model = null"
>
  <!-- field slot -->
</c-input>
```

## Slots

### `field`

Основной слот для рендера поля.

```ts
field?(props: {
  onInput(val: T): void
  onFocus(): void
  onBlur(): void
  label?: string
  readonly?: boolean
  focused?: boolean
  disabled?: boolean
  presets?: string[] | string[][]
  errorMessage?: string
  hasError: boolean
  attrs: Record<string, any>
  uid: string
  validate(): boolean
}): VNode
```

| Slot prop      | Type                     | Description                                                   |
|----------------|--------------------------|---------------------------------------------------------------|
| `uid`          | `string`                 | Id поля. Его нужно передавать в `id` нативного input/control. |
| `attrs`        | `Record<string, any>`    | Разрешённые атрибуты для нативного поля.                      |
| `focused`      | `boolean`                | Текущее focused-состояние.                                    |
| `disabled`     | `boolean \| undefined`   | Disabled-состояние.                                           |
| `readonly`     | `boolean \| undefined`   | Readonly-состояние.                                           |
| `label`        | `string \| undefined`    | Значение `props.label`.                                       |
| `hasError`     | `boolean`                | Есть ли ошибка валидации.                                     |
| `errorMessage` | `string \| undefined`    | Текст ошибки.                                                 |
| `presets`      | `string[] \| string[][]` | Классы `preset.field`.                                        |
| `validate`     | `() => boolean`          | Ручной запуск валидации.                                      |
| `onFocus`      | `() => void`             | Обработчик focus.                                             |
| `onBlur`       | `() => void`             | Обработчик blur.                                              |
| `onInput`      | `(val: T) => void`       | Обработчик input.                                             |

```vue
<template #field="{ uid, attrs, disabled, readonly, onFocus, onBlur, onInput }">
  <input
    :id="uid"
    v-bind="attrs"
    :disabled="disabled"
    :readonly="readonly"
    @focus="onFocus"
    @blur="onBlur"
    @input="onInput($event.target.value)"
  />
</template>
```

### `label`

Кастомный label.

```ts
label?(props: { uid: string }): VNode | string
```

```vue
<template #label="{ uid }">
  <label :for="uid">Custom label</label>
</template>
```

### `details`

Контент details/error.

```ts
details?(props: {
  errorMessage?: string
  hasError: boolean
  uid: string
  details?: string
}): VNode | string
```

```vue
<template #details="{ errorMessage, details }">
  {{ errorMessage || details }}
</template>
```

### `prepend`

Контент слева от field-зоны.

```vue
<template #prepend>
  🔍
</template>
```

### `append`

Контент справа от field-зоны.

```vue
<template #append>
  ⌘K
</template>
```

## Exposed API
| Method     | Type               | Description                                                         |
|------------|--------------------|---------------------------------------------------------------------|
| `validate` | `() => boolean`    | Запускает валидацию и возвращает результат.                         |
| `onFocus`  | `() => void`       | Переводит поле в focused-состояние, если поле не disabled/readonly. |
| `onBlur`   | `() => void`       | Сбрасывает focused-состояние.                                       |
| `onInput`  | `(val: T) => void` | Эмитит событие `input`.                                             |
| `onClear`  | `() => void`       | Эмитит событие `clear`.                                             |

```vue
<script setup lang="ts">
import { ref } from 'vue'

const inputRef = ref<{ validate(): boolean }>()
</script>

<template>
  <c-input ref="inputRef" v-model="value">
    <!-- field slot -->
  </c-input>

  <button @click="inputRef?.validate()">
    Validate
  </button>
</template>
```

## Attrs

`CInput` принимает HTML-атрибуты через `$attrs`, фильтрует их и передаёт в `field` slot как `attrs`.

Разрешённые field attrs:

| Attribute | Description |
|---|---|
| `type` | Тип input. |
| `name` | Имя поля. |
| `placeholder` | Placeholder. |
| `autocomplete` | Autocomplete. |
| `autofocus` | Autofocus. |
| `inputmode` | Input mode. |
| `pattern` | Pattern. |
| `min` | Min value. |
| `max` | Max value. |
| `step` | Step. |
| `minlength` | Minimum length. |
| `maxlength` | Maximum length. |
| `readonly` | Native readonly. |
| `disabled` | Native disabled. |
| `required` | Required. |
| `tabindex` | Tab index. |
| `enterkeyhint` | Enter key hint. |
| `aria-*` | Любые ARIA-атрибуты. |
| `data-*` | Любые data-атрибуты. |

`id` не передаётся через `attrs`, потому что `CInput` управляет id самостоятельно.

`class` добавляется на root `.c-input`, но не попадает в `field attrs`.

## Validation

```vue
<script setup lang="ts">
const required = (value: string) => ({
  valid: !!value,
  message: 'Поле обязательно',
})
</script>

<template>
  <c-input
    v-model="value"
    label="Name"
    :rules="[required]"
  >
    <template #field="{ uid, attrs, onInput, onFocus, onBlur }">
      <input
        :id="uid"
        v-bind="attrs"
        :value="value"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput($event.target.value)"
      />
    </template>

    <template #details="{ errorMessage, details }">
      {{ errorMessage || details }}
    </template>
  </c-input>
</template>
```

При ошибке:

| Result | Description |
|---|---|
| `hasError` | Передаётся в `field` и `details` slots. |
| `errorMessage` | Передаётся в `field` и `details` slots. |
| `c-input--has-error` | Добавляется на root. |
| `aria-invalid="true"` | Добавляется в `attrs`. |
| `aria-errormessage` | Добавляется, если есть `errorMessage` и details-блок. |

## Accessibility

| Attribute | When | Value |
|---|---|---|
| `aria-labelledby` | Есть label | `${uid}-label` |
| `aria-describedby` | Есть details-блок | `${uid}-details` |
| `aria-invalid` | Есть ошибка | `true` |
| `aria-errormessage` | Есть ошибка, `errorMessage` и details-блок | `${uid}-details` |
| `aria-readonly` | `readonly=true` | `true` |
| `aria-disabled` | `disabled=true` | `true` |

Если `noDetails=true`, `aria-describedby` и `aria-errormessage` не добавляются.

Если ошибка есть, но `errorMessage` пустой, добавляется только `aria-invalid="true"`.

## State classes

| Class | When |
|---|---|
| `c-input` | Root class. |
| `c-input--default` | Нет ошибки. |
| `c-input--has-error` | Есть ошибка. |
| `c-input--focused` | Поле сфокусировано. |
| `c-input--disabled` | `disabled=true`. |
| `c-input--readonly` | `readonly=true`. |
| `c-input--has-value` | Значение не пустое. |
| `c-input--has-prepend` | Есть слот `prepend`. |
| `c-input--has-append` | Есть слот `append`. |

## CSS variables

| Variable | Default | Description |
|---|---|---|
| `--c-input-field-height` | `40px` | Высота field-зоны. |
| `--c-input-field-border-radius` | `var(--c-app-border-radius)` | Радиус border field-зоны. |
| `--c-input-field-border-color` | `#e5e5e5` | Цвет border field-зоны. |
| `--c-input-field-text-color` | `var(--c-app-text-color)` | Цвет текста поля. |
| `--c-input-details-height` | `24px` | Высота details-зоны. |
| `--c-input-error-color` | `var(--c-app-error-color)` | Цвет ошибки. |
| `--c-input-primary-color` | `var(--c-app-primary-color)` | Основной цвет. |
| `--c-input-prepend-width` | `40px` | Ширина prepend-зоны. |
| `--c-input-append-width` | `40px` | Ширина append-зоны. |
| `--c-input-background-color` | `var(--c-app-base-color)` | Цвет фона. |
| `--c-input-label-padding-x` | `4px` | Горизонтальный padding label. |
| `--c-input-label-left` | `5px` | Смещение label слева. |
| `--c-input-label-font-size` | `16px` | Размер шрифта label. |

```scss
.my-input {
  --c-input-field-height: 48px;
  --c-input-field-border-radius: 12px;
  --c-input-prepend-width: 48px;
  --c-input-append-width: 48px;
}
```

## Presets

`preset` — строковый путь к preset-объекту в `core.presets`.

```vue
<c-input
  v-model="value"
  preset="input.default"
/>
```

Пример preset:

```ts
const inputPreset = {
  root: ['input-root'],
  field: ['input-field'],
  input: ['input-native'],
  label: ['input-label'],
  details: ['input-details'],
  prepend: ['input-prepend'],
  append: ['input-append'],

  focused: {
    root: ['input-root--focused'],
    field: ['input-field--focused'],
    label: ['input-label--focused'],
    append: ['input-append--focused'],
  },

  error: {
    root: ['input-root--error'],
    field: ['input-field--error'],
    input: ['input-native--error'],
    label: ['input-label--error'],
    details: ['input-details--error'],
  },

  disabled: {
    root: ['input-root--disabled'],
    field: ['input-field--disabled'],
    input: ['input-native--disabled'],
    label: ['input-label--disabled'],
  },

  readonly: {
    root: ['input-root--readonly'],
    field: ['input-field--readonly'],
    input: ['input-native--readonly'],
  },

  hasValue: {
    root: ['input-root--has-value'],
    label: ['input-label--has-value'],
  },

  hasPrepend: {
    root: ['input-root--has-prepend'],
    field: ['input-field--has-prepend'],
    input: ['input-native--has-prepend'],
    label: ['input-label--has-prepend'],
    prepend: ['input-prepend--active'],
  },

  hasAppend: {
    root: ['input-root--has-append'],
    field: ['input-field--has-append'],
    input: ['input-native--has-append'],
    append: ['input-append--active'],
  },
}
```

### Preset zones

| Zone | Applied to |
|---|---|
| `root` | `.c-input` |
| `field` | `.c-input__field` and `field` slot prop `presets` |
| `input` | Calculated for field implementations. Not applied by `CInput` directly. |
| `label` | `.c-input__label` |
| `details` | `.c-input__details` |
| `prepend` | `.c-input__prepend` |
| `append` | `.c-input__append` |

## Component wrappers

### CTextField

```vue
<template>
  <c-input
    v-model="model"
    v-bind="$attrs"
  >
    <template #field="{ onFocus, onInput, onBlur, focused, presets, attrs, uid }">
      <div
        class="c-text-field"
        :class="presets"
      >
        <c-field
          :id="uid"
          v-model="model"
          class="c-text-field__input"
          :focused="focused"
          v-bind="attrs"
          @focus="onFocus"
          @input="onInput"
          @blur="onBlur"
        />
      </div>
    </template>

    <template #details="{ errorMessage, details }">
    <span class="c-text-field__details">
      {{ errorMessage || details }}
    </span>
    </template>
  </c-input>
</template>
```

### CSelect / CAutocomplete

`CSelect` и `CAutocomplete` используют `CInput` как оболочку для label/details/validation/ARIA, а field-зона строится через `CField`, `CMenu` и `CItems`.

Они прокидывают `$attrs` в `CInput`, поэтому нативные атрибуты вроде `placeholder`, `name`, `required`, `data-*`, `aria-*` не дублируются в props этих компонентов.

# CInput

`CInput` is the base component for building input-like controls in Vueland UI. It provides the shared field API: label, details, validation, state classes, ARIA, presets, prepend/append areas, and form integration.

`CInput` does not render a native `<input>` by itself. The actual control is rendered through the `field` slot.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <c-input
    v-model="value"
    label="Email"
    details="Enter an email"
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

| Prop          | Type                |      Default | Description                                                                                                 |
|---------------|---------------------|-------------:|-------------------------------------------------------------------------------------------------------------|
| `modelValue`  | `T`                 |            — | Field value.                                                                                                |
| `id`          | `string`            |         auto | User-defined id part. Final `uid` is generated as `input-${id}`. If omitted, it is generated automatically. |
| `label`       | `string`            |  `undefined` | Label text. A label block is rendered when `label` or the `label` slot exists.                              |
| `details`     | `string`            | `undefined`  | Helper/details text. Passed to the `details` slot.                                                          |
| `noDetails`   | `boolean`           |      `false` | Disables the details block, including error details.                                                        |
| `rules`       | `ValidateFn[]`      |  `undefined` | Validation rules.                                                                                           |
| `validateOn`  | `'input' \| 'blur'` |    `'input'` | Validation trigger mode.                                                                                    |
| `preset`      | `string`            |  `undefined` | Preset path in `core.presets`, for example `input.default`.                                                 |
| `clearable`   | `boolean`           |  `undefined` | Reserved for controls that implement clearing.                                                              |
| `disabled`    | `boolean`           |  `undefined` | Disabled state.                                                                                             |
| `readonly`    | `boolean`           |  `undefined` | Readonly state.                                                                                             |
| `focused`     | `boolean`           |  `undefined` | Initial focused state.                                                                                      |

### ValidateFn

```ts
export type ValidateFn = (value: any) => {
  valid: boolean
  message: string
}
```

## Events

| Event   | Payload     | Description                                                        |
|---------|-------------|--------------------------------------------------------------------|
| `focus` | `boolean`   | Emitted after `onFocus`. Payload is the current `focused` value.   |
| `blur`  | `boolean`   | Emitted after `onBlur`. Payload is the current `focused` value.    |
| `input` | `T`         | Emitted when `onInput(value)` is called from the `field` slot.     |
| `clear` | `undefined` | Emitted when the clear action is triggered and `clearable` is set. |
```vue
<c-input
  v-model="value"
  @focus="focused => console.log(focused)"
  @blur="focused => console.log(focused)"
  @input="value => console.log(value)"
>
  <!-- field slot -->
</c-input>
```

## Slots

### `field`

Main slot for rendering the actual control.

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

| Slot prop      | Type                     | Description                                                 |
|----------------|--------------------------|-------------------------------------------------------------|
| `uid`          | `string`                 | Field id. It should be applied to the native input/control. |
| `attrs`        | `Record<string, any>`    | Allowed attributes for the native field.                    |
| `focused`      | `boolean`                | Current focused state.                                      |
| `disabled`     | `boolean \| undefined`   | Disabled state.                                             |
| `readonly`     | `boolean \| undefined`   | Readonly state.                                             |
| `label`        | `string \| undefined`    | `props.label` value.                                        |
| `hasError`     | `boolean`                | Validation error state.                                     |
| `errorMessage` | `string \| undefined`    | Validation error message.                                   |
| `presets`      | `string[] \| string[][]` | `preset.field` classes.                                     |
| `validate`     | `() => boolean`          | Manually runs validation.                                   |
| `onFocus`      | `() => void`             | Focus handler.                                              |
| `onBlur`       | `() => void`             | Blur handler.                                               |
| `onInput`      | `(val: T) => void`       | Input handler.                                              |

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

Custom label.

```ts
label?(props: { uid: string }): VNode | string
```

```vue
<template #label="{ uid }">
  <label :for="uid">Custom label</label>
</template>
```

### `details`

Details/error content.

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

Content before the field area.

```vue
<template #prepend>
  🔍
</template>
```

### `append`

Content after the field area.

```vue
<template #append>
  ⌘K
</template>
```

## Exposed API
| Method     | Type               | Description                                               |
|------------|--------------------|-----------------------------------------------------------|
| `validate` | `() => boolean`    | Runs validation and returns the result.                   |
| `onFocus`  | `() => void`       | Sets focused state if the field is not disabled/readonly. |
| `onBlur`   | `() => void`       | Resets focused state.                                     |
| `onInput`  | `(val: T) => void` | Emits the `input` event.                                  |
| `onClear`  | `() => void`       | Emits the `clear` event.                                  |

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

`CInput` receives HTML attributes through `$attrs`, filters them, and passes them to the `field` slot as `attrs`.

Allowed field attrs:

| Attribute      | Description         |
|----------------|---------------------|
| `type`         | Input type.         |
| `name`         | Field name.         |
| `placeholder`  | Placeholder.        |
| `autocomplete` | Autocomplete.       |
| `autofocus`    | Autofocus.          |
| `inputmode`    | Input mode.         |
| `pattern`      | Pattern.            |
| `min`          | Min value.          |
| `max`          | Max value.          |
| `step`         | Step.               |
| `minlength`    | Minimum length.     |
| `maxlength`    | Maximum length.     |
| `readonly`     | Native readonly.    |
| `disabled`     | Native disabled.    |
| `required`     | Required.           |
| `tabindex`     | Tab index.          |
| `enterkeyhint` | Enter key hint.     |
| `aria-*`       | Any ARIA attribute. |
| `data-*`       | Any data attribute. |

`id` is not forwarded through `attrs` because `CInput` manages ids itself.

`class` is applied to the root `.c-input`, but it is not included in `field attrs`.

## Validation

```vue
<script setup lang="ts">
const required = (value: string) => ({
  valid: !!value,
  message: 'Required field',
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

When validation fails:

| Result                | Description                                        |
|-----------------------|----------------------------------------------------|
| `hasError`            | Passed to `field` and `details` slots.             |
| `errorMessage`        | Passed to `field` and `details` slots.             |
| `c-input--has-error`  | Added to root.                                     |
| `aria-invalid="true"` | Added to `attrs`.                                  |
| `aria-errormessage`   | Added when `errorMessage` and details block exist. |

## Accessibility

| Attribute           | When                                           | Value            |
|---------------------|------------------------------------------------|------------------|
| `aria-labelledby`   | Label exists                                   | `${uid}-label`   |
| `aria-describedby`  | Details block exists                           | `${uid}-details` |
| `aria-invalid`      | Validation error exists                        | `true`           |
| `aria-errormessage` | Error, `errorMessage`, and details block exist | `${uid}-details` |
| `aria-readonly`     | `readonly=true`                                | `true`           |
| `aria-disabled`     | `disabled=true`                                | `true`           |

If `noDetails=true`, `aria-describedby` and `aria-errormessage` are not added.

If an error exists but `errorMessage` is empty, only `aria-invalid="true"` is added.

## State classes

| Class                  | When                     |
|------------------------|--------------------------|
| `c-input`              | Root class.              |
| `c-input--default`     | No validation error.     |
| `c-input--has-error`   | Validation error exists. |
| `c-input--focused`     | Field is focused.        |
| `c-input--disabled`    | `disabled=true`.         |
| `c-input--readonly`    | `readonly=true`.         |
| `c-input--has-value`   | Value is not empty.      |
| `c-input--has-prepend` | `prepend` slot exists.   |
| `c-input--has-append`  | `append` slot exists.    |

## CSS variables

| Variable                        | Default                      | Description               |
|---------------------------------|------------------------------|---------------------------|
| `--c-input-field-height`        | `40px`                       | Field area height.        |
| `--c-input-field-border-radius` | `var(--c-app-border-radius)` | Field border radius.      |
| `--c-input-field-border-color`  | `#e5e5e5`                    | Field border color.       |
| `--c-input-field-text-color`    | `var(--c-app-text-color)`    | Field text color.         |
| `--c-input-details-height`      | `24px`                       | Details area height.      |
| `--c-input-error-color`         | `var(--c-app-error-color)`   | Error color.              |
| `--c-input-primary-color`       | `var(--c-app-primary-color)` | Primary color.            |
| `--c-input-prepend-width`       | `40px`                       | Prepend area width.       |
| `--c-input-append-width`        | `40px`                       | Append area width.        |
| `--c-input-background-color`    | `var(--c-app-base-color)`    | Background color.         |
| `--c-input-label-padding-x`     | `4px`                        | Horizontal label padding. |
| `--c-input-label-left`          | `5px`                        | Label left offset.        |
| `--c-input-label-font-size`     | `16px`                       | Label font size.          |

```scss
.my-input {
  --c-input-field-height: 48px;
  --c-input-field-border-radius: 12px;
  --c-input-prepend-width: 48px;
  --c-input-append-width: 48px;
}
```

## Presets

`preset` is a string path to a preset object in `core.presets`.

```vue
<c-input
  v-model="value"
  preset="input.default"
/>
```

Preset example:

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

| Zone      | Applied to                                                              |
|-----------|-------------------------------------------------------------------------|
| `root`    | `.c-input`                                                              |
| `field`   | `.c-input__field` and `field` slot prop `presets`                       |
| `input`   | Calculated for field implementations. Not applied by `CInput` directly. |
| `label`   | `.c-input__label`                                                       |
| `details` | `.c-input__details`                                                     |
| `prepend` | `.c-input__prepend`                                                     |
| `append`  | `.c-input__append`                                                      |

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

`CSelect` and `CAutocomplete` use `CInput` as a wrapper for label/details/validation/ARIA, while the field area is built with `CField`, `CMenu`, and `CItems`.

They pass `$attrs` to `CInput`, so native attributes like `placeholder`, `name`, `required`, `data-*`, and `aria-*` are not duplicated as props.

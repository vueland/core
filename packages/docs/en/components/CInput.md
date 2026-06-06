# CInput

`CInput` — a headless component for building input fields with full slot-based customization.

It is responsible for:

- state management (`focused`, `dirty`, `hasValue`);
- validation (`rules`, `validateOn`);
- form integration;
- passing API to the `field`.

The component **does not render an input** by itself; it only manages the logic.

## Basic usage

```html
<c-input v-model="value" label="Email">
  <template #field="field">
    <c-field v-bind="field" />
  </template>
</c-input>
```

## Label

Using a prop:

```html
<c-input label="Email" />
```

Using a slot:

```html
<c-input>
  <template #label>Custom label</template>
</c-input>
```

## Prepend / Append

```html
<c-input label="Search">
  <template #prepend>🔍</template>
  <template #append>⌘K</template>
</c-input>
```

## Details

Using a prop:

```html
<c-input details="Enter an email" />
```

Using a slot:

```html
<c-input>
  <template #details="{ errorMessage }">
    {{ errorMessage }}
  </template>
</c-input>
```

## Validation

```html
<c-input
  v-model="email"
  :rules="[(value) => ({ valid: !!value, message: 'Required' })]"
/>
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | `any` | — | Field value (`v-model`) |
| `rules` | `ValidateFn[]` | `undefined` | Validation function array |
| `validateOn` | `'input' \| 'blur'` | `'input'` | Когда запускать validation |
| `label` | `string` | `undefined` | Текст label |
| `details` | `string` | `undefined` | Text below the field |
| `focused` | `boolean` | `undefined` | Forced focus state |
| `disabled` | `boolean` | `false` | Disables the field |
| `readonly` | `boolean` | `false` | Read-only |
| `noDetails` | `boolean` | `false` | Hides the details block |
| `options` | `{ bgColor?: string; textColor?: string }` | `undefined` | Appearance options |

## Slots

### field

Input field slot. Receives the following API:

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

Slot for the field label.

### prepend / append

Slots for elements before and after the input field.

### details

Slot for hint or error content below the field.

## Expose API

```ts
{
  validate(): boolean
  onFocus(): void
  onBlur(): void
  onInput(): void
}
```

## Architecture

`CInput` — headless-компонент: it does not impose DOM structure, does not restrict UI, and separates logic from rendering.

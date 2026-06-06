# CInput

`CInput` — headless-компонент для построения полей ввода с полной кастомизацией через слоты.

Он отвечает за:

- управление состоянием (`focused`, `dirty`, `hasValue`);
- валидацию (`rules`, `validateOn`);
- интеграцию с формой;
- проброс API в слот `field`.

Сам компонент **не рендерит input**, а только управляет логикой.

## Базовое использование

```html
<c-input v-model="value" label="Email">
  <template #field="field">
    <c-field v-bind="field" />
  </template>
</c-input>
```

## Label

Через prop:

```html
<c-input label="Email" />
```

Через слот:

```html
<c-input>
  <template #label>Custom label</template>
</c-input>
```

## Prepend / Append

```html
<c-input label="Поиск">
  <template #prepend>🔍</template>
  <template #append>⌘K</template>
</c-input>
```

## Details

Через prop:

```html
<c-input details="Введите email" />
```

Через слот:

```html
<c-input>
  <template #details="{ errorMessage }">
    {{ errorMessage }}
  </template>
</c-input>
```

## Валидация

```html
<c-input
  v-model="email"
  :rules="[(value) => ({ valid: !!value, message: 'Required' })]"
/>
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | `any` | — | Значение поля (`v-model`) |
| `rules` | `ValidateFn[]` | `undefined` | Массив функций валидации |
| `validateOn` | `'input' \| 'blur'` | `'input'` | Когда запускать валидацию |
| `label` | `string` | `undefined` | Текст label |
| `details` | `string` | `undefined` | Текст под полем |
| `focused` | `boolean` | `undefined` | Принудительное состояние фокуса |
| `disabled` | `boolean` | `false` | Отключает поле |
| `readonly` | `boolean` | `false` | Только для чтения |
| `noDetails` | `boolean` | `false` | Скрывает блок details |
| `options` | `{ bgColor?: string; textColor?: string }` | `undefined` | Опции внешнего вида |

## Slots

### field

Слот для поля ввода. Получает API:

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

Слот для label поля.

### prepend / append

Слоты для элементов до и после поля ввода.

### details

Слот для подсказки или ошибки под полем.

## Expose API

```ts
{
  validate(): boolean
  onFocus(): void
  onBlur(): void
  onInput(): void
}
```

## Архитектура

`CInput` — headless-компонент: он не навязывает DOM, не ограничивает UI и отделяет логику от отображения.

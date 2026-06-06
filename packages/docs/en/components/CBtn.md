# CBtn

`CBtn` is the base button component of Vueland UI. It is used for user actions such as confirmation, form submission and operation triggers.

## Features

- visual variants: `flat` and `outline`;
- block mode with `block`;
- sizing through CSS variables and utility classes;
- native button event support.

## Basic usage

```vue
<c-btn>Save</c-btn>
<c-btn variant="outline">Cancel</c-btn>
<c-btn block>Continue</c-btn>
```

## Variants

```vue
<c-btn variant="flat">Flat</c-btn>
<c-btn variant="outline">Outline</c-btn>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'flat' \| 'outline'` | `flat` | Visual variant |
| `block` | `boolean` | `false` | Makes the button 100% wide |

## Events

Native button events are supported.

```vue
<c-btn @click="save">Click</c-btn>
```

## Slots

| Slot | Description |
| --- | --- |
| `default` | Button content |

## CSS classes

| Class | Description |
| --- | --- |
| `c-btn` | Base class |
| `c-btn--flat` | Flat variant |
| `c-btn--outlined` | Outline variant |
| `c-btn--block` | Block button |

## CSS Variables

| Variable | Default | Description |
| --- | --- | --- |
| `--btn-text-color` | `#ffffff` | Text color |
| `--btn-border-radius` | `var(--global-border-radius)` | Border radius |
| `--btn-bg-color` | `var(--global-primary-color)` | Background |
| `--btn-paddings` | `0 12px` | Padding |
| `--btn-min-width` | `80px` | Minimum width |
| `--btn-width` | `auto` | Width |
| `--btn-min-height` | `32px` | Minimum height |
| `--btn-height` | `auto` | Height |
| `--btn-font-size` | `16px` | Font size |

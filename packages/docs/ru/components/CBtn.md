# CBtn

`CBtn` — базовый компонент кнопки библиотеки Vueland UI. Используется для пользовательских действий: подтверждение, отправка формы, запуск операций.

## Возможности

- визуальные варианты `flat` и `outline`;
- блочный режим через `block`;
- управление размерами через CSS-переменные и utility-классы;
- поддержка нативных событий кнопки.

## Базовое использование

```vue
<c-btn>Сохранить</c-btn>
<c-btn variant="outline">Отмена</c-btn>
<c-btn block>Продолжить</c-btn>
```

## Варианты

```vue
<c-btn variant="flat">Flat</c-btn>
<c-btn variant="outline">Outline</c-btn>
```

## Props

| Prop | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `variant` | `'flat' \| 'outline'` | `flat` | Визуальный вариант |
| `block` | `boolean` | `false` | Делает кнопку шириной 100% |

## Events

Поддерживаются нативные события кнопки.

```vue
<c-btn @click="save">Нажать</c-btn>
```

## Slots

| Slot | Описание |
| --- | --- |
| `default` | Содержимое кнопки |

## CSS классы

| Класс | Описание |
| --- | --- |
| `c-btn` | Базовый класс |
| `c-btn--flat` | Flat-вариант |
| `c-btn--outlined` | Outline-вариант |
| `c-btn--block` | Блочная кнопка |

## CSS Variables

| Переменная | По умолчанию | Описание |
| --- | --- | --- |
| `--btn-text-color` | `#ffffff` | Цвет текста |
| `--btn-border-radius` | `var(--global-border-radius)` | Радиус |
| `--btn-bg-color` | `var(--global-primary-color)` | Фон |
| `--btn-paddings` | `0 12px` | Внутренние отступы |
| `--btn-min-width` | `80px` | Минимальная ширина |
| `--btn-width` | `auto` | Ширина |
| `--btn-min-height` | `32px` | Минимальная высота |
| `--btn-height` | `auto` | Высота |
| `--btn-font-size` | `16px` | Размер шрифта |

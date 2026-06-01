<script>
import BaseExamples from './examples/CBtn/BaseExamples.vue'
import OutlinedExamples from './examples/CBtn/OutlinedExamples.vue'
import StateExamples from './examples/CBtn/StateExamples.vue'
import SizesExamples from './examples/CBtn/SizesExamples.vue'

export default {
  components: {
    BaseExamples,
    OutlinedExamples,
    StateExamples,
    SizesExamples
  }
}
</script>

# CBtn

`CBtn` — базовый компонент кнопки библиотеки **core-ui**.

Используется для выполнения действий пользователя: подтверждение, отправка формы, запуск операций и т.д.

Компонент поддерживает:

- варианты отображения (`flat`, `outline`)
- блочный режим (`block`)
- управление размерами через `width`, `minWidth`, `height`

---

## Базовое использование

```vue

<c-btn>Сохранить</c-btn>
<c-btn class="bg-green-lighten-1">Сохранить</c-btn>
<c-btn class="bg-yellow-darken-4 text-red">Сохранить</c-btn>
<c-btn class="bg-red-lighten-1">Сохранить</c-btn>
```

<base-examples/>

---

## Варианты кнопки

### Flat (по умолчанию)

```vue

<c-btn>
  Кнопка
</c-btn>
```

### Outline

```vue
<c-btn variant="outlined">
  Outline кнопка
</c-btn>
<c-btn variant="outlined" class="text-green">
  Outline кнопка
</c-btn>
<c-btn variant="outlined" class="text-yellow">
  Outline кнопка
</c-btn>
<c-btn variant="outlined" class="text-red">
  Outline кнопка
</c-btn>
```

<outlined-examples/>

---

## Состояния

С помощью утилитарных классов псевдо модификаторов состояний можно легко
добиться нужного результата:

```html

<c-btn variant="flat" class="w-[200px] bg-blue hover:bg-blue-lighten-2">
  Hover
</c-btn>
<c-btn variant="flat" class="w-[200px] bg-green active:bg-green-darken-2">
  Active
</c-btn>
<c-btn variant="flat" class="w-[200px] bg-purple hover:bg-purple-lighten-1 active:bg-purple-darken-2">
  Hover and Active
</c-btn>
<c-btn variant="flat" class="w-[200px] bg-red" disabled>
  Disabled
</c-btn>
```

<state-examples/>

## Блочная кнопка

Позволяет кнопке занять **100% ширины контейнера**.

```vue

<c-btn block>
  Продолжить
</c-btn>

// Либо так
<c-btn class="w-100">
  Продолжить
</c-btn>
```

<sizes-examples :block="true"/>

---

### Ширина

```vue

<c-btn class="w-[200px]">
  Широкая кнопка
</c-btn>
```

<sizes-examples :width="true"/>

### Высота

```vue

<c-btn class="h-[40px]">
  Высокая кнопка
</c-btn>
```

<sizes-examples :height="true"/>

### Минимальная ширина

```vue
<c-btn class="min-w-[220px]">
  Минимальная ширина
</c-btn>
```

<sizes-examples :min-width="true"/>

---

## Props

| Prop       | Тип                   | По умолчанию | Описание                   |
|------------|-----------------------|--------------|----------------------------|
| `variant`  | `'flat' \| 'outline'` | `flat`       | Визуальный вариант кнопки  |
| `block`    | `boolean`             | `false`      | Делает кнопку шириной 100% |
---

## Events
поддерживаются все натвные события

```vue

<c-btn @click="handleClick">
  Нажать
</c-btn>
```

---

## Slots

| Slot      | Описание          |
|-----------|-------------------|
| `default` | Содержимое кнопки |

```vue

<c-btn>
  Отправить
</c-btn>
```

---

## CSS классы

Компонент генерирует следующие классы:

| Класс             | Описание             |
|-------------------|----------------------|
| `c-btn`           | Базовый класс кнопки |
| `c-btn--flat`     | Flat вариант         |
| `c-btn--outlined` | Outline вариант      |
| `c-btn--block`    | Блочная кнопка       |

---
---

## CSS Variables

Компонент `CBtn` использует CSS-переменные для настройки размеров и внешнего вида без изменения исходных стилей.

| Переменная            | По умолчанию                  | Описание                  |
|-----------------------|-------------------------------|---------------------------|
| `--btn-text-color`    | `#ffffff`                     | Цвет текста кнопки        |
| `--btn-border-radius` | `var(--global-border-radius)` | Радиус скругления         |
| `--btn-bg-color`      | `var(--global-primary-color)` | Цвет фона кнопки          |
| `--btn-paddings`      | `0 12px`                      | Внутренние отступы        |
| `--btn-min-width`     | `80px`                        | Минимальная ширина кнопки |
| `--btn-width`         | `auto`                        | Ширина кнопки             |
| `--btn-min-height`    | `32px`                        | Минимальная высота кнопки |
| `--btn-height`        | `auto`                        | Высота кнопки             |
| `--btn-font-size`     | `16px`                        | Размер шрифта             |

---

### Пример переопределения

```vue

<c-btn
  style="
        --btn-bg-color: #673ab7;
        --btn-border-radius: 12px;
        --btn-width: 200px;
        --btn-height: 40px;
    "
>
  Кастомная кнопка
</c-btn>
```

<sizes-examples :custom="true"/>

---

### Использование через CSS

CSS-переменные можно переопределять через классы или глобальные стили.

```css
.custom-btn {
  --btn-bg-color: #2196f3;
  --btn-border-radius: 10px;
  --btn-min-width: 160px;
  --btn-height: 40px;
}
```

```vue

<c-btn class="custom-btn">
  Кнопка
</c-btn>
```

## Структура DOM

```html

<button class="c-btn">
  <span class="c-btn__text">
    <!-- slot -->
  </span>
</button>
```

---

# Особенности

- размеры автоматически конвертируются через `convertToUnit`
- `block` отключает `width` и делает кнопку `width: 100%`
- минимальная ширина кнопки — **80px**

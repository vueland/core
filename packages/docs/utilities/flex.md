# Flex Utilities

Набор утилитарных классов для управления **Flexbox-раскладкой**.

Утилиты позволяют управлять:

- display режимом flex
- направлением контейнера
- переносом элементов
- выравниванием по основной и поперечной оси
- порядком элементов
- flex-grow / flex-shrink
- responsive поведением через breakpoint-префиксы

Все классы генерируются из Sass-карт и Sass-переменных.

---

## Display

Управляет типом flex контейнера.

| Класс | CSS |
|---|---|
| `d-flex` | `display: flex !important` |
| `d-inline-flex` | `display: inline-flex !important` |

### Пример

```html

<div class="d-flex gap-2 mt-5">
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
</div>
```

<div class="d-flex gap-2">
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
</div>

---

## Direction

Определяет направление основной оси flex-контейнера.

| Класс | CSS |
|---|---|
| `flex-row` | `flex-direction: row !important` |
| `flex-col` | `flex-direction: column !important` |

---

```html

<div class="d-flex flex-col gap-2">
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
</div>
```

<div class="d-flex flex-col gap-2">
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
</div>

## Wrap

Управляет переносом элементов внутри flex-контейнера.

| Класс | CSS |
|---|---|
| `flex-wrap` | `flex-wrap: wrap !important` |
| `flex-nowrap` | `flex-wrap: nowrap !important` |
| `flex-wrap-reverse` | `flex-wrap: wrap-reverse !important` |

```html

<div class="d-flex flex-wrap gap-2" style="width: 200px">
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
</div>
```
<div class="d-flex flex-wrap gap-2" style="width: 200px">
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
</div>

---

## Justify Content

Выравнивание элементов по **основной оси**.

Генерируется из Sass-карты:

```scss
$justify: (
    'center': center,
    'start': flex-start,
    'end': flex-end,
    'space-between': space-between,
    'space-around': space-around,
    'space-evenly': space-evenly,
    'stretch': stretch
);
```


### Классы

| Класс | CSS |
|---|---|
| `justify-center` | `justify-content: center !important` |
| `justify-start` | `justify-content: flex-start !important` |
| `justify-end` | `justify-content: flex-end !important` |
| `justify-space-between` | `justify-content: space-between !important` |
| `justify-space-around` | `justify-content: space-around !important` |
| `justify-space-evenly` | `justify-content: space-evenly !important` |
| `justify-stretch` | `justify-content: stretch !important` |

---

## Align Items

Выравнивание элементов по **поперечной оси**.

Генерируется из Sass-карты:

```scss
$align: (
    'center': center,
    'start': flex-start,
    'end': flex-end,
    'baseline': baseline,
    'stretch': stretch,
    'end-safe': safe flex-end,
    'center-safe': safe center,
    'start-safe': safe flex-start,
    'baseline-last': safe flex-start
);
```

### Классы

| Класс | CSS |
|---|---|
| `items-center` | `align-items: center !important` |
| `items-start` | `align-items: flex-start !important` |
| `items-end` | `align-items: flex-end !important` |
| `items-baseline` | `align-items: baseline !important` |
| `items-stretch` | `align-items: stretch !important` |
| `items-end-safe` | `align-items: safe flex-end !important` |
| `items-center-safe` | `align-items: safe center !important` |
| `items-start-safe` | `align-items: safe flex-start !important` |
| `items-baseline-last` | `align-items: safe flex-start !important` |

---

## Align Self

Переопределяет ```align-items``` для **конкретного элемента**.

| Класс | CSS |
|---|---|
| `self-center` | `align-self: center !important` |
| `self-start` | `align-self: flex-start !important` |
| `self-end` | `align-self: flex-end !important` |
| `self-baseline` | `align-self: baseline !important` |
| `self-stretch` | `align-self: stretch !important` |
| `self-end-safe` | `align-self: safe flex-end !important` |
| `self-center-safe` | `align-self: safe center !important` |
| `self-start-safe` | `align-self: safe flex-start !important` |
| `self-baseline-last` | `align-self: safe flex-start !important` |

---

## Align Content

Выравнивание **строк flex-контейнера**.

| Класс | CSS |
|---|---|
| `content-center` | `align-content: center !important` |
| `content-start` | `align-content: flex-start !important` |
| `content-end` | `align-content: flex-end !important` |
| `content-baseline` | `align-content: baseline !important` |
| `content-stretch` | `align-content: stretch !important` |
| `content-end-safe` | `align-content: safe flex-end !important` |
| `content-center-safe` | `align-content: safe center !important` |
| `content-start-safe` | `align-content: safe flex-start !important` |
| `content-baseline-last` | `align-content: safe flex-start !important` |

---

## Order

Позволяет изменить порядок flex-элементов.

Генерируется на основе переменной ```$columns```.

| Класс | CSS |
|---|---|
| `order-1` | `order: 1 !important` |
| `order-2` | `order: 2 !important` |
| `order-3` | `order: 3 !important` |
| ... | ... |

---

## Flex Grow

Управляет возможностью **расширения элемента**.

Генерируется переменной: ```$flex-grow-step: 4```

### Классы

| Класс | CSS |
|---|---|
| `grow-0` | `flex-grow: 0 !important` |
| `grow-1` | `flex-grow: 1 !important` |
| `grow-2` | `flex-grow: 2 !important` |
| `grow-3` | `flex-grow: 3 !important` |
| `grow-4` | `flex-grow: 4 !important` |

---

## Flex Shrink

Контролирует **сжатие элемента**.

Генерируется переменной: ```$flex-shrink-step: 4```

### Классы

| Класс | CSS |
|---|---|
| `shrink-0` | `flex-shrink: 0 !important` |
| `shrink-1` | `flex-shrink: 1 !important` |
| `shrink-2` | `flex-shrink: 2 !important` |
| `shrink-3` | `flex-shrink: 3 !important` |
| `shrink-4` | `flex-shrink: 4 !important` |

---

## Адаптивные классы

Все flex-утилиты поддерживают **breakpoint-префиксы**.

Формат: ```breakpoint: utility```

### Пример

```html

<div class="d-flex flex-col md:flex-row md:justify-space-between">
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
</div>
```

<div class="d-flex flex-col md:flex-row md:justify-space-between mt-5">
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
</div>

---

## Breakpoints

Responsive версии генерируются из карты:

```scss
$grid-breakpoints: (
    'xs': 0,
    'sm': 576px,
    'md': 768px,
    'lg': 992px,
    'xl': 1200px,
    'xxl': 1920px
);
```

### Пример responsive-классов

| Класс | CSS |
|---|---|
| `sm:d-flex` | flex начиная с sm |
| `md:flex-row` | row начиная с md |
| `lg:justify-center` | центр начиная с lg |

---

# Пример использования

```html

<div class="xl:d-flex xl:flex-col md:flex-row justify-space-around items-center gap-2">
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
</div>
```

<div class="d-flex xl:flex-col md:flex-row justify-space-around items-center mt-5 gap-2">
  <div class="bg-grey pa-2 r-4 elevation-2 w-[100px]">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
  <div class="bg-grey pa-2 r-4 elevation-2">Item</div>
</div>

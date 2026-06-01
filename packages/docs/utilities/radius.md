# Утилиты скругления (Border Radius)

Набор утилитарных классов для управления скруглением углов элементов через свойство `border-radius`.

Позволяют быстро задавать радиус скругления без написания CSS.

---

## Шкала радиусов

Вместо генерации всех возможных значений используется **фиксированная шкала**, чтобы интерфейс оставался консистентным.

| Класс   | Значение |
|---------|----------|
| `.r-0`  | `0`      |
| `.r-2`  | `2px`    |
| `.r-4`  | `4px`    |
| `.r-6`  | `6px`    |
| `.r-8`  | `8px`    |
| `.r-12` | `12px`   |
| `.r-16` | `16px`   |
| `.r-24` | `24px`   |
| `.r-32` | `32px`   |

---

# Визуальная шкала

<div class="d-flex gap-3 flex-wrap">
    <div style="background-color: #6b6b6b" class="pa-4 elevation-1 r-0">r-0</div>
    <div style="background-color: #6b6b6b" class="pa-4 elevation-1 r-4">r-4</div>
    <div style="background-color: #6b6b6b" class="pa-4 elevation-1 r-8">r-8</div>
    <div style="background-color: #6b6b6b" class="pa-4 elevation-1 r-12">r-12</div>
    <div style="background-color: #6b6b6b" class="pa-4 elevation-1 r-16">r-16</div>
</div>

---

## Скругление отдельных углов

Можно задавать радиус для каждого угла отдельно.

| Класс      | CSS                          |
|------------|------------------------------|
| `.rtl-{n}` | `border-top-left-radius`     |
| `.rtr-{n}` | `border-top-right-radius`    |
| `.rbl-{n}` | `border-bottom-left-radius`  |
| `.rbr-{n}` | `border-bottom-right-radius` |

### Пример

<div class="d-flex gap-3 flex-wrap">
    <div style="background-color: #6b6b6b" class="pa-4 elevation-1 rtl-12">rtl-12</div>
    <div style="background-color: #6b6b6b" class="pa-4 elevation-1 rtr-12">rtr-12</div>
    <div style="background-color: #6b6b6b" class="pa-4 elevation-1 rbl-12">rbl-12</div>
    <div style="background-color: #6b6b6b" class="pa-4 elevation-1 rbr-12">rbr-12</div>
</div>

```html

<div class="rtl-12">
  Скругление верхнего левого угла
</div>
```

---

## Специальные формы

Некоторые утилиты предназначены для распространённых форм.

| Класс       | CSS                     |
|-------------|-------------------------|
| `.r-pill`   | `border-radius: 9999px` |
| `.r-circle` | `border-radius: 50%`    |

## Пример

<div class="d-flex gap-3 flex-wrap">
    <div style="background-color: #6b6b6b; width: 120px" class="pa-4 elevation-2 d-flex justify-center align-center r-pill">
    pill
    </div>
    <div style="background-color: #6b6b6b; width: 60px; height: 60px;" class="d-flex justify-center align-center pa-4 elevation-2 r-circle">
    circle
    </div>
</div>

```html

<c-btn class="r-pill pa-2">
  Pill button
</c-btn>
```

---

## Комбинирование классов

Можно комбинировать несколько утилит.

```html

<div class="rtl-16 rbr-16">
  Диагональное скругление
</div>
```

---

# Частые сценарии

### Карточки

```html

<div class="r-8 pa-4 elevation-1">
  Card
</div>
```

### Кнопки

```html

<c-btn class="r-6 pa-2">
  Button
</c-btn>
```

### Модальные окна

```html

<div class="r-12 pa-6">
  Modal
</div>
```

---

# Рекомендации

Используйте радиусы последовательно:

| Радиус         | Использование      |
|----------------|--------------------|
| `r-4`          | мелкие элементы    |
| `r-6` / `r-8`  | кнопки             |
| `r-8` / `r-12` | карточки           |
| `r-16`         | большие контейнеры |
| `r-pill`       | pill-элементы      |
| `r-circle`     | аватары            |

---

# Итог

Утилиты скругления позволяют:

- быстро управлять `border-radius`
- задавать радиус отдельных углов
- использовать консистентную шкалу радиусов
- создавать специальные формы (`pill`, `circle`)

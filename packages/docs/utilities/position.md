# Утилиты позиционирования

Набор утилитарных классов для управления свойством `position` и координатами элементов.

Эти классы позволяют быстро позиционировать элементы в интерфейсе без написания дополнительного CSS.

---

## Position

Классы для управления свойством `position`.

| Класс | CSS |
|-----|-----|
| `.static` | `position: static` |
| `.relative` | `position: relative` |
| `.absolute` | `position: absolute` |
| `.fixed` | `position: fixed` |
| `.sticky` | `position: sticky` |

### Пример

```html

<div class="relative">
  <div class="absolute top-4 right-4">
    Бейдж
  </div>
</div>
```

---

## Утилиты смещения (Offset)

Классы для управления координатами элемента.

Шкала основана на шаге **4px**.

```
шаг = 4px
диапазон = 1 → 40
```

| Класс | CSS |
|-----|-----|
| `.top-{n}` | `top: n * 4px` |
| `.right-{n}` | `right: n * 4px` |
| `.bottom-{n}` | `bottom: n * 4px` |
| `.left-{n}` | `left: n * 4px` |

### Пример

```html

<div class="absolute top-4 left-4">
  Элемент
</div>
```

```
top-4  = 16px
top-8  = 32px
top-12 = 48px
```

---

## Утилиты Inset

Позволяют задавать координаты сразу для нескольких сторон.

| Класс | CSS |
|-----|-----|
| `.inset-{n}` | `top + right + bottom + left` |
| `.inset-x-{n}` | `left + right` |
| `.inset-y-{n}` | `top + bottom` |

### Примеры

```html

<div class="absolute inset-4">
  Блок с отступом со всех сторон
</div>
```

```html

<div class="absolute inset-x-4">
  Горизонтальные отступы
</div>
```

```html

<div class="absolute inset-y-2">
  Вертикальные отступы
</div>
```

---

## Адаптивные классы (Responsive)

Все offset-классы поддерживают **префиксы брейкпоинтов**.

Формат:

```
{breakpoint}:{utility}
```

Примеры:

| Класс | Описание |
|-----|-----|
| `.md:top-4` | применяется начиная с брейкпоинта `md` |
| `.lg:left-10` | применяется начиная с `lg` |
| `.xl:inset-6` | inset на `xl` |

### Пример

```html

<div class="absolute top-2 md:top-6 lg:top-10">
  Адаптивный элемент
</div>
```

---

## Брейкпоинты

Значения брейкпоинтов берутся из карты:

```scss
$grid-breakpoints
```

Пример:

| Брейкпоинт | Минимальная ширина |
|------------|--------------------|
| `sm`       | `576px`            |
| `md`       | `768px`            |
| `lg`       | `992px`            |
| `xl`       | `1200px`           |
| `xxl`      | `1920px`           |

---

## Полный пример

```html

<div class="relative h-200">
  <div class="absolute top-4 right-4 md:top-8 md:right-8">
    Подсказка
  </div>
  <div class="absolute inset-x-4 bottom-4">
    Нижняя панель
  </div>
</div>
```

---

# Итог

Утилиты позиционирования позволяют:

- управлять свойством `position`
- задавать координаты через единую шкалу
- быстро строить layout без написания CSS
- использовать адаптивные модификаторы

Все классы используют `!important`, чтобы гарантировать приоритет над обычными стилями.

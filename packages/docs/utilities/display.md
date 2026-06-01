# Утилиты отображения (Display)

Набор утилитарных классов для управления свойством `display`.

Эти классы позволяют быстро менять способ отображения элементов без написания CSS.

---

## Доступные классы

| Класс | CSS |
|------|------|
| `.d-block` | `display: block` |
| `.d-inline-block` | `display: inline-block` |
| `.d-inline` | `display: inline` |

---

## `.d-block`

Преобразует элемент в **блочный**.

Блочные элементы:

- занимают всю доступную ширину
- начинают новую строку
- могут иметь `width`, `height`, `margin`, `padding`

### Пример

<div style="border:1px dashed var(--vp-c-divider)" class="pa-4">
<span class="d-block pa-2 elevation-1">Block элемент</span>
<span class="d-block pa-2 elevation-1 mt-2">Block элемент</span>
</div>

```html
<span class="d-block">
  Блочный элемент
</span>
```

---

## `.d-inline`

Отображает элемент как **inline**.

Inline элементы:

- не начинают новую строку
- занимают только необходимую ширину
- игнорируют `width` и `height`

### Пример

<div class="pa-4" style="border:1px dashed var(--vp-c-divider)">
<span class="d-inline elevation-1">Inline</span>
<span class="d-inline elevation-1">Inline</span>
<span class="d-inline elevation-1">Inline</span>
</div>

```html
<span class="d-inline">Inline</span>
<span class="d-inline">Inline</span>
```

---

## `.d-inline-block`

Комбинирует поведение `inline` и `block`.

Особенности:

- элементы располагаются в строке
- можно задавать `width` и `height`
- поддерживает `margin` и `padding`

### Пример

<div class="pa-4" style="border:1px dashed var(--vp-c-divider)">
<div class="d-inline-block pa-3 elevation-1 mr-2">1</div>
<div class="d-inline-block pa-3 elevation-1 mr-2">2</div>
<div class="d-inline-block pa-3 elevation-1">3</div>
</div>

```html
<div class="d-inline-block">Item</div>
<div class="d-inline-block">Item</div>
```

---

## Сравнение типов отображения

| Тип | Перенос строки | Поддержка width/height |
|----|----|----|
| `block` | да | да |
| `inline` | нет | нет |
| `inline-block` | нет | да |

---

## Когда использовать

Используйте:

- `.d-block` для стандартных блочных элементов
- `.d-inline` для текста и мелких элементов
- `.d-inline-block` для элементов в строке с фиксированными размерами

---

## Пример интерфейса

```html

<div class="pa-4">
  <span class="d-block fs-lg mb-2">
    Заголовок
  </span>
  <span class="d-inline-block pa-2 elevation-1 mr-2">
    Tag
  </span>
  <span class="d-inline-block pa-2 elevation-1">
    Tag
  </span>
</div>
```

---

# Итог

Утилиты display позволяют:

- быстро менять тип отображения элементов
- контролировать layout без дополнительного CSS
- комбинировать их с другими утилитами (spacing, flex, typography)

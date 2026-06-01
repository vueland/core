# Утилиты прозрачности (Opacity)

Набор утилитарных классов для управления прозрачностью элементов через свойство `opacity`.

Позволяют быстро задавать уровень прозрачности без написания CSS.

---

## Шкала прозрачности

Утилиты используют диапазон **от 0 до 10**.

Формула:

```
opacity = значение / 10
```

| Класс | Значение |
|------|------|
| `.op-0` | `opacity: 0` |
| `.op-1` | `opacity: 0.1` |
| `.op-2` | `opacity: 0.2` |
| `.op-3` | `opacity: 0.3` |
| `.op-4` | `opacity: 0.4` |
| `.op-5` | `opacity: 0.5` |
| `.op-6` | `opacity: 0.6` |
| `.op-7` | `opacity: 0.7` |
| `.op-8` | `opacity: 0.8` |
| `.op-9` | `opacity: 0.9` |
| `.op-10` | `opacity: 1` |

---

## Визуальная шкала

<div class="d-flex flex-column gap-2">

<div class="op-10 pa-2 elevation-1">opacity 1.0</div>
<div class="op-8 pa-2 elevation-1">opacity 0.8</div>
<div class="op-6 pa-2 elevation-1">opacity 0.6</div>
<div class="op-4 pa-2 elevation-1">opacity 0.4</div>
<div class="op-2 pa-2 elevation-1">opacity 0.2</div>

</div>

---

## Hover модификаторы

Для изменения прозрачности при наведении доступны **hover-классы**.

Формат:

```
hover:op-{n}
```
Примеры:

| Класс | Описание |
|------|------|
| `.hover:op-5` | `opacity: 0.5` при hover |
| `.hover:op-8` | `opacity: 0.8` при hover |
| `.hover:op-10` | `opacity: 1` при hover |

### Пример

```html

<div class="op-6 hover:op-10">
  Наведите курсор
</div>
```

Наведите курсор на элементы, чтобы увидеть эффект прозрачности.

<style>
.opacity-demo {
  transition: opacity .1s ease;
  cursor: pointer;
}
</style>

<div class="d-flex gap-3 flex-wrap">

<div class="opacity-demo op-10 pa-3 elevation-1 hover:op-5">
Hover
</div>

<div class="opacity-demo op-8 pa-3 elevation-1 hover:op-1">
Hover
</div>

<div class="opacity-demo op-5 pa-3 elevation-1 hover:op-1">
Hover
</div>

</div>

---

# Пример использования

```html

<div class="op-6">
  Полупрозрачный элемент
</div>
```

---

# Частые сценарии

## Disabled состояние

```html

<button class="op-5">
  Disabled
</button>
```

---

### Overlay

```html

<div class="op-4">
  Затемнение фона
</div>
```

---

# Рекомендации

Используйте:

- `.op-10` — полностью непрозрачный элемент
- `.op-7` / `.op-8` — лёгкое затемнение
- `.op-5` — полупрозрачные элементы
- `.op-2` / `.op-3` — фоновые эффекты

---

# Итог

Утилиты прозрачности позволяют:

- управлять прозрачностью элементов
- создавать визуальные состояния интерфейса
- использовать единую шкалу значений
- поддерживать единообразие интерфейса

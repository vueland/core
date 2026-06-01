<script>import ColorsPalette from './examples/ColorsPalette.vue'
export default {
    components: {
        ColorsPalette
    }
};
</script>

# Цветовые утилиты (Colors)
Набор утилитарных классов для управления цветами текста и фона.

Цвета основаны на расширенной палитре Material Design и включают:

- базовые цвета
- осветлённые оттенки (`lighten-*`)
- затемнённые оттенки (`darken-*`)
- акцентные цвета (`accent-*`)

---


## Подключение
Для начала использования утилитарных классов палитры цветов необходимо их импортировать отдельно
от основных стилей:
```ts
import "@vueland/ui/css/utils/_colors.css"
```

## Типы утилит

Доступны два типа классов.

| Класс | Назначение |
|------|------|
| `.bg-*` | цвет фона |
| `.text-*` | цвет текста |

---

## Базовые цвета

| Класс | CSS |
|------|------|
| `.bg-red` | `background-color` |
| `.text-red` | `color` |
| `.bg-blue` | `background-color` |
| `.text-blue` | `color` |
| `.bg-green` | `background-color` |
| `.text-green` | `color` |

---

## Оттенки цветов

Каждый цвет имеет несколько вариантов оттенков.

Формат классов:

```
{type}-{color}-{variant}
```

Примеры:

| Класс | Значение |
|------|------|
| `.bg-red-lighten-2` | светлый оттенок |
| `.bg-blue-darken-1` | тёмный оттенок |
| `.bg-green-accent-2` | акцентный оттенок |
| `.text-purple-lighten-3` | светлый текст |

---

### Пример использования

```html

<div class="bg-blue pa-4 text-white r-8">
  Card
</div>
```

---

## Цвет текста

Класс `.text-*` управляет:

```
color
caret-color
```

Пример:

```html
<p class="text-red">
  Ошибка
</p>
```

---

## Hover / active эффект

Текстовые утилиты также добавляют активный эффект при взаимодействии.

При `hover → active` появляется цветная подложка.

```html

<c-btn class="bg-green-lighten-1 hover:bg-green-darken-1 text-white">
  Action
</c-btn>
```

---

## Палитра цветов

Ниже представлена полная палитра доступных цветов.

<ColorsPalette/>

---

# Частые сценарии

### Карточка

```html

<c-card class="bg-white text-grey-darken-3 elevation-2 pa-4 r-8">
  <c-card-header>
    Обычная карточка
  </c-card-header>
</c-card>
```

---

### Уведомление

```html

<c-card class="bg-red-lighten-4 text-red-darken-2 pa-3 r-6">
  <c-card-header>
    Уведомление об ошибке!
  </c-card-header>
</c-card>
```

---

# Итог

Цветовые утилиты позволяют:

- быстро применять цвета фона и текста
- использовать готовую палитру оттенков
- поддерживать единообразие интерфейса
- комбинировать цвета с другими утилитами (`spacing`, `radius`, `elevation`)

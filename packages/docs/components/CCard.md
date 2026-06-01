<script>import BaseExamples from './examples/CCard/BaseExamples.vue'
export default {
  components: {
    BaseExamples
  }
}
</script>

# CCard

`CCard` — базовый layout-компонент карточки.

Группа компонентов (`CCard`, `CCardHeader`, `CCardBody`, `CCardFooter`) представляет собой **примитивы структуры**, без встроенной логики — только семантика и CSS-классы.

---

## Описание

Компоненты карточки — это максимально простые функциональные обертки, которые:

- добавляют предсказуемую структуру
- навешивают базовые CSS-классы
- не содержат состояния и логики

Это **layout primitives**, а не UI-компоненты с поведением.

---

## Пример использования

```html

<c-card class="bg-grey-darken-2 text-white elevation-4 w-[300px]">
  <c-card-header>
    <h2 class="notification-header">
      Notification
    </h2>
  </c-card-header>
  <c-card-body>
    Notification content
  </c-card-body>
  <c-card-footer>
    <c-btn class="bg-green">
      OK
    </c-btn>
  </c-card-footer>
</c-card>
```

<base-examples/>

---

## Назначение

Компоненты используются как структурные обертки и решают следующие задачи:

- формируют единый API карточек
- задают семантическую структуру layout
- улучшают читаемость шаблонов
- устраняют "div soup"
- обеспечивают консистентность дизайн-системы

---

## Состав компонентов

| Компонент       | Описание                          |
|-----------------|----------------------------------|
| `CCard`         | Корневой контейнер карточки      |
| `CCardHeader`   | Верхняя часть / заголовок        |
| `CCardBody`     | Основной контент                 |
| `CCardFooter`   | Нижняя часть / действия          |

---

## Примеры

```html

<c-card class="pa-4">
  <c-card-header class="mb-2">
    Product
  </c-card-header>

  <c-card-body>
    Description
  </c-card-body>

  <c-card-footer class="mt-2">
    Actions
  </c-card-footer>
</c-card>
```

---

## Props
У компонентов нет пропсов, поддерживаются любые HTML-атрибуты через `$attrs`.

---

## Slots

| Slot    | Описание              |
|---------|----------------------|
| default | Содержимое компонента |

---

## Events
Компоненты не генерируют пользовательских событий.

---

## CSS классы

| Класс             | Описание                    |
|------------------|-----------------------------|
| `c-card`         | Корневой контейнер          |
| `c-card-header`  | Заголовок                   |
| `c-card-body`    | Основной контент            |
| `c-card-footer`  | Нижняя часть                |

---

## CSS переменные

Компонент использует CSS-переменные для кастомизации внешнего вида:

| Переменная                 | По умолчанию                | Описание                     |
|---------------------------|-----------------------------|------------------------------|
| `--card-width`            | `100%`                      | Ширина карточки              |
| `--card-header-padding`   | `16px`                      | Padding header               |
| `--card-body-padding`     | `16px`                      | Padding body                 |
| `--card-footer-padding`   | `16px`                      | Padding footer               |
| `--card-border-radius`    | `8px`                       | Радиус скругления            |
| `--card-background-color` | `var(--global-base-color)`  | Цвет фона                    |
| `--card-text-color`       | `var(--global-text-color)`  | Цвет текста                  |


## DOM структура

```html

<div class="c-card">
  <div class="c-card-header"></div>
  <div class="c-card-body"></div>
  <div class="c-card-footer"></div>
</div>
```

---

## Особенности

- функциональные компоненты (без instance)
- не создают реактивных эффектов
- не имеют состояния
- минимальный runtime overhead
- рендерят только тег + класс
- полностью управляются через `$attrs`
- идеально подходят для high-performance UI

---

## Рекомендации
- используйте для построения карточных layout
- комбинируйте с utility-классами (spacing, flex, typography)
- не добавляйте бизнес-логику внутрь
- используйте как базовые primitives дизайн-системы
- держите стили вне компонента (CSS / variables / utilities)

---

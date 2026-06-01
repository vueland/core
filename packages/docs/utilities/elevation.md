<script>
import {CBtn, CCard, CCardHeader, CCardBody} from '@vueland/ui/components'

export default {
    components: {
        CCard,
        CCardHeader,
        CCardBody,
        CBtn
    }
}
</script>

# Утилиты теней (Elevation)

Набор утилитарных классов для управления тенью элемента через `box-shadow`.

Утилиты построены по шкале **elevation** и позволяют быстро задавать глубину элемента в интерфейсе без написания
дополнительного CSS.

Тени генерируются из трёх слоёв:

- **umbra**
- **penumbra**
- **ambient**

Итоговая тень собирается в единый `box-shadow`.

---

## Шкала elevation

Доступны классы от **0** до **24**.

| Класс           | Описание          |
|-----------------|-------------------|
| `.elevation-0`  | без тени          |
| `.elevation-1`  | очень лёгкая тень |
| `.elevation-2`  | слабая тень       |
| `.elevation-4`  | заметная тень     |
| `.elevation-8`  | выраженная тень   |
| `.elevation-12` | сильная тень      |
| `.elevation-16` | крупная тень      |
| `.elevation-24` | максимальная тень |

---

# Как это работает

Для каждого уровня `z` тень собирается из трёх карт:

```scss
$shadow-key-umbra 
$shadow-key-penumbra 
$shadow-key-ambient
```

Затем значения объединяются в один `box-shadow`.

Пример концептуально:

```scss
box-shadow: map.get($shadow-key-umbra, $z), map.get($shadow-key-penumbra, $z), map.get($shadow-key-ambient, $z);
```

Такой подход даёт более естественную и «материальную» глубину, чем одна простая тень.

---

## Доступные классы

Генерируются классы:

```text
.elevation-0
.elevation-1
.elevation-2
...
.elevation-24
```

Все классы задают `box-shadow` с `!important`.

---

## Визуальная шкала

<div class="d-flex flex-wrap gap-4 mt-5 pa-4 r-8 bg-blue-grey-darken-1">
    <c-btn class="bg-blue-grey-darken-3 elevation-0">elevation-0</c-btn>
    <c-btn class="bg-blue-grey-darken-3 elevation-1">elevation-1</c-btn>
    <c-btn class="bg-blue-grey-darken-3 elevation-2">elevation-2</c-btn>
    <c-btn class="bg-blue-grey-darken-3 elevation-4">elevation-4</c-btn>
    <c-btn class="bg-blue-grey-darken-3 elevation-8">elevation-8</c-btn>
    <c-btn class="bg-blue-grey-darken-3 elevation-12">elevation-12</c-btn>
    <c-btn class="bg-blue-grey-darken-3 elevation-16">elevation-16</c-btn>
    <c-btn class="bg-blue-grey-darken-3 elevation-24">elevation-24</c-btn>
</div>

---

## Примеры использования

### Карточка

```html

<c-card class="r-8 elevation-2">
  <c-card-header>
    <span class="fs-xl">Заголовок карточки</span>
  </c-card-header>
  <c-card-body>
    Карточка с текстом
  </c-card-body>
</c-card>
```

### Dropdown / menu

```html

<c-menu
  open-on-click
  close-on-click
  class="pa-4 r-8 elevation-8"
>
  <template #activator="{on, activator}">
    <c-btn>Меню</c-btn>
  </template>
  <template #default>
    <c-list>
      <c-list-item>
        ...
      </c-list-item>
    </c-list>
  </template>
</c-menu>
```

### Модальное окно

```html

<div class="pa-6 r-12 elevation-16">
  Modal
</div>
```

### Floating элемент

```html

<div class="pa-3 r-pill elevation-6">
  Floating action
</div>
```

---

## Рекомендованные уровни

Чтобы интерфейс выглядел консистентно, лучше использовать ограниченный набор значений.

| Уровень                         | Рекомендация                       |
|---------------------------------|------------------------------------|
| `elevation-0`                   | плоские элементы                   |
| `elevation-1` / `elevation-2`   | обычные карточки, кнопки           |
| `elevation-4` / `elevation-6`   | hover-состояния, активные элементы |
| `elevation-8` / `elevation-12`  | выпадающие меню, popover           |
| `elevation-16` / `elevation-24` | модальные окна, overlay-контент    |

---

### Пример

```html

<div class="pa-4 r-8 elevation-4">
  Контент
</div>
```

---

# Итог

Утилиты elevation позволяют:

- быстро управлять глубиной элементов
- использовать единую шкалу теней
- делать интерфейс визуально более структурированным
- применять готовые уровни для карточек, меню и модальных окон

<script>
import BaseExamples from './examples/CList/BaseExamples.vue'

export default {
  components: {BaseExamples}
}
</script>

# CList

`CList` — это контейнерный компонент списка с поддержкой выбора элементов через `v-model`. Компонент предоставляет API
выбора через `provide / inject`, а дочерние элементы `CListItem` используют это API для определения активного состояния
и переключения выбора по клику.

Компонент поддерживает два режима работы:

- одиночный выбор
- множественный выбор

Дополнительно доступен режим обязательного выбора `mandatory`, который запрещает снятие выбранного элемента в режиме
одиночного выбора.

---

## Базовое использование

```vue

<script setup lang="ts">
  import { ref } from 'vue'
  import {
    CList,
    CListItem,
    CListItemTitle,
  } from '@vueland/ui'

  const model = ref<string | null>(null)

  const items = [
    'list item 1',
    'list item 2',
    'list item 3',
    'list item 4',
    'list item 5',
  ]
</script>
<template>
  <c-list
    v-model="model"
    class="bg-grey-darken-2 text-white elevation-4 r-[8px] overflow-hidden"
  >
    <c-list-item
      v-for="it in items"
      :key="it"
      :value="it"
    >
      <c-list-item-title>
        {{ it }}
      </c-list-item-title>
    </c-list-item>
  </c-list>
</template>
```
<base-examples base/>

---

## Назначение

`CList` предназначен для построения интерактивных списков, где элементы могут:

- выбираться как одиночное значение
- выбираться как набор значений
- отображать текущее активное состояние
- использовать как декларативный состав через `CListItem`
- использовать как renderless-контейнер через slot props `select`, `unselect`, `isActive`

Типичные сценарии использования:

- боковые меню
- списки навигации
- списки фильтров
- простые selectable-списки
- кастомные listbox-подобные интерфейсы

---

## CList

Корневой компонент списка. Управляет состоянием выбора и передает дочерним компонентам API через `provide`.

## CListItem

Интерактивный элемент списка. Получает API списка через `inject`, вычисляет активность через `isActive` и по клику либо
выбирает, либо снимает выбор.

## CListItemIcon

Функциональный вспомогательный компонент-обертка с CSS-классом:

c-list-item-icon

Используется для отображения иконки внутри элемента списка.

## CListItemTitle

Функциональный вспомогательный компонент-обертка с CSS-классом:

c-list-item-title

Используется для текста или заголовка элемента списка.

---

## Примеры

### Одиночный выбор

```vue
<script setup lang="ts">
  import { ref } from 'vue'
  import {
    CList,
    CListItem,
    CListItemTitle,
  } from '@vueland/ui'

  const selected = ref<string | null>(null)
</script>

<template>
  <c-list v-model="selected">
    <c-list-item value="dashboard">
      <c-list-item-title>Dashboard</c-list-item-title>
    </c-list-item>

    <c-list-item value="orders">
      <c-list-item-title>Orders</c-list-item-title>
    </c-list-item>

    <c-list-item value="customers">
      <c-list-item-title>Customers</c-list-item-title>
    </c-list-item>
  </c-list>
</template>
```
<base-examples base/>

### Множественный выбор

```vue

<script setup lang="ts">
  import { ref } from 'vue'
  import {
    CList,
    CListItem,
    CListItemTitle,
  } from '@vueland/ui'

  const selected = ref<string[]>([])
</script>

<template>
  <c-list
    v-model="selected"
    multiple
  >
    <c-list-item value="vue">
      <c-list-item-title>Vue</c-list-item-title>
    </c-list-item>

    <c-list-item value="nuxt">
      <c-list-item-title>Nuxt</c-list-item-title>
    </c-list-item>

    <c-list-item value="typescript">
      <c-list-item-title>TypeScript</c-list-item-title>
    </c-list-item>
  </c-list>
</template>
```
<base-examples multiple/>

### Обязательный выбор

```vue
<script setup lang="ts">
  import { ref } from 'vue'
  import {
    CList,
    CListItem,
    CListItemTitle,
  } from '@vueland/ui'

  const selected = ref<string | null>('home')
</script>

<template>
  <c-list
    v-model="selected"
    mandatory
  >
    <c-list-item value="home">
      <c-list-item-title>Home</c-list-item-title>
    </c-list-item>

    <c-list-item value="catalog">
      <c-list-item-title>Catalog</c-list-item-title>
    </c-list-item>

    <c-list-item value="contacts">
      <c-list-item-title>Contacts</c-list-item-title>
    </c-list-item>
  </c-list>
</template>
```
<base-examples mandatory/>
### Кастомный рендер через slot props

```vue

<script setup lang="ts">
  import { ref } from 'vue'
  import { CList } from '@vueland/ui'

  const items = ['One', 'Two', 'Three']
  const selected = ref<string | null>(null)
</script>

<template>
  <c-list v-model="selected">
    <template #default="{ select, unselect, isActive }">
      <li
        v-for="item in items"
        :key="item"
        class="custom-item"
        @click="isActive(item) ? unselect(item) : select(item)"
      >
        {{ item }} - {{ isActive(item) ? 'active' : 'inactive' }}
      </li>
    </template>
  </c-list>
</template>
```

---

## Props

### CList

| Prop         | Type               | Default | Описание                                                |
|--------------|--------------------|---------|---------------------------------------------------------|
| `modelValue` | `T \| T[] \| null` | `null`  | Текущее выбранное значение или массив значений          |
| `multiple`   | `boolean`          | `false` | Включает режим множественного выбора                    |
| `mandatory`  | `boolean`          | `false` | Запрещает снятие выбранного значения в одиночном режиме |
| `readonly`   | `boolean`          | `false` | Включает режим только для чтения                        |

### CListItem

| Prop    | Type | Default     | Описание                 |
|---------|------|-------------|--------------------------|
| `value` | `T`  | `undefined` | Значение элемента списка |

---

## Slots

### CList

#### default

Слот получает объект с методами управления состоянием списка:

| Slot prop  | Type                   | Описание                      |
|------------|------------------------|-------------------------------|
| `select`   | `(item: T) => void`    | Выбрать элемент               |
| `unselect` | `(item: T) => void`    | Снять выбор с элемента        |
| `isActive` | `(item: T) => boolean` | Проверить, активен ли элемент |

### CListItem

#### default

Стандартный слот содержимого элемента списка.

Если слот не передан, будет выведено значение `value`.

---

## Events

### CList

| Event               | Payload            | Описание                                      |
|---------------------|--------------------|-----------------------------------------------|
| `update:modelValue` | `T \| T[] \| null` | Срабатывает при изменении выбранного значения |

---

## CSS классы

| Класс                  | Описание                |
|------------------------|-------------------------|
| `c-list`               | Корневой элемент списка |
| `c-list--readonly`     | Неактивный список       |
| `c-list-item`          | Элемент списка          |
| `c-list-item--active`  | Активный элемент        |
| `c-list-item-icon`     | Иконка элемента         |
| `c-list-item-title`    | Заголовок элемента      |

---

## CSS переменные

| Переменная           | Описание         |
|----------------------|------------------|
| `--list-bg-color`    | Цвет фона списка |
| `--list-item-height` | Высота элемента  |

---

## DOM структура

```html

<ul class="c-list">
  <li class="c-list-item c-list-item--active">
    <div class="c-list-item-icon"></div>
    <div class="c-list-item-title"></div>
  </li>
</ul>
```

---

## Особенности

- Использует provide/inject для связи элементов
- Поддерживает generics
- Работает с объектами через toRaw
- mandatory работает только в single режиме
- может работать как renderless компонент

---

## Рекомендации
- для фильтров использовать multiple
- для меню использовать mandatory

---

## Пример полного использования

```vue

<script setup lang="ts">
  import { ref } from 'vue'
  import {
    CList,
    CListItem,
    CListItemIcon,
    CListItemTitle,
  } from '@vueland/ui'

  const items = [
    { id: 1, title: 'Dashboard', icon: 'd' },
    { id: 2, title: 'Orders', icon: 'o' },
  ]

  const selected = ref(items[0])
</script>

<template>
  <c-list v-model="selected" mandatory>
    <c-list-item
      v-for="item in items"
      :key="item.id"
      :value="item"
    >
      <c-list-item-icon>{{ item.icon }}</c-list-item-icon>
      <c-list-item-title>{{ item.title }}</c-list-item-title>
    </c-list-item>
  </c-list>
</template>
   ```

---

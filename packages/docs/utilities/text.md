# Текстовые утилиты

Набор утилитарных классов для управления отображением текста.

Позволяют быстро управлять:

- выравниванием текста
- переносом строк
- обрезкой длинного текста
- регистром текста

Все классы используют `!important`.

---

## Выравнивание текста

Классы для управления `text-align`.

| Класс               | CSS                       |
|---------------------|---------------------------|
| `.text-left`        | `text-align: left`        |
| `.text-center`      | `text-align: center`      |
| `.text-right`       | `text-align: right`       |
| `.text-justify`     | `text-align: justify`     |
| `.text-justify-all` | `text-align: justify-all` |

### Пример

<div class="pa-4" style="border:1px dashed var(--vp-c-divider)">

<div class="text-left mb-2">Выравнивание по левому краю</div>
<div class="text-center mb-2">Выравнивание по центру</div>
<div class="text-right">Выравнивание по правому краю</div>
</div>

```html
<p class="text-left">Текст слева</p>
<p class="text-center">Текст по центру</p>
<p class="text-right">Текст справа</p>
```

---

## Управление переносом текста

## `.text-nowrap`

Запрещает перенос строки.

| Класс          | CSS                   |
|----------------|-----------------------|
| `.text-nowrap` | `white-space: nowrap` |

### Пример

<div style="width:180px;border:1px dashed var(--vp-c-divider)" class="pa-2 text-nowrap">
Очень длинный текст который не переносится
</div>

```html

<div class="text-nowrap">
  Длинный текст
</div>
```

---

## Обрезка текста

## `.text-truncate`

Обрезает текст с помощью `ellipsis`.

| CSS                       |
|---------------------------|
| `overflow: hidden`        |
| `text-overflow: ellipsis` |
| `white-space: nowrap`     |

### Пример

<div style="width:180px;border:1px dashed var(--vp-c-divider)" class="pa-2 text-truncate">
Очень длинный текст который будет обрезан
</div>

```html

<div class="text-truncate">
  Очень длинный текст который будет обрезан
</div>
```

---

## Управление регистром текста

Классы для управления `text-transform`.

| Класс              | CSS                          |
|--------------------|------------------------------|
| `.text-uppercase`  | `text-transform: uppercase`  |
| `.text-lowercase`  | `text-transform: lowercase`  |
| `.text-capitalize` | `text-transform: capitalize` |

## Адаптивные модификаторы

Текстовые утилиты поддерживают responsive версии.

Формат:

```
{breakpoint}:{utility}
```

Примеры:

| Класс             | Описание                       |
|-------------------|--------------------------------|
| `.md:text-center` | выравнивание по центру на `md` |
| `.lg:text-right`  | выравнивание справа на `lg`    |
| `.xl:text-nowrap` | запрет переноса на `xl`        |

### Пример

```html
<p class="text-left md:text-center lg:text-right">
  Адаптивное выравнивание текста
</p>
```

---

## Брейкпоинты

Значения берутся из карты:

```scss
$grid-breakpoints
```

| Брейкпоинт | Минимальная ширина |
|------------|--------------------|
| sm         | 576px              |
| md         | 768px              |
| lg         | 992px              |
| xl         | 1200px             |
| xxl        | 1920px             |

---

# Частые сценарии использования

### Обрезка текста в карточках

```html

<div class="text-truncate">
  Название элемента
</div>
```

---

### Выравнивание заголовков

```html
<h2 class="text-center">
  Заголовок страницы
</h2>
```

---

### Предотвращение переноса

```html
<span class="text-nowrap">
  Неразрывный текст
</span>
```

---

# Итог

Текстовые утилиты позволяют:

- управлять выравниванием текста
- контролировать перенос строк
- обрезать длинный текст
- использовать адаптивные модификаторы

Они упрощают работу с типографикой и layout интерфейса.

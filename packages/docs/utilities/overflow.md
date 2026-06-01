# Утилиты переполнения (Overflow)

Набор утилитарных классов для управления свойством `overflow`.

Позволяют контролировать поведение содержимого, выходящего за границы элемента.

Все классы используют `!important`.

---

## Доступные классы

| Класс                | CSS                  |
|----------------------|----------------------|
| `.overflow-hidden`   | `overflow: hidden`   |
| `.overflow-auto`     | `overflow: auto`     |
| `.overflow-visible`  | `overflow: visible`  |
| `.overflow-clip`     | `overflow: clip`     |
| `.overflow-scroll`   | `overflow: scroll`   |
| `.overflow-x-auto`   | `overflow-x: auto`   |
| `.overflow-y-auto`   | `overflow-y: auto`   |
| `.overflow-x-hidden` | `overflow-x: hidden` |
| `.overflow-y-hidden` | `overflow-y: hidden` |
| `.overflow-x-scroll` | `overflow-x: scroll` |
| `.overflow-y-scroll` | `overflow-y: scroll` |
| `.overflow-x-clip`   | `overflow-x: clip`   |
| `.overflow-y-clip`   | `overflow-y: clip`   |
---

## `.overflow-hidden`

Скрывает содержимое, выходящее за границы контейнера.

<div style="width:220px;border:1px dashed var(--vp-c-divider)" class="pa-2 overflow-hidden">
  <div style="width:400px">
    Этот текст выходит за границы контейнера, но скрывается.
  </div>
</div>

```html

<div class="overflow-hidden">
  Контент
</div>
```

---

## `.overflow-auto`

Полосы прокрутки появляются **только при необходимости**.

<div style="width:220px;height:80px;border:1px dashed var(--vp-c-divider)" class="overflow-auto pa-2">
  <div style="height:160px">
    Содержимое превышает высоту контейнера и появляется прокрутка.
  </div>
</div>

```html

<div class="overflow-auto">
  Контент
</div>
```

---

## `.overflow-scroll`

Полосы прокрутки отображаются **всегда**, даже если содержимое помещается.

```html

<div class="overflow-scroll">
  Контент
</div>
```

---

## `.overflow-visible`

Переполнение **не скрывается** и может выходить за границы контейнера.

```html

<div class="overflow-visible">
  Контент
</div>
```

---

## Горизонтальная прокрутка

`.overflow-x-auto` управляет только осью **X**.

<div style="width:220px;border:1px dashed var(--vp-c-divider)" class="overflow-x-auto pa-2">
  <div style="width:400px">
    Широкий контент
  </div>
</div>

```html

<div class="overflow-x-auto">
  Контент
</div>
```

---

## Вертикальная прокрутка

`.overflow-y-auto` управляет только осью **Y**.

<div style="height:80px;border:1px dashed var(--vp-c-divider)" class="overflow-y-auto pa-2">
  <div style="height:200px">
    Высокий контент
  </div>
</div>

```html

<div class="overflow-y-auto">
  Контент
</div>
```

---

# Пример интерфейса

```html

<div class="pa-4">
  <div class="overflow-y-auto" style="height:200px">
    Список элементов
  </div>
  <div class="overflow-x-auto mt-4">
    Горизонтальный список
  </div>
</div>
```

---

# Итог

Утилиты overflow позволяют:
- управлять прокруткой контейнеров
- скрывать лишний контент
- создавать прокручиваемые области интерфейса
- контролировать поведение overflow по осям

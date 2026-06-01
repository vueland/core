# Global CSS Variables

Core UI использует глобальные CSS-переменные для управления цветами, радиусами и базовыми параметрами интерфейса.

Эти переменные объявлены на уровне `:root` и используются компонентами библиотеки через локальные CSS variables.

---

## Доступные переменные

| Переменная | По умолчанию | Описание |
|---|---|---|
| `--global-border-radius` | `8px` | Базовый радиус скругления элементов |
| `--global-error-color` | `#ef231f` | Цвет ошибок |
| `--global-success-color` | `#43d31b` | Цвет успешных состояний |
| `--global-primary-color` | `#1f77c4` | Основной цвет интерфейса |
| `--global-secondary-color` | `#39638c` | Вторичный цвет |
| `--global-base-color` | `#ffffff` | Базовый цвет фона |
| `--global-text-color` | `#3d3d3d` | Основной цвет текста |

---

## Где используются переменные

Глобальные переменные используются компонентами библиотеки через локальные CSS-переменные.

Например:

```
--global-primary-color
        ↓
--btn-bg-color
        ↓
background-color
```

Это позволяет изменять тему приложения без изменения стилей компонентов.

---

## Пример объявления

```css
:root {
  --global-border-radius: 8px;
  --global-error-color: #ef231f;
  --global-success-color: #43d31b;
  --global-primary-color: #1f77c4;
  --global-secondary-color: #39638c;
  --global-base-color: #ffffff;
  --global-text-color: #3d3d3d;
}
```

---

## Кастомизация темы

Глобальные переменные можно переопределить в стилях приложения.

```css
:root {
  --global-primary-color: #673ab7;
  --global-border-radius: 10px;
}
```

После изменения переменных все компоненты Core UI автоматически используют новые значения.

---

## Пример темизации

```css
:root.dark {
  --global-base-color: #121212;
  --global-text-color: #ffffff;
  --global-primary-color: #4dabf7;
}
```

Такой подход позволяет легко реализовать поддержку тем (например, light / dark).

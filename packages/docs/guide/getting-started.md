# Быстрый старт

Этот раздел описывает базовую установку и подключение **Vueland UI** в приложение на Vue 3.

---

## Установка

Установите пакет библиотеки:

```bash
yarn add @vueland/ui
```

[//]: # (либо готовый модуль для nuxt:)

[//]: # ()
[//]: # (```bash)

[//]: # (yarn add @vueland/ui-nuxt)

[//]: # (```)
---

## Подключение библиотеки

Создайте файл плагина, например `plugin.ts`, и инициализируйте Core UI.

```ts
import * as components from '@vueland/ui/components'
import { createVuelandUI } from '@vueland/ui'

import '@vueland/ui/styles/styles.scss'
import '@vueland/ui/styles/themes/default-theme.scss'

export const vueland = createVuelandUI({
  components,
  ssr: false,
  themes: {},
  icons: {}
})
```

---

## Подключение к приложению

Подключите плагин в точке входа приложения.

```ts
import { createApp } from 'vue'
import App from './App.vue'

import { vueland } from './plugin'

import './styles/index.scss'

const app = createApp(App)

app.use(vueland)

app.mount('#app')
```

---

# Структура проекта (пример)

```
src
 ├─ plugin.ts
 ├─ main.ts
 ├─ App.vue
 └─ styles
     └─ index.scss
```

---

# Что делает `createVuelandUI`

Функция `vueland` создает Vue-плагин, который:

- регистрирует компоненты библиотеки
- подключает инфраструктурные зависимости
- инициализирует темы и иконки
- настраивает поддержку SSR
---

# Опции конфигурации

| Опция | Тип | Описание |
|------|------|------|
| `components` | `Record<string, Component>` | Список регистрируемых компонентов |
| `ssr` | `boolean` | Включает поддержку SSR |
| `themes` | `object` | Конфигурация тем |
| `icons` | `object` | Конфигурация иконок |

---

После подключения библиотеки компоненты **Vueland UI** становятся доступными во всем приложении.

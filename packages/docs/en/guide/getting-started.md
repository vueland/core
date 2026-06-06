# Getting started

This section explains how to install **Vueland UI** and connect it to a Vue 3 application.

## Installation

Install the library package:

```bash
yarn add @vueland/ui
```

## Registering the library

Create a plugin file, for example `plugin.ts`, and initialize Vueland UI.

```ts
import * as components from '@vueland/ui/components'
import { createVuelandUI } from '@vueland/ui'
import '@vueland/ui/styles.css'
import '@vueland/ui/css/themes/default-theme.css'

export const vueland = createVuelandUI({
  components,
  ssr: false,
  themes: {},
  icons: {},
})
```

## Connecting it to the app

Use the plugin in the application entry point.

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { vueland } from './plugins'

const app = createApp(App)

app.use(vueland)
app.mount('#app')
```

## Project structure

```txt
src
├─ plugin.ts
├─ main.ts
├─ App.vue
└─ styles
   └─ index.scss
```

## What `createVuelandUI` does

The function creates a Vue plugin that:

- registers library components;
- connects infrastructure dependencies;
- initializes themes and icons;
- configures SSR support.

## Configuration options

| Option | Type | Description |
| --- | --- | --- |
| `components` | `Record` | Components to register |
| `ssr` | `boolean` | Enables SSR support |
| `themes` | `object` | Theme configuration |
| `icons` | `object` | Icon configuration |

After the library is connected, **Vueland UI** components are available across the whole application.

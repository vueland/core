import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { createVuelandUI } from '@vueland/ui'
import * as components from '@vueland/ui/components'
import '@vueland/ui/styles.css'
import '@vueland/ui/css/themes/default-theme.css'
import '@vueland/ui/css/utils/_colors.css'
import './utils-jit.css'
import './style.scss'
import { ALIASES } from '@vueland/ui/constants'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    const vueland = createVuelandUI({
      components,
      ssr: true,
      icons: { aliases: ALIASES },
    })

    app.use(vueland)
  },
} satisfies Theme

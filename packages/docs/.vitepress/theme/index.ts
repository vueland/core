import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { createUI } from '@vueland/ui'
import * as components from '@vueland/ui/components'
import AppWrapper from './AppWrapper.vue'

import DemoBlock from '../components/DemoBlock.vue'
import DemoPreview from '../components/DemoPreview.vue'
import DemoCode from '../components/DemoCode.vue'

import '@vueland/ui/styles.css'
import '@vueland/ui/css/themes/default-theme.css'
import '@vueland/ui/css/utils/_colors.css'
import './style.scss'
import { ALIASES } from '@vueland/ui/constants'

export default {
    extends: DefaultTheme,
    Layout: AppWrapper,
    enhanceApp({ app }) {
        const coreUI = createUI({
            components,
            ssr: true,
            icons: {
                aliases: ALIASES
            }
        })

        app.use(coreUI)
        app.component('DemoBlock', DemoBlock)
        app.component('DemoPreview', DemoPreview)
        app.component('DemoCode', DemoCode)
    }
} satisfies Theme

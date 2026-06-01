import { createCoreUi } from '@vueland/ui'
import * as components from '@vueland/ui/components'
import '@vueland/ui/styles/styles.scss'
import '@vueland/ui/styles/themes/default-theme.scss'
import '@vueland/ui/styles/utils/_colors.scss'
import { ALIASES } from '@vueland/ui/constants/icons'
import * as buttonPresets from './presets/button-presets'
import * as inputPresets from './presets/input-presets'
import * as menuPresets from './presets/menu-presets'

export const coreUi = createCoreUi({
    components,
    ssr: true,
    themes: {},
    icons: {
        aliases: ALIASES
    },
    presets: {
        button: buttonPresets,
        input: inputPresets,
        menu: menuPresets,
    }
})

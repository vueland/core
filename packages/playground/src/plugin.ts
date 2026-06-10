import { createVuelandUI } from '@vueland/ui'
import * as components from '@vueland/ui/components'

import '@vueland/ui/styles/styles.scss'
import '@vueland/ui/styles/themes/default-theme.scss'
import '@vueland/ui/styles/utils/_colors.scss'

import { ALIASES } from '@vueland/ui/constants/icons'
import { createFontAwesomeResolver } from '@vueland/ui/resolvers'
// Presets
import * as buttonPresets from './presets/button-presets'
import * as inputPresets from './presets/input-presets'
import * as menuPresets from './presets/menu-presets'
import * as fieldPresets from './presets/field-presets'
// Icons
import { faUser, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const fa = createFontAwesomeResolver({
    defaultPrefix: 'fas',
    icons: {
        'fas:user': faUser,
        'fas:trash': faTrash,
        'fab:github': faGithub,
    },
})

export const ui = createVuelandUI({
    components,
    ssr: true,
    themes: {},
    icons: {
        sets: { fa },
        aliases: {
            ...ALIASES,
            // dropdown: { ...fa('fas:chevron-down', { source: 'fa' }), size: 16 },
        },
    },
    presets: {
        button: buttonPresets,
        input: inputPresets,
        menu: menuPresets,
        field: fieldPresets,
    }
})

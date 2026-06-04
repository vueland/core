import { type App, type Plugin } from 'vue'
import { VuelandUI, type LibOptions } from './library'
import './styles/styles.scss'

export * from './types'

export function createVuelandUI(options: LibOptions): Plugin {
    return {
        install(app: App, args: any) {
            const library = new VuelandUI()

            library.install(app, {
                ...options,
                ...args,
            })

            app.config.globalProperties.$ui = library
        },
    }
}

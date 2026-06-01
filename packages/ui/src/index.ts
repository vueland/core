import { type App, type Plugin } from 'vue'
import { CoreUI, type LibOptions } from './library'
import './styles/styles.scss'

export * from './types'

export function createCoreUi(options: LibOptions): Plugin {
    return {
        install(app: App, args: any) {
            const library = new CoreUI()

            library.install(app, {
                ...options,
                ...args,
            })

            app.config.globalProperties.$coreUi = library
        },
    }
}

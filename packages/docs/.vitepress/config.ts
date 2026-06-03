import { defineConfig } from 'vitepress'
import { utilsJIT } from '@vueland/utils-jit'
import { navItems } from './nav-links'
import { sidebar } from './sidebar'

export default defineConfig({
    title: 'Vueland',
    description: 'Modern frontend platform for Vue 3',
    appearance: 'dark',
    vite: {
        plugins: [
            utilsJIT({
                outFile: './.vitepress/theme/utils-jit.css'
            }) as any
        ]
    },
    themeConfig: {
        siteTitle: 'VueLand',
        darkModeSwitchLabel: '',
        lightModeSwitchTitle: '',
        outline: {
            label: 'Содержание страницы'
        },
        nav: navItems,
        sidebar,
        socialLinks: [
            { icon: 'github', link: 'https://github.com/vueland/vueland' }
        ]

    }

})

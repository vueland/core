import { defineConfig } from 'vitepress'
import { coreUiJit } from '@vueland/utils-jit'
import { navItems } from './nav-links'
import { sidebar } from './sidebar'

export default defineConfig({
    title: 'Core UI',
    description: 'Vue 3 component library',
    appearance: 'dark',
    vite: {
        plugins: [
            coreUiJit({
                outFile: './.vitepress/theme/utils-jit.css'
            }) as any
        ]
    },
    themeConfig: {
        siteTitle: 'Core UI',
        darkModeSwitchLabel: '',
        lightModeSwitchTitle: '',
        outline: {
            label: 'Содержание страницы'
        },
        nav: navItems,
        sidebar,
        socialLinks: [
            { icon: 'github', link: 'https://github.com/vueland/core' }
        ]

    }

})

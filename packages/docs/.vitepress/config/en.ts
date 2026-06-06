import { createNav, createSidebar } from './links'
import { githubLink } from './shared'

export const enConfig = {
    label: 'English',
    lang: 'en-US',
    link: '/en/',
    title: 'Vueland',
    description: 'Modern frontend platform for Vue 3',
    themeConfig: {
        logo: '/logo.png',
        siteTitle: 'Vueland',
        nav: createNav('en'),
        sidebar: createSidebar('en'),
        outline: {
            label: 'On this page',
            level: 'deep' as const,
        },
        docFooter: {
            prev: 'Previous page',
            next: 'Next page',
        },
        darkModeSwitchLabel: 'Appearance',
        lightModeSwitchTitle: 'Switch to light theme',
        darkModeSwitchTitle: 'Switch to dark theme',
        returnToTopLabel: 'Return to top',
        sidebarMenuLabel: 'Menu',
        langMenuLabel: 'Change language',
        socialLinks: [
            {
                icon: 'github' as const,
                link: githubLink,
            },
        ],
        search: {
            provider: 'local' as const,
        },
    },
}

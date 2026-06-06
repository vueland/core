import { createNav, createSidebar } from './links'
import { githubLink } from './shared'

export const ruConfig = {
    label: 'Русский',
    lang: 'ru-RU',
    link: '/ru/',
    title: 'Vueland',
    description: 'Современная frontend-платформа для Vue 3',
    themeConfig: {
        logo: '/logo.png',
        siteTitle: 'Vueland',
        nav: createNav('ru'),
        sidebar: createSidebar('ru'),
        outline: {
            label: 'Содержание страницы',
            level: 'deep' as const,
        },
        docFooter: {
            prev: 'Предыдущая страница',
            next: 'Следующая страница',
        },
        darkModeSwitchLabel: 'Оформление',
        lightModeSwitchTitle: 'Переключить на светлую тему',
        darkModeSwitchTitle: 'Переключить на тёмную тему',
        returnToTopLabel: 'Наверх',
        sidebarMenuLabel: 'Меню',
        langMenuLabel: 'Сменить язык',
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

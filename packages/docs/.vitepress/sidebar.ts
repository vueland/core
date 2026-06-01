import { guideItems } from './guilde-links'
import { componentItems } from './component-links'
import { settingsItems } from './settings-links'
import { utilitiesItems } from './utilities-links'

export const sidebar = {
    '/guide/': [
        {
            text: 'Руководство',
            items: guideItems
        }
    ],
    '/components/': [
        {
            text: 'Компоненты',
            items: componentItems
        }
    ],
    '/settings': [
        {
            text: 'Глобальные настройки',
            items: settingsItems
        }
    ],
    '/utilities/': [
        {
            text: 'Утилитарные классы',
            items: utilitiesItems
        }
    ],
    '/plugin/': [
        {
            text: '',
            items: [
                { text: 'Инструкция', link: '/plugin/' }
            ]
        }
    ]
}

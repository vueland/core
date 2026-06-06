import type { DefaultTheme } from 'vitepress'

type Locale = 'en' | 'ru'

const componentGroups = [
  { ru: 'Структурные', en: 'Structure', items: [['c-app ✅', 'CApp']] },
  { ru: 'Элементы', en: 'Elements', items: [['c-btn ✅', 'CBtn'], ['c-label', 'CLabel'], ['c-field ✅', 'CField'], ['c-icon ✅', 'CIcon'], ['c-img', 'CImg']] },
  { ru: 'Обертки', en: 'Wrappers', items: [['c-main', 'CMain'], ['c-card ✅', 'CCard'], ['c-list ✅', 'CList']] },
  { ru: 'Всплывающие', en: 'Overlays', items: [['c-menu ✅', 'CMenu'], ['c-tooltip ✅', 'CTooltip'], ['c-dialog', 'CDialog']] },
  { ru: 'Форма и поля', en: 'Forms and fields', items: [['c-form ✅', 'CForm'], ['c-text-field', 'CTextField'], ['c-autocomplete', 'CAutocomplete'], ['c-select', 'CSelect']] },
  { ru: 'Селекты', en: 'Selection controls', items: [['c-checkbox', 'CCheckbox'], ['c-radio', 'CRadio'], ['c-switch', 'CSwitch']] },
  { ru: 'Grid система', en: 'Grid system', items: [['c-grid', 'CGrid'], ['c-row', 'CRow'], ['c-col', 'CCol'], ['c-spacer', 'CSpacer']] },
  { ru: 'Headless компоненты', en: 'Headless components', items: [['c-select-control ✅', 'CSelectControl'], ['c-input ✅', 'CInput'], ['c-overlay ✅', 'COverlay']] },
]

const utilities = [
  ['Introduction', 'Введение', ''],
  ['Colors', 'Палитра', 'colors'],
  ['Position', 'Position', 'position'],
  ['Spacing', 'Spacing', 'spacing'],
  ['Flex', 'Flex', 'flex'],
  ['Typography', 'Typography', 'typography'],
  ['Display', 'Display', 'display'],
  ['Overflow', 'Overflow', 'overflow'],
  ['Sizing', 'Sizing', 'sizing'],
  ['Opacity', 'Opacity', 'opacity'],
  ['Text', 'Text', 'text'],
  ['Radius', 'Radius', 'radius'],
  ['Elevation', 'Elevation', 'elevation'],
]

export function createNav(locale: Locale): DefaultTheme.NavItem[] {
  const p = `/${locale}`
  return locale === 'en'
    ? [
      { text: 'Guide', link: `${p}/guide/getting-started` },
      { text: 'Components', link: `${p}/components/` },
      { text: 'Utilities', link: `${p}/utilities/` },
      { text: 'Settings', link: `${p}/settings/` },
      { text: 'JIT Plugin', link: `${p}/plugin/` },
    ]
    : [
      { text: 'Руководство', link: `${p}/guide/getting-started` },
      { text: 'Компоненты', link: `${p}/components/` },
      { text: 'Утилиты', link: `${p}/utilities/` },
      { text: 'Настройки', link: `${p}/settings/` },
      { text: 'JIT плагин', link: `${p}/plugin/` },
    ]
}

export function createSidebar(locale: Locale): DefaultTheme.Sidebar {
  const p = `/${locale}`
  const isEn = locale === 'en'

  return {
    [`${p}/guide/`]: [
      { text: isEn ? 'Guide' : 'Руководство', items: [{ text: isEn ? 'Getting started' : 'Установка', link: `${p}/guide/getting-started` }] },
    ],
    [`${p}/components/`]: componentGroups.map((group) => ({
      text: isEn ? group.en : group.ru,
      items: group.items.map(([text, file]) => ({ text, link: `${p}/components/${file}` })),
    })),
    [`${p}/settings/`]: [
      { text: isEn ? 'Global settings' : 'Глобальные настройки', items: [
        { text: isEn ? 'Introduction' : 'Введение', link: `${p}/settings/` },
        { text: isEn ? 'CSS variables' : 'CSS переменные', link: `${p}/settings/css-vars` },
      ] },
    ],
    [`${p}/utilities/`]: [
      { text: isEn ? 'Utility classes' : 'Утилитарные классы', items: utilities.map(([en, ru, file]) => ({ text: isEn ? en : ru, link: `${p}/utilities/${file}` })) },
    ],
    [`${p}/plugin/`]: [
      { text: 'Utils JIT', items: [{ text: isEn ? 'Guide' : 'Инструкция', link: `${p}/plugin/` }] },
    ],
  }
}

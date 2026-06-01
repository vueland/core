import { IconAliases, IconName } from '../enums'

export const ICONS = {
    [IconName.CHEVRON_DOWN]: {
        body: '<path d="M7.61 11.34 3.16 6.94a.54.54 0 0 1 0-.77l.52-.51a.55.55 0 0 1 .78 0L8 9.15l3.54-3.5a.55.55 0 0 1 .78 0l.52.52c.21.21.21.56 0 .77l-4.45 4.4a.55.55 0 0 1-.78 0Z"/>',
        viewBox: '0 0 16 16',
    },
    [IconName.CALENDAR]: {
        body: '<path d="M483 84c-8-7-16-11-26-11h-37V46a44.5 44.5 0 00-45-46h-19a44.5 44.5 0 00-45 46v27H201V46a44.5 44.5 0 00-46-46h-18c-13 0-23 4-32 13S91 33 91 46v27H55c-10 0-19 4-26 11s-11 16-11 26v365c0 10 4 19 11 26s16 11 26 11h402c10 0 18-4 26-11 7-7 10-16 10-26V110c0-10-3-19-10-26zM137 475H55v-82h82v82zm0-100H55v-92h82v92zm0-110H55v-82h82v82zm-6-131c-2-1-3-4-3-6V46c0-3 1-5 3-7 1-2 4-2 6-2h18c3 0 5 0 7 2s2 4 2 7v82c0 2 0 5-2 6-2 2-4 3-7 3h-18c-2 0-5-1-6-3zm116 341h-92v-82h92v82zm0-100h-92v-92h92v92zm0-110h-92v-82h92v82zm109 210h-91v-82h91v82zm0-100h-91v-92h91v92zm0-110h-91v-82h91v82zm-6-131c-2-1-3-4-3-6V46c0-3 1-5 3-7s4-2 6-2h19c2 0 4 0 6 2s3 4 3 7v82c0 2-1 5-3 6l-6 3h-19l-6-3zm107 341h-82v-82h82v82zm0-100h-82v-92h82v92zm0-110h-82v-82h82v82z"/>',
        viewBox: '-30 30 550 550',
    },
    [IconName.CHECK]: {
        body: '<path d="M174 439L7 273a26 26 0 010-36l37-36c10-10 26-10 36 0l112 112L432 73c10-10 26-10 36 0l37 36c9 10 9 26 0 36L210 439a26 26 0 01-36 0z"/>',
        viewBox: '0 0 550 550',
    }
}

export const ALIASES = {
    [IconAliases.DROPDOWN]: ICONS[IconName.CHEVRON_DOWN],
    [IconAliases.CHECKBOX_ON]: ICONS[IconName.CHECK],
    [IconAliases.CALENDAR]: ICONS[IconName.CALENDAR],
}

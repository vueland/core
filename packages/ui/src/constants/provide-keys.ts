import type { InjectionKey } from 'vue'
import type { FormApi, ApplicationApi } from '../components'
import type { AppBreakpoints, DialogsStackApi } from '../composables'

export const $FORM_API_KEY: InjectionKey<FormApi> = Symbol()
export const $LIST_API_KEY: InjectionKey<any> = Symbol()
export const $MENU_API_KEY: InjectionKey<any> = Symbol()
export const $APP_API_KEY: InjectionKey<ApplicationApi> = Symbol()
export const $BREAKPOINTS_KEY: InjectionKey<AppBreakpoints> = Symbol()
export const $VUELAND_UI_KEY: InjectionKey<any> = Symbol()
export const $DIALOGS_STACK_API_KEY: InjectionKey<DialogsStackApi> = Symbol()

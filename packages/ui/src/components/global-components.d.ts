import type {
    CAutocompleteProps,
    CAutocompleteSlots,
    CCheckboxEvents,
    CCheckboxProps,
    CCheckboxSlots,
    CDialogProps,
    CDialogSlots,
    CInputProps,
    CInputSlots,
    CLabelProps,
    CMenuEvents,
    CMenuProps,
    CMenuSlots,
    COverlayProps,
    CSelectControlProps,
    CSelectControlSlots,
    CSelectProps,
    CSelectSlots
} from './index'
import type { VNode } from 'vue'

export {}
declare module 'vue' {
    export interface GlobalComponents {
        CApp: typeof import('./CApp').CApp
        CAutocomplete: new <T>() => {
            $props: CInputProps<T> & CAutocompleteProps<T>
            $slots: CInputSlots & CAutocompleteSlots<T>
        }
        CBtn: typeof import('./CBtn/').CBtn
        CCard: typeof import('./CCard').CCard
        CCardHeader: typeof import('./CCard').CCardHeader
        CCardBody: typeof import('./CCard').CCardBody
        CCardFooter: typeof import('./CCard').CCardFooter
        CSelectControl: new <T>() => {
            $props: CSelectControlProps<T>
            $slots: CSelectControlSlots
        }
        CCheckbox: new <T>() => {
            $props: CCheckboxProps<T> & CSelectControlProps<T>
            $slots: CCheckboxSlots
            $emit: CCheckboxEvents<T>
        }
        CRadio: new <T>() => {
            $props: CCheckboxProps<T> & CSelectControlProps<T>
        }
        CDialog: new () => {
            $props: CDialogProps
            $slots: CDialogSlots
        }
        COverlay: typeof import('./COverlay').COverlay
        CField: typeof import('./CField').CField
        CForm: typeof import('./CForm').CForm
        CRow: typeof import('./CGrid').CRow
        CCol: typeof import('./CGrid').CCol
        CSpacer: typeof import('./CGrid').CSpacer
        CIcon: typeof import('./CIcon').CIcon
        CInput: new <T>() => {
            $props: CInputProps<T>
            $slots: CInputSlots
        }
        CItems: typeof import('./CItems/CItems').CItems
        CLabel: new () => {
            $props: CLabelProps
            $slots: {
                default(): VNode
            }
        }
        CList: typeof import('./CList').CList
        CListItem: typeof import('./CList').CListItem
        CListItemTitle: typeof import('./CList').CListItemTitle
        CListItemIcon: typeof import('./CList').CListItemIcon
        CMain: typeof import('./CMain').CMain
        CMenu: new () => {
            $props: CMenuProps
            $slots: CMenuSlots
            $emit: CMenuEvents
        }
        CSelect: new <T>() => {
            $props: CInputProps<T> & CSelectProps<T>
            $slots: CInputSlots & CSelectSlots<T>
        }
        CTextField: new <T>() => {
            $props: CInputProps<T>
            $slots: CInputSlots
        }
        CToolbar: typeof import('./CToolbar').CToolbar
        CToolbarLogo: typeof import('./CToolbar').CToolbarLogo
        CToolbarItems: typeof import('./CToolbar').CToolbarItems
        CTooltip: new () => {
            $props: CMenuProps & Omit<COverlayProps, 'modelValue'>
            $slots: CMenuSlots
        }
        CScrim: typeof import('./CScrim').CScrim
    }
}

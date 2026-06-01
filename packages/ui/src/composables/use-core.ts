import { inject } from 'vue'
import { $CORE_UI_KEY } from '../constants'
import type { CoreUI } from '../library'

export function useCore(): CoreUI {
    return inject($CORE_UI_KEY, null)
}

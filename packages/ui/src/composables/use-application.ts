import { inject } from 'vue'
import { $APP_API_KEY } from '../constants'
import type { ApplicationApi } from '../components'

export function useApplication() {
    return inject($APP_API_KEY, {} as ApplicationApi)
}

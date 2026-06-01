import { getCurrentInstance, shallowRef, unref, watch } from 'vue'
import { isNotEmpty } from '../helpers'

export type InputStateProps = {
    disabled?: boolean
    focused?: boolean
    readonly?: boolean
}

export function useInputState(props: Record<string, any> = {}) {
    const instance = getCurrentInstance()

    const focused = shallowRef(props.focused ?? false)
    const isDirty = shallowRef(false)
    const hasValue = shallowRef(false)

    function dirty() {
        isDirty.value = true
    }

    function onFocus() {
        focused.value = true
        instance?.emit('focus', unref(focused))
        if (!unref(isDirty)) {
            dirty()
        }
    }

    function onBlur() {
        focused.value = false
        instance?.emit('blur', unref(focused))
    }

    function onInput() {
    }

    watch(() => props.modelValue, (value) => {
        const isArray = Array.isArray(value)
        hasValue.value = isArray ? !!value.length : isNotEmpty(value)
    }, { immediate: true })

    return {
        isDirty,
        focused,
        hasValue,
        onFocus,
        onBlur,
        onInput,
    }
}

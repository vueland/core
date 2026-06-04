import { getCurrentInstance, shallowReactive, watch } from 'vue'
import { isNotEmpty } from '../helpers'

export type InputStateProps = {
    disabled?: boolean
    focused?: boolean
    readonly?: boolean
}

export interface InputState {
    focused: boolean
    isDirty: boolean
    hasValue: boolean
}

export function useInputState(props: Record<string, any> = {}) {
    const instance = getCurrentInstance()

    const state = shallowReactive<InputState>({
        focused: props.focused ?? false,
        isDirty: false,
        hasValue: false,
    })

    function dirty() {
        state.isDirty = true
    }

    function onFocus() {
        if (props.readonly || props.disabled) return

        state.focused = true
        instance?.emit('focus', state.focused)

        if (!state.isDirty) {
            dirty()
        }
    }

    function onBlur() {
        state.focused = false
        instance?.emit('blur', state.focused)
    }

    function onInput() {
    }

    watch(() => props.modelValue, (value) => {
        const isArray = Array.isArray(value)
        state.hasValue = isArray ? !!value.length : isNotEmpty(value)
    }, { immediate: true })

    return {
        state,
        onFocus,
        onBlur,
        onInput,
    }
}

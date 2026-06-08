import {
    computed,
    onBeforeMount,
    type Reactive,
    shallowReactive,
    toRefs,
    unref,
    watch
} from 'vue'
import type { Maybe } from '../types'
import { type InputState } from '../components'
import { isDef } from '../helpers'

export type ValidateFn = (value: any) => ({
    valid: boolean,
    message: string
})

export type ValidateOn = 'input' | 'blur'

export type ValidateProps = {
    rules?: ValidateFn[]
    validateOn?: ValidateOn
}

export type ValidateState = {
    errorMessage: Maybe<string>
    hasError: boolean
}

export enum InputEvents {
    INPUT = 'input',
    BLUR = 'blur'
}

export function useValidate(props: ValidateProps & { modelValue: any }, state: Reactive<InputState>) {
    const { validateOn = InputEvents.INPUT, modelValue } = toRefs(props)

    const errors = shallowReactive<ValidateState>({
        errorMessage: undefined,
        hasError: false,
    })

    const hasRules = computed(() => (props.rules?.length ?? 0) > 0)
    const isOnBlur = computed(() => unref(validateOn) === InputEvents.BLUR)

    function reset() {
        errors.errorMessage = ''
        errors.hasError = false
    }

    function update(result: ReturnType<ValidateFn>) {
        errors.hasError = !result.valid
        errors.errorMessage = !result.valid ? result.message : undefined
    }

    function validate() {
        if (unref(hasRules)) {
            for (const rule of props.rules!) {
                const result = rule(props.modelValue)

                update(result)

                if (!result.valid) {
                    return false
                }
            }
        }

        return true
    }

    onBeforeMount(() => {
        if (!unref(hasRules)) {
            return
        }

        watch(modelValue!, (value) => {
            if (isDef(value) && !unref(isOnBlur)) validate()
            //
            // else if (unref(isOnBlur)) {
            //     const unwatch = watch(() => state.focused, (val) => {
            //         if (!val) validate()
            //         unwatch()
            //     })
            // }
        })

        watch(() => state.focused, (val) => {
            if (!val) validate()
        })
    })

    return {
        errors,
        hasRules,
        reset,
        validate,
    }
}

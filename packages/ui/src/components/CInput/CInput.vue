<script setup lang="ts" generic="T">
    import {
        computed,
        onBeforeMount,
        onBeforeUnmount, shallowReactive,
        unref,
        useAttrs, watch
    } from 'vue'
    import { CLabel } from '../CLabel'
    import {
        useForm,
        useInputPresets,
        useValidate
    } from '../../composables'
    import type { CInputProps, CInputSlots, CInputEmits, InputState } from './types'
    import { isNotEmpty, unique } from '../../helpers'
    import { FIELD_ATTRS } from '../../constants'

    defineOptions({
        name: 'CInput',
        inheritAttrs: false
    })

    const props = defineProps<CInputProps<T>>()
    const slots = defineSlots<CInputSlots<T>>()
    const emit = defineEmits<CInputEmits<T>>()

    const state = shallowReactive<InputState>({
        focused: props.focused ?? false,
        isDirty: false,
        hasValue: false,
    })

    const { errors, validate } = useValidate(props, state)
    const formApi = useForm()
    const attrs = useAttrs()

    const preset = useInputPresets({
        props,
        state,
        slots,
        errors
    })

    const fieldId = `input-${props.id ?? unique(6)}`

    const hasLabel = computed(() => !!slots.label || !!props.label)

    const hasDetails = computed(() => !props.noDetails && (
        !!props.details ||
        !!slots?.details ||
        errors.hasError)
    )

    const normalizedAttrsMap = computed(() => Object.entries(attrs).reduce((acc, [k, v]) => {
        if (
            (FIELD_ATTRS.has(k))
            || k.startsWith('aria-')
            || k.startsWith('data-')
        ) {
            acc[k] = v
        }

        return acc
    }, {}))

    const fieldAttrs = computed(() => ({
        ...unref(normalizedAttrsMap),
        ...(unref(hasLabel) ? { 'aria-labelledby': `${fieldId}-label` } : {}),
        ...(unref(hasDetails) ? { 'aria-describedby': `${fieldId}-details` } : {}),
        ...(errors.hasError ? { 'aria-invalid': 'true' } : {}),
        ...(errors.errorMessage && unref(hasDetails) ? { 'aria-errormessage': `${fieldId}-details` } : {}),
        ...(props.readonly ? { 'aria-readonly': 'true' } : {}),
        ...(props.disabled ? { 'aria-disabled': 'true' } : {}),
    }))

    const classes = computed(() => [
        {
            'c-input--has-error': errors.hasError,
            'c-input--default': !errors.hasError,
            'c-input--focused': state.focused,
            'c-input--disabled': props.disabled,
            'c-input--readonly': props.readonly,
            'c-input--has-value': state.hasValue,
            'c-input--has-prepend': !!slots?.prepend,
            'c-input--has-append': !!slots?.append,
            [attrs.class as string]: !!attrs.class,
        },
        ...unref(preset).root
    ])

    function onFocus() {
        if (props.readonly || props.disabled) {
            return
        }

        state.focused = true

        emit('focus', state.focused)
    }

    function onBlur() {
        state.focused = false

        if (!state.isDirty) {
            state.isDirty = true
        }

        emit('blur', state.focused)
    }

    function onInput(val: T) {
        emit('input', val)
    }

    function onClear() {
        emit('clear')
    }

    watch(() => props.modelValue, (value) => {
        const isArray = Array.isArray(value)
        state.hasValue = isArray ? !!value.length : isNotEmpty(value)
    }, { immediate: true })

    onBeforeMount(() => {
        formApi?.add(validate)
    })

    onBeforeUnmount(() => {
        formApi?.remove(validate)
    })

    defineExpose({
        validate,
        onFocus,
        onBlur,
        onClear,
        onInput
    })
</script>
<template>
    <div
        class="c-input"
        :class="classes"
    >
        <div
            class="c-input__field"
            :class="preset.field"
        >
            <div
                v-if="$slots.prepend"
                class="c-input__prepend"
                :class="preset.prepend"
            >
                <slot name="prepend" />
            </div>
            <slot
                name="field"
                v-bind="errors"
                :validate
                :label
                :disabled
                :readonly
                :focused="state.focused"
                :uid="fieldId"
                :presets="preset.field"
                :on-focus
                :on-clear
                :on-blur
                :on-input
                :attrs="fieldAttrs"
            />
            <div
                v-if="clearable"
                class="c-input__clear"
            >
                <slot name="clear">
                    <c-icon @click="onClear" />
                </slot>
            </div>
            <div
                v-if="$slots.append"
                class="c-input__append"
                :class="preset.append"
            >
                <slot name="append" />
            </div>
        </div>
        <div
            v-if="hasLabel"
            class="c-input__label"
            :class="preset.label"
        >
            <slot
                name="label"
                :uid="fieldId"
            >
                <c-label
                    :id="`${fieldId}-label`"
                    v-memo="[label]"
                    tag="label"
                    :for="fieldId"
                >
                    {{ label }}
                </c-label>
            </slot>
        </div>
        <div
            v-if="hasDetails"
            :id="`${fieldId}-details`"
            class="c-input__details"
            :class="preset.details"
        >
            <slot
                name="details"
                v-bind="errors"
                :details
                :uid="fieldId"
            />
        </div>
    </div>
</template>

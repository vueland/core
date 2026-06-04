<script setup lang="ts" generic="T">
    import { computed, onBeforeMount, onBeforeUnmount, toRefs, unref, useAttrs } from 'vue'
    import { CLabel } from '../CLabel'
    import { useFieldAttrs, useForm, useInputPresets, useValidate } from '../../composables'
    import type { CInputProps, CInputSlots } from './types'
    import { unique } from '../../helpers'

    defineOptions({
        name: 'CInput',
        inheritAttrs: false
    })

    const props = defineProps<CInputProps<T>>()
    const slots = defineSlots<CInputSlots>()

    const {
        state,
        focused,
        hasValue,
        onFocus,
        onBlur,
        onInput,
        validate
    } = useValidate(props)

    const formApi = useForm()

    const preset = useInputPresets({
        props,
        focused,
        ...toRefs(state),
    })

    const uid = `input-${props.id ?? unique(6)}`
    const attrs = useAttrs()
    const fieldAttrs = useFieldAttrs({ props, attrs, state, uid })

    const hasLabel = computed(() => !!slots.label || !!props.label)
    const hasPrepend = computed(() => !!slots?.prepend)
    const hasAppend = computed(() => !!slots?.append)
    const hasDetails = computed(() => !props.noDetails && (props.details || !!slots?.details))

    const classes = computed(() => [
        {
            'c-input--has-error': state.hasError,
            'c-input--default': !state.hasError,
            'c-input--focused': unref(focused),
            'c-input--disabled': props.disabled,
            'c-input--readonly': props.readonly,
            'c-input--has-value': unref(hasValue),
            'c-input--has-prepend': unref(hasPrepend),
            'c-input--has-append': unref(hasAppend),
            [attrs.class as string]: !!attrs.class,
        },
        ...unref(preset).root
    ])

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
            >
                <slot name="prepend" />
            </div>
            <slot
                name="field"
                v-bind="state"
                :validate
                :focused
                :label
                :disabled
                :readonly
                :uid
                :presets="preset.field"
                :on-focus
                :on-blur
                :on-input
                :attrs="fieldAttrs"
            />
            <div
                v-if="$slots.append"
                class="c-input__append"
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
                :uid
            >
                <c-label
                    :id="`${uid}-label`"
                    v-memo="[label]"
                    tag="label"
                    :for="uid"
                >
                    {{ label }}
                </c-label>
            </slot>
        </div>
        <div
            v-if="hasDetails"
            :id="`${uid}-details`"
            class="c-input__details"
            :class="preset.details"
        >
            <slot
                name="details"
                v-bind="state"
                :uid
            >
                {{ details }}
            </slot>
        </div>
    </div>
</template>

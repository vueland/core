<script setup lang="ts" generic="T">
    import { computed, unref } from 'vue'

    import { useKeyboard } from '../../composables'
    import { IconAliases } from '../../enums'
    import { CIcon } from '../CIcon'
    import { CLabel } from '../CLabel'

    defineOptions({
        inheritAttrs: false
    })

    const props = defineProps<{
        error: boolean
        checked: boolean
        label?: string
        id: string
        disabled?: boolean
        readonly?: boolean
    }>()

    const emit = defineEmits<{
        (e: 'toggle'): void
    }>()

    const focused = defineModel<boolean>('focused', { default: false })

    const { CHECKBOX_ON, CHECKBOX_OFF } = IconAliases

    const classes = computed(() => ({
        'c-checkbox--default': !unref(focused) && !props.error,
        'c-checkbox--focused': unref(focused),
        'c-checkbox--disabled': props.disabled,
        'c-checkbox--readonly': props.readonly,
        'c-checkbox--error': props.error,
    }))

    const { onKeydown } = useKeyboard({
        Enter: () => emit('toggle')
    })

    function focus() {
        focused.value = true
    }

    function blur() {
        focused.value = false
    }
</script>
<template>
    <div
        class="c-checkbox"
        :class="classes"
        @click="$emit('toggle')"
        @keydown="onKeydown"
    >
        <div class="c-checkbox__icon">
            <slot
                name="icon"
                :checked
            >
                <c-icon :name="checked ? CHECKBOX_ON : CHECKBOX_OFF" />
            </slot>
        </div>
        <input
            :id
            type="checkbox"
            :checked
            role="checkbox"
            v-bind="$attrs"
            @focus="focus"
            @blur="blur"
        >
        <c-label
            :id="`${id}-label`"
            v-memo="[label]"
            class="c-checkbox__label"
            tag="label"
            :for="id"
        >
            <slot>{{ label }}</slot>
        </c-label>
    </div>
</template>

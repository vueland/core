<script setup lang="ts">
    import { computed, onMounted, shallowRef, unref, useAttrs, useSlots } from 'vue'

    import { IconAliases } from '../../enums'

    defineOptions({
        name: 'CField',
        inheritAttrs: false,
    })

    const {
        tag = 'input',
        label = '',
        filled = false,
        preset,
        clearable = false,
    } = defineProps<{
        tag?: 'input' | 'textarea'
        label?: string
        filled?: boolean
        preset?: string
        clearable?: boolean,
    }>()

    const emit = defineEmits<{
        (e: 'focus'): void
        (e: 'blur'): void
        (e: 'clear'): void
        (e: 'update:modelValue', val: any): void
    }>()

    const value = defineModel<string | number | undefined | null>()

    const inputRef = shallowRef<HTMLElement>()
    const attrs = useAttrs()
    const slots = useSlots()

    const focused = defineModel<boolean>('focused', { default: false })
    const hasValue = computed(() => filled || !!unref(value))
    const showClearBtn = computed(() => clearable && focused.value && unref(hasValue))

    const classes = computed(() => ({
        'c-field--focused': focused.value,
        'c-field--filled': unref(hasValue),
        'c-field--has-prepend': !!slots.prepend,
    }))

    const focus = () => {
        if (attrs.readonly || attrs.disabled) {
            return
        }

        emit('focus')
    }

    const onClick = () => {
        focus()
        unref(inputRef)?.focus()
    }

    const blur = () => {
        emit('blur')
    }

    const clear = () => {
        emit('clear')
        value.value = ''
    }

    const input = (e: InputEvent) => {
        value.value = (e.target as HTMLInputElement).value
    }

    onMounted(() => {
        if (focused.value) unref(inputRef)?.focus()
    })

</script>
<template>
    <div
        class="c-field"
        :class="classes"
        @click="onClick"
    >
        <div
            v-if="$slots.prepend"
            class="c-field__prepend"
        >
            <slot name="prepend" />
        </div>
        <div class="c-field__core">
            <c-label
                :id="`${$attrs.id}-label`"
                class="c-field-label"
            >
                {{ label }}
            </c-label>
            <slot name="before" />
            <component
                :is="tag"
                v-bind="$attrs"
                ref="inputRef"
                v-model="value"
                class="c-field-input"
                :value="value"
                @input="input"
                @blur="blur"
                @focus="focus"
            />
            <slot name="after" />
        </div>
        <transition name="fade">
            <div
                v-if="showClearBtn"
                class="c-field__clear"
            >
                <slot name="clear">
                    <c-icon
                        :name="IconAliases.CLOSE"
                        :size="24"
                        @click="clear"
                    />
                </slot>
            </div>
        </transition>
        <div
            v-if="$slots.append"
            class="c-field__append"
        >
            <slot name="append" />
        </div>
    </div>
</template>

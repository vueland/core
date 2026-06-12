<script setup lang="ts">
    import { computed, onMounted, shallowRef, unref, useAttrs, useSlots } from 'vue'

    import { useFieldPresets } from '../../composables/use-field-presets'
    import { IconAliases } from '../../enums'

    import type { CFieldProps } from './types'

    defineOptions({
        name: 'CField',
        inheritAttrs: false,
    })

    const props = defineProps<CFieldProps>()

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

    const presets = useFieldPresets({ slots, props, attrs})
    const hasValue = computed(() => props.filled || !!unref(value))
    const showClearBtn = computed(() => props.clearable && props.focused && unref(hasValue))

    const classes = computed(() => [
        {
            'c-field--focused': props.focused,
            'c-field--filled': unref(hasValue),
            'c-field--has-prepend': !!slots.prepend,
            'c-field--default': !props.focused && !props.error,
        },
        ...unref(presets).root
    ])

    const focus = () => {
        if (attrs.disabled) {
            return
        }

        emit('focus')
    }

    const onClick = () => {
        focus()
        unref(inputRef)!.focus()
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
        if (props.focused) unref(inputRef)?.focus()
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
            :class="presets.prepend"
        >
            <slot name="prepend" />
        </div>
        <div class="c-field__core">
            <c-label
                :id="`${$attrs.id}-label`"
                :for="$attrs.id"
                tag="label"
                class="c-field-label"
                :class="presets.label"
            >
                {{ label }}
            </c-label>
            <slot name="before" />
            <component
                :is="tag ?? 'input'"
                v-bind="$attrs"
                ref="inputRef"
                v-model="value"
                class="c-field-input"
                :class="presets.input"
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
            :class="presets.append"
        >
            <slot name="append" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, onMounted, shallowRef, unref, useAttrs } from 'vue'

    defineOptions({
        name: 'CField',
    })

    const {
        tag = 'input',
        focused
    } = defineProps<{
        tag?: 'input' | 'textarea'
        focused?: boolean
    }>()

    const emit = defineEmits<{
        (e: 'focus'): void
    }>()

    const input = defineModel<string | number | undefined>()
    const inputRef = shallowRef<HTMLElement>()
    const attrs = useAttrs()

    const classes = computed(() => ({
        'c-field--focused': focused,
        'c-field--filled': !!unref(input),
    }))

    const onFocus = () => {
        if (attrs.readonly || attrs.disabled) {
            return
        }

        emit('focus')
    }

    const onInput = (e: InputEvent) => {
        input.value = (e.target as HTMLInputElement).value
    }

    onMounted(() => {
        if (focused) unref(inputRef)?.focus()
    })

</script>
<template>
    <component
        :is="tag"
        ref="inputRef"
        class="c-field"
        :class="classes"
        :value="input"
        @input="onInput"
        @focus="onFocus"
    />
</template>

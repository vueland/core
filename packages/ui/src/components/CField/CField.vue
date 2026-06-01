<script setup lang="ts">
    import { computed, onMounted, shallowRef, unref } from 'vue'

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

    const input = defineModel<string | number | undefined>()
    const inputRef = shallowRef<HTMLElement>()

    const classes = computed(() => ({
        'c-field--focused': focused,
        'c-field--filled': !!unref(input),
    }))

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
    />
</template>

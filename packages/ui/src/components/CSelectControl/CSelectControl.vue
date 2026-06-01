<script setup lang="ts" generic="T">
    import { computed, unref } from 'vue'
    import { isDef } from '../../helpers'
    import type { CSelectControlProps, CSelectControlSlots } from './types'

    defineSlots<CSelectControlSlots>()

    const {
        modelValue,
        value,
        disabled,
        readonly,
    } = defineProps<CSelectControlProps>()

    const model = defineModel<T | T[] | boolean>({ default: false })

    const { isArray } = Array

    const isInArray = computed(() => isArray(modelValue) && modelValue.includes(value))
    const isEqual = computed(() => value === model.value)

    const checked = computed(() => {
        return isDef(value) ? (unref(isInArray) || unref(isEqual)) : !!unref(model)
    })

    function checkOn() {
        if (isArray(modelValue)) {
            model.value = [...modelValue, value]
        } else {
            model.value = isDef(value) ? value : !modelValue
        }
    }

    function checkOff() {
        if (isArray(modelValue)) {
            model.value = (modelValue as T[]).filter(it => it !== value)
        } else {
            model.value = (isDef(value) ? null : !modelValue) as T
        }
    }

    function toggle() {
        if (disabled || readonly) {
            return
        }

        if (unref(checked)) {
            return checkOff()
        }

        checkOn()
    }
</script>
<template>
    <slot
        :checked
        :disabled
        :readonly
        :toggle
    />
</template>

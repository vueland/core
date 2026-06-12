<script setup lang="ts" generic="T">
    import { CSelectControl } from '../CSelectControl'

    import CheckboxElement from './CheckboxElement.vue'
    import type { CCheckboxProps, CCheckboxSlots } from './types'

    defineOptions({
        name: 'CCheckbox',
        inheritAttrs: false,
    })
    defineSlots<CCheckboxSlots>()
    defineProps<CCheckboxProps<T>>()

    const model = defineModel<T>()

</script>
<template>
    <c-select-control
        v-slot="{checked, toggle}"
        v-model="model"
        :value="$attrs.value"
    >
        <c-input
            :model-value="model"
            v-bind="$attrs"
            kind="checkbox"
        >
            <template #field="{uid, label, attrs, hasError}">
                <checkbox-element
                    :id="uid"
                    :error="hasError"
                    :label
                    :checked
                    v-bind="attrs"
                    @toggle="toggle"
                >
                    <slot />
                </checkbox-element>
            </template>
            <template #details="{uid, errorMessage, details}">
                <span
                    :id="`${uid}-details`"
                    :key="errorMessage || details"
                >
                    {{ errorMessage || details }}
                </span>
            </template>
        </c-input>
    </c-select-control>
</template>

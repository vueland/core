<script setup lang="ts" generic="T">
    import { computed, onBeforeUnmount, onMounted } from 'vue'
    import { CIcon } from '../CIcon'
    import { CLabel } from '../CLabel'
    import { CSelectControl } from '../CSelectControl'
    import { useForm, useValidate } from '../../composables'
    import { IconAliases } from '../../enums'
    import type { CCheckboxProps, CCheckboxSlots } from './types'

    defineOptions({
        name: 'CCheckbox',
    })

    defineSlots<CCheckboxSlots>()

    const props = defineProps<CCheckboxProps<T>>()
    const model = defineModel<T>()

    const { validate, errors } = useValidate(props, {} as any)
    const form = useForm()

    const { CHECKBOX_ON, CHECKBOX_OFF } = IconAliases

    const classes = computed(() => ({
        'c-checkbox--error': errors.hasError
    }))

    onMounted(() => {
        form?.add(validate)
    })

    onBeforeUnmount(() => {
        form?.remove(validate)
    })

</script>
<template>
    <c-select-control
        v-slot="{checked, toggle, disabled}"
        v-bind="$attrs"
        v-model="model"
    >
        <div
            class="c-checkbox"
            :class="classes"
            role="checkbox"
            :aria-checked="checked"
            :aria-disabled="disabled"
            @click="toggle"
        >
            <div class="c-checkbox__icon">
                <slot
                    name="icon"
                    :checked
                >
                    <c-icon :name="checked ? CHECKBOX_ON : CHECKBOX_OFF" />
                </slot>
            </div>

            <div class="c-checkbox__label">
                <slot>
                    <c-label v-memo="[label]">
                        {{ label }}
                    </c-label>
                </slot>
            </div>
        </div>
    </c-select-control>
</template>

<script setup lang="ts">
    import { CInput } from '../CInput'
    import { CField } from '../CField'
    import { useFieldAttrs } from '../../composables'

    defineOptions({
        name: 'CTextField',
    })

    const fieldAttrs = useFieldAttrs()
    const model = defineModel<string | number>()
</script>

<template>
    <c-input
        v-model="model"
        v-bind="$attrs"
    >
        <template #field="{onFocus, onInput, onBlur, focused, presets}">
            <div
                class="c-text-field"
                :class="presets"
            >
                <c-field
                    v-model="model"
                    class="c-text-field__input"
                    v-bind="fieldAttrs"
                    :focused
                    @focus="onFocus"
                    @input="onInput"
                    @blur="onBlur"
                />
            </div>
        </template>
        <template #details="{errorMessage}">
            <span class="c-text-field__details">{{ errorMessage }}</span>
        </template>
        <template
            v-for="(_, slotName) in $slots"
            #[slotName]="data"
        >
            <slot
                :name="slotName"
                v-bind="data"
            />
        </template>
    </c-input>
</template>

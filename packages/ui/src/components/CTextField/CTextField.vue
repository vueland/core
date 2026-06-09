<script setup lang="ts">
    import { CField } from '../CField'
    import { CInput } from '../CInput'

    defineOptions({
        name: 'CTextField',
    })

    const model = defineModel<string | number | undefined | null>()

    function onClear() {
        model.value = undefined
    }
</script>

<template>
    <c-input
        :model-value="model"
        v-bind="$attrs"
        @clear="onClear"
    >
        <template #field="{focus, input, blur, focused, preset, attrs, uid}">
            <div
                class="c-text-field"
                :class="preset"
            >
                <c-field
                    :id="uid"
                    v-model="model"
                    class="c-text-field__input"
                    :focused
                    v-bind="attrs"
                    @focus="focus"
                    @input="input"
                    @blur="blur"
                />
            </div>
        </template>
        <template #details="{errorMessage, details}">
            <span
                :key="errorMessage || details"
                class="c-text-field__details"
            >
                {{ errorMessage || details }}
            </span>
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

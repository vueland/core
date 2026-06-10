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
    >
        <template #field="{focus, input, blur, focused, preset, attrs, uid, label, clearable}">
            <div
                class="c-text-field"
                :class="preset"
            >
                <c-field
                    :id="uid"
                    v-model="model"
                    :focused
                    :label
                    :clearable
                    v-bind="attrs"
                    @focus="focus"
                    @input="input"
                    @blur="blur"
                    @clear="onClear"
                >
                    <template
                        v-if="$slots.prepend"
                        #prepend
                    >
                        <slot name="prepend" />
                    </template>
                    <template
                        v-if="$slots.append"
                        #append
                    >
                        <slot name="prepend" />
                    </template>
                </c-field>
            </div>
        </template>
        <template #details="{errorMessage, details}">
            <slot
                name="details"
                :error-message
                :details
            >
                <span
                    :key="errorMessage || details"
                    class="c-text-field__details"
                >
                    {{ errorMessage || details }}
                </span>
            </slot>
        </template>
    </c-input>
</template>

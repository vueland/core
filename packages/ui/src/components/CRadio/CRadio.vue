<script setup lang="ts" generic="T">
    defineOptions({
        name: 'CRadio',
    })

    defineProps<{
        label?: string
    }>()

    const model = defineModel<T>()
</script>
<template>
    <c-select-control
        v-slot="{ disabled, checked, toggle, readonly }"
        v-model="model"
        v-bind="$attrs"
    >
        <div
            class="c-radio"
            :class="{
                'c-radio--disabled': disabled,
                'c-radio--checked': checked,
                'c-radio--readonly': readonly,
            }"
            @click="toggle"
        >
            <div class="c-radio__label">
                <slot>
                    <c-label v-memo="[label]">
                        {{ label }}
                    </c-label>
                </slot>
            </div>
        </div>
    </c-select-control>
</template>

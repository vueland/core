<script setup lang="ts" generic="T">
    import { shallowRef, unref, watch } from 'vue'
    import { CInput } from '../CInput'
    import { CMenu } from '../CMenu'
    import { CField } from '../CField'
    import { CItems } from '../CItems'
    import { useAutocomplete } from '../../composables'
    import type { CAutocompleteProps, CAutocompleteSlots } from './types'
    import { IconAliases } from '../../enums'

    defineOptions({
        name: 'CAutocomplete',
    })

    const props = defineProps<CAutocompleteProps<T>>()

    const emit = defineEmits<{
        'update:search': [val: string],
    }>()

    defineSlots<CAutocompleteSlots<T>>()

    const { input, searchItems, rollbackValue } = useAutocomplete(props)
    const inputRef = shallowRef()

    const model = defineModel<T | T[]>({
        get: () => props.modelValue,
        set: val => val
    })

    function onCloseMenu() {
        unref(inputRef).onBlur()
    }

    function onSelect(value: T) {
        if (props.multiple) {
            model.value = [...model.value as T[], value]
            return
        }

        model.value = value
    }

    watch(input, (val) => {
        emit('update:search', unref(input))

        if (!val) {
            model.value = props.multiple ? [] : undefined
        }
    })

</script>
<template>
    <c-input
        ref="inputRef"
        v-model="model"
        v-bind="$attrs"
        validate-on="blur"
    >
        <template #field="{onInput, onFocus, focused, presets, readonly, attrs, uid}">
            <c-menu
                bottom
                open-on-focus
                close-on-click-outside
                :close-on-content-click="!multiple"
                :offset-y="2"
                strategy="reverse"
                :preset="options?.menuPreset"
                @close="onCloseMenu"
                @open="rollbackValue"
            >
                <template #activator="{on, activator}">
                    <div
                        class="c-autocomplete"
                        v-bind="activator"
                        :class="presets"
                    >
                        <c-field
                            :id="uid"
                            v-model="input"
                            class="c-autocomplete__field"
                            type="text"
                            :focused
                            v-bind="attrs"
                            :readonly
                            v-on="on"
                            @focus="onFocus"
                            @input="onInput"
                        />
                    </div>
                </template>
                <template #default>
                    <slot
                        name="menu"
                        :on-select="onSelect"
                        :items="searchItems"
                    >
                        <c-items
                            v-model="model"
                            :options="options"
                            :items="searchItems"
                            :multiple
                            mandatory
                        >
                            <template #no-items-message>
                                <slot name="no-items-message">
                                    {{ options?.noItemsMessage ?? 'Нет совпадений' }}
                                </slot>
                            </template>
                        </c-items>
                    </slot>
                </template>
            </c-menu>
        </template>
        <template #append>
            <c-icon
                :name="IconAliases.DROPDOWN"
                size="20"
            />
        </template>
        <template #details="{errorMessage}">
            <span>{{ errorMessage }}</span>
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

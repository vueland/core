<script setup lang="ts" generic="T">
    import { shallowRef, unref, watch } from 'vue'

    import { useAutocomplete } from '../../composables'
    import { IconAliases } from '../../enums'
    import { CField } from '../CField'
    import { CInput } from '../CInput'
    import { CItems } from '../CItems'
    import { CMenu } from '../CMenu'

    import type { CAutocompleteProps, CAutocompleteSlots } from './types'

    defineOptions({
        name: 'CAutocomplete',
    })

    const props = defineProps<CAutocompleteProps<T>>()

    const emit = defineEmits<{
        'update:search': [val: string],
    }>()

    defineSlots<CAutocompleteSlots<T>>()

    const {
        inputValue,
        searchItems,
        hasValue,
        items: selectedItems,
        select
    } = useAutocomplete(props)

    const inputRef = shallowRef()
    const fieldRef = shallowRef()

    const model = defineModel<T | T[]>({
        get: () => props.modelValue,
        set: val => val
    })

    function clear() {
        model.value = props.multiple ? [] : undefined
    }

    function onBackspaceDown() {
        const data = unref(model) as T[]

        model.value = props.multiple
            ? data.slice(0, -1)
            : undefined
    }

    function onKeyDown(e: KeyboardEvent) {
        if (unref(inputValue)) {
            return
        }

        if (e.code === 'Backspace') {
            onBackspaceDown()
        }
    }

    function focus() {
        unref(inputRef).focus()
        unref(fieldRef).$el.focus()
    }

    function blur() {
        unref(inputRef).blur()
    }

    watch(inputValue, () => {
        emit('update:search', unref(inputValue))
    })

</script>
<template>
    <c-input
        ref="inputRef"
        :model-value="model"
        v-bind="$attrs"
    >
        <template #field="field">
            <c-menu
                :id="`${field.uid}-menu`"
                bottom
                open-on-focus
                close-on-click-outside
                :close-on-content-click="!multiple"
                :offset-y="2"
                strategy="reverse"
                :activator="field.activator"
                :preset="options?.menuPreset"
                @close="blur"
            >
                <template #activator="{on}">
                    <div
                        class="c-autocomplete"
                        :class="field.preset"
                    >
                        <slot
                            name="field"
                            v-bind="field"
                        >
                            <c-field
                                :id="field.uid"
                                ref="fieldRef"
                                v-model="inputValue"
                                v-bind="field.attrs"
                                class="c-autocomplete__field"
                                :label="field.label"
                                :clearable="field.clearable"
                                :focused="field.focused"
                                :readonly="field.readonly"
                                :filled="hasValue"
                                :aria-controls="`${field.uid}-menu`"
                                :aria-expanded="field.focused"
                                v-on="on"
                                @input="field.input"
                                @focus="focus"
                                @keydown="onKeyDown"
                                @clear="clear"
                            >
                                <template #prepend>
                                    <slot name="prepend" />
                                </template>
                                <template #append>
                                    <slot name="append">
                                        <c-icon
                                            :name="IconAliases.DROPDOWN"
                                            size="20"
                                        />
                                    </slot>
                                </template>
                                <template #before>
                                    <slot
                                        name="selects"
                                        :items="selectedItems"
                                    >
                                        <div
                                            v-for="(it, i) in selectedItems"
                                            :key="it"
                                            class="c-autocomplete__item"
                                        >
                                            {{ `${it}` + (i + 1 !== selectedItems.length ? ',' : '') }}
                                        </div>
                                    </slot>
                                </template>
                            </c-field>
                        </slot>
                    </div>
                </template>
                <template #default>
                    <slot
                        name="menu"
                        :on-select="select"
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
        <template #details="{errorMessage, details}">
            <slot
                name="details"
                :error-message
                :details
            >
                <span :key="errorMessage || details">
                    {{ errorMessage || details }}
                </span>
            </slot>
        </template>
    </c-input>
</template>

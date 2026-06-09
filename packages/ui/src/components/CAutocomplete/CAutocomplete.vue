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
        selectedItems,
    } = useAutocomplete(props)

    const inputRef = shallowRef()
    const fieldRef = shallowRef()
    const menuRef = shallowRef()

    const model = defineModel<T | T[]>({
        get: () => props.modelValue,
        set: val => val
    })

    function closeMenu() {
        unref(inputRef).blur()
        unref(menuRef).close()
    }

    function onSelect(value: T) {
        if (props.multiple) {
            model.value = [...model.value as T[], value]
            return
        }

        model.value = value
        unref(inputRef).blur()
    }

    function clear() {
        model.value = props.multiple ? [] : undefined
    }

    function onKeyDown(e: KeyboardEvent) {
        if (unref(inputValue)) {
            return
        }

        if (e.code === 'Backspace' && props.multiple) {
            const data = unref(model) as T[]
            model.value = data.slice(0, -1)
        }
    }

    function focus() {
        unref(inputRef).focus()
        unref(fieldRef).$el.focus()
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
        @clear="clear"
    >
        <template #field="{input, blur, focused, preset, readonly, attrs, uid, activator}">
            <c-menu
                :id="`${uid}-menu`"
                ref="menuRef"
                bottom
                open-on-focus
                close-on-click-outside
                :close-on-content-click="!multiple"
                :offset-y="2"
                strategy="reverse"
                :activator
                :preset="options?.menuPreset"
                @close="blur"
            >
                <template #activator="{on}">
                    <div
                        class="c-autocomplete"
                        :class="preset"
                        @click="focus"
                    >
                        <div class="c-autocomplete__box">
                            <div
                                v-for="it in selectedItems"
                                :key="it"
                                class="c-autocomplete__item"
                            >
                                {{ it }},
                            </div>
                            <c-field
                                :id="uid"
                                ref="fieldRef"
                                v-model="inputValue"
                                class="c-autocomplete__field"
                                type="text"
                                :focused
                                v-bind="attrs"
                                :readonly
                                :aria-controls="`${uid}-menu`"
                                :aria-expanded="focused"
                                v-on="on"
                                @input="input"
                                @keydown="onKeyDown"
                            />
                        </div>
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
        <template #details="{errorMessage, details}">
            <span :key="errorMessage || details">
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

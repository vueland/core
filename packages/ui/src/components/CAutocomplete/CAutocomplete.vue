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

    const { inputValue, searchItems, rollbackValue } = useAutocomplete(props)
    const inputRef = shallowRef()

    const model = defineModel<T | T[]>({
        get: () => props.modelValue,
        set: val => val
    })

    function closeMenu() {
        unref(inputRef).blur()
        rollbackValue()
    }

    function onSelect(value: T) {
        if (props.multiple) {
            model.value = [...model.value as T[], value]
            return
        }

        model.value = value
        closeMenu()
    }

    watch(inputValue, (val) => {
        emit('update:search', unref(inputValue))

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
    >
        <template #field="{input, focus, focused, preset, readonly, attrs, uid}">
            <c-menu
                :id="`${uid}-menu`"
                bottom
                open-on-focus
                close-on-click-outside
                :close-on-content-click="!multiple"
                :offset-y="2"
                strategy="reverse"
                :preset="options?.menuPreset"
                @close="closeMenu"
                @open="rollbackValue"
            >
                <template #activator="{on, activator}">
                    <div
                        class="c-autocomplete"
                        v-bind="activator"
                        :class="preset"
                    >
                        <c-field
                            :id="uid"
                            v-model="inputValue"
                            class="c-autocomplete__field"
                            type="text"
                            :focused
                            v-bind="attrs"
                            :readonly
                            :aria-controls="`${uid}-menu`"
                            :aria-expanded="focused"
                            v-on="on"
                            @focus="focus"
                            @input="input"
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

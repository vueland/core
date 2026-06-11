<script setup lang="ts" generic="T">
    import { shallowRef, unref } from 'vue'

    import { useKeyboard, useSelects } from '../../composables'
    import { IconAliases } from '../../enums'
    import { CField } from '../CField'
    import { CInput } from '../CInput'
    import { CItems } from '../CItems'
    import { CMenu } from '../CMenu'

    import type { CSelectProps, CSelectSlots } from './types'

    defineOptions({ name: 'CSelect' })
    defineSlots<CSelectSlots<T>>()

    const props = defineProps<CSelectProps<T>>()
    const model = defineModel<T | T[]>({
        get: () => props.modelValue,
        set: val => val
    })

    const inputRef = shallowRef()
    const menuRef = shallowRef()

    const { items: selectedItems, hasValue, select } = useSelects(props)

    const { onKeydown } = useKeyboard({
        Tab: () => {
            unref(inputRef).blur()
            unref(menuRef).close()
        }
    })

    function onBlur() {
        unref(inputRef).blur()
    }

    function onClear() {
        model.value = props.multiple ? [] : undefined
    }

    function onFocus() {
        unref(inputRef).focus()
    }
</script>
<template>
    <c-input
        v-bind="$attrs"
        ref="inputRef"
        :model-value="model"
        validate-on="blur"
        role="listbox"
    >
        <template #field="field">
            <c-menu
                :id="`${field.uid}-menu`"
                ref="menuRef"
                bottom
                open-on-focus
                close-on-click-outside
                :close-on-content-click="!multiple"
                :offset-y="2"
                strategy="reverse"
                @close="onBlur"
            >
                <template #activator="{on, activator}">
                    <div
                        class="c-select"
                        v-bind="activator"
                    >
                        <slot
                            name="field"
                            v-bind="field"
                        >
                            <c-field
                                :id="field.uid"
                                v-bind="field.attrs"
                                :focused="field.focused"
                                model-value=""
                                class="c-select__field"
                                :label="field.label"
                                :clearable="field.clearable"
                                :filled="hasValue"
                                :preset="field.preset"
                                readonly
                                v-on="on"
                                @focus="onFocus"
                                @clear="onClear"
                                @keydown="onKeydown"
                            >
                                <template #before>
                                    <slot
                                        name="selects"
                                        :items="selectedItems"
                                    >
                                        <div
                                            v-for="(it, i) in selectedItems"
                                            :key="it"
                                            class="c-selected__item"
                                        >
                                            {{ `${it}` + (i + 1 !== selectedItems.length ? ',' : '') }}
                                        </div>
                                    </slot>
                                </template>
                                <template #append>
                                    <c-icon
                                        :name="IconAliases.DROPDOWN"
                                        size="20"
                                    />
                                </template>
                            </c-field>
                        </slot>
                    </div>
                </template>
                <template #default>
                    <slot
                        name="menu"
                        :on-select="select"
                        :items
                    >
                        <c-items
                            v-model="model"
                            :items
                            :options
                            :multiple
                            mandatory
                        />
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


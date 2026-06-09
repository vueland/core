<script setup lang="ts" generic="T">
    import { shallowRef, unref } from 'vue'

    import { useSelects } from '../../composables'
    import { IconAliases } from '../../enums'
    import { CField } from '../CField'
    import { CInput } from '../CInput'
    import { CItems } from '../CItems'
    import { CMenu } from '../CMenu'

    import type { CSelectProps, CSelectSlots } from './types'

    defineOptions({
        name: 'CSelect',
    })

    defineSlots<CSelectSlots<T>>()
    const props = defineProps<CSelectProps<T>>()

    const inputRef = shallowRef()

    const model = defineModel<T | T[]>({
        get: () => props.modelValue,
        set: val => val
    })

    const { items: selectedItems, hasValue, select } = useSelects(props)

    function closeMenu() {
        unref(inputRef).blur()
    }

    function onClear() {
        if (props.multiple) {
            model.value = []
        } else {
            model.value = undefined
        }
    }
</script>
<template>
    <c-input
        v-bind="$attrs"
        ref="inputRef"
        :model-value="model"
        validate-on="blur"
    >
        <template #field="{focus, focused, preset, attrs, uid, activator, label, clearable}">
            <c-menu
                :id="`${uid}-menu`"
                bottom
                open-on-focus
                close-on-click-outside
                :close-on-content-click="!multiple"
                :offset-y="2"
                strategy="reverse"
                :activator
                @close="closeMenu"
            >
                <template #activator="{on}">
                    <div
                        class="c-select"
                        :class="preset"
                    >
                        <c-field
                            :id="uid"
                            v-bind="attrs"
                            class="c-select__field"
                            :focused
                            :label
                            :clearable
                            :filled="hasValue"
                            readonly
                            :aria-controls="`${uid}-menu`"
                            :aria-expanded="focused"
                            v-on="on"
                            @focus="focus"
                            @clear="onClear"
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


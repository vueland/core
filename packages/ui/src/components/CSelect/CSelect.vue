<script setup lang="ts" generic="T">
    import { shallowRef, unref } from 'vue'

    import { useInputValue } from '../../composables'
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

    const inputValue = useInputValue(props)

    function closeMenu() {
        unref(inputRef).blur()
    }

    function onSelect(value: T) {
        if (props.multiple) {
            model.value = [...model.value as T[], value]
            return
        }

        model.value = value
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
        @clear="onClear"
    >
        <template #field="{focus, focused, preset, attrs, uid, activator}">
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
                            class="c-select__field"
                            v-bind="attrs"
                            :model-value="inputValue"
                            :focused
                            readonly
                            :aria-controls="`${uid}-menu`"
                            :aria-expanded="focused"
                            v-on="on"
                            @focus="focus"
                        />
                    </div>
                </template>
                <template #default>
                    <slot
                        name="menu"
                        :on-select="onSelect"
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


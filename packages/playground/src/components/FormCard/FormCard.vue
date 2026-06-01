<script setup lang="ts">
    import { markRaw, ref, shallowRef, unref, watchEffect } from 'vue'
    import { IconAliases } from '@vueland/ui/enums/IconName'
    import { useCore } from '@vueland/ui/composables'

    const core = useCore()

    const professions = [
        { title: 'Frontend' },
        { title: 'Backend' },
        { title: 'DevOPS' },
        { title: 'Security' },
    ]

    const levels = [
        { title: 'Junior' },
        { title: 'Middle' },
        { title: 'Senior' },
        { title: 'Lead' },
    ]

    const form = ref({
        name: '',
        level: [],
        profession: [],
        radius: null
    })

    const checkbox = shallowRef(false)
    const formRef = shallowRef()

    const nameRules = markRaw([
        (val: string) => ({
            valid: val.trim().length >= 3,
            message: 'Не менее 3-х символов'
        })
    ])

    const professionRules = markRaw([
        () => ({
            valid: unref(form).profession.length > 0,
            message: 'Обязательное поле'
        })
    ])

    const checkboxRules = markRaw([
        () => ({
            valid: checkbox.value,
            message: 'oops'
        })
    ])

    const onSend = () => {
        unref(formRef).validate()
    }


    const radiusItems = [
        {name: '2px', value: 'r-[2px]'},
        {name: '4px', value: 'r-[4px]'},
        {name: '6px', value: 'r-[6px]'},
        {name: '8px', value: 'r-[8px]'},
        {name: '10px', value: 'r-[10px]'},
        {name: '12px', value: 'r-[12px]'},
        {name: '14px', value: 'r-[14px]'},
        {name: '16px', value: 'r-[16px]'},
        {name: '18px', value: 'r-[18px]'},
    ]

    const currentPreset = shallowRef('input.A')

    const onClick = () => {
        core.presets.input.E = {
            root: [],
            label: ['text-blue-lighten-2']
        }

        currentPreset.value = 'input.E'
    }

    watchEffect(() => {
        console.log(unref(checkbox))
    })

</script>
<template>
    <c-card class="elevation-2">
        <c-card-header @click="onClick" class="text-uppercase text-blue-darken-3">
            <h2 class="xl:fs-xl lg:fs-xl md:fs-xl sm:fs-md">Form Card Example</h2>
        </c-card-header>
        <c-card-body>
            <c-form ref="formRef">
                <c-text-field
                    v-model="form.name"
                    label="Name"
                    :rules="nameRules"
                    validate-on="input"
                    class="form-name"
                    :preset="currentPreset"
                    placeholder="введите текст"
                    min="3"
                    max="5"
                />
                <c-select
                    v-model="form.radius"
                    label="Radius"
                    validate-on="input"
                    class="form-name mt-4"
                    preset="input.A"
                    :items="radiusItems"
                    placeholder="введите текст"
                    :options="{
                        extKey: 'name'
                    }"
                    min="3"
                    max="5"
                />
                <c-autocomplete
                    v-model="form.profession"
                    label="Profession"
                    class="mt-4 profession"
                    placeholder="введите текст"
                    name="profession"
                    :items="professions"
                    :rules="professionRules"
                    multiple
                    :options="{
                        extKey: 'title',
                        noItemsMessage: 'Нет совпадений',
                        menuPreset: 'menu.A',
                    }"
                >
                    <template #prepend>
                        <c-icon
                            :name="IconAliases.CALENDAR"
                            size="20"
                        />
                    </template>
                </c-autocomplete>
                <c-select
                    v-model="form.level"
                    :items="levels"
                    placeholder="выберите пункт"
                    class="mt-4"
                    :options="{
                        extKey: 'title',
                    }"
                    label="Select"
                />
                <c-checkbox v-model="checkbox" :rules="checkboxRules">
                    Check it required
                </c-checkbox>
            </c-form>
        </c-card-body>
        <c-card-footer>
            <c-btn
                variant="flat"
                class="elevation-2 w-100 text-white radius-6"
                :class="form.radius?.value"
                @click="onSend"
            >
                ОТПРАВИТЬ
            </c-btn>
        </c-card-footer>
    </c-card>
</template>
<style lang="scss" scoped>
    .profession {
        //--input-field-text-color: red;
    }
</style>

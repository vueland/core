<script setup lang="ts">
    import { ref } from 'vue'
    import DemoBlock from '../../../.vitepress/components/DemoBlock.vue'
    import { CTextField, CAutocomplete } from '@vueland/ui/components'

    const form = ref({
        name: '',
        profession: null,
    })

    const professions = [
        'Frontend',
        'Backend',
        "QA",
        "Security",
        "DevOPS",
        "SA"
    ]
</script>
<template>
    <demo-block class="pa-4">
        <c-text-field
            v-model="form.name"
            label="Name"
            class="name"
        />
        <c-autocomplete
            v-model="form.profession"
            :items="professions"
            label="Profession"
            class="profession"
            :options="{
                menuClass: 'bg-grey-darken-3 text-white',
            }"
        />
    </demo-block>
</template>
<style lang="scss" scoped>
    .name, .profession {
        --input-field-text-color: white;
        background-color: #282828;
    }
</style>

<script setup>
    import DefaultTheme from 'vitepress/theme'
    import {CApp} from '@vueland/ui/components'

    const {Layout} = DefaultTheme
</script>

<template>
    <c-app class="bg-grey-darken-4">
        <slot />
        <Layout class="bg-grey-darken-4" />
    </c-app>
</template>

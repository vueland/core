<script setup lang="ts">
    type Tone = {
        key: string
        className: string
    }

    type PaletteGroup = {
        name: string
        tones: Tone[]
    }

    const palette: PaletteGroup[] = [
        {
            name: 'red',
            tones: [
                { key: 'lighten-5', className: 'bg-red-lighten-5 text-black' },
                { key: 'lighten-4', className: 'bg-red-lighten-4 text-black' },
                { key: 'lighten-3', className: 'bg-red-lighten-3 text-black' },
                { key: 'lighten-2', className: 'bg-red-lighten-2 text-black' },
                { key: 'lighten-1', className: 'bg-red-lighten-1 text-white' },
                { key: 'base', className: 'bg-red text-white' },
                { key: 'darken-1', className: 'bg-red-darken-1 text-white' },
                { key: 'darken-2', className: 'bg-red-darken-2 text-white' },
                { key: 'darken-3', className: 'bg-red-darken-3 text-white' },
                { key: 'darken-4', className: 'bg-red-darken-4 text-white' },
                { key: 'accent-1', className: 'bg-red-accent-1 text-black' },
                { key: 'accent-2', className: 'bg-red-accent-2 text-white' },
                { key: 'accent-3', className: 'bg-red-accent-3 text-white' },
                { key: 'accent-4', className: 'bg-red-accent-4 text-white' },
            ]
        },
        {
            name: 'pink',
            tones: [
                { key: 'lighten-5', className: 'bg-pink-lighten-5 text-black' },
                { key: 'lighten-4', className: 'bg-pink-lighten-4 text-black' },
                { key: 'lighten-3', className: 'bg-pink-lighten-3 text-black' },
                { key: 'lighten-2', className: 'bg-pink-lighten-2 text-black' },
                { key: 'lighten-1', className: 'bg-pink-lighten-1 text-white' },
                { key: 'base', className: 'bg-pink text-white' },
                { key: 'darken-1', className: 'bg-pink-darken-1 text-white' },
                { key: 'darken-2', className: 'bg-pink-darken-2 text-white' },
                { key: 'darken-3', className: 'bg-pink-darken-3 text-white' },
                { key: 'darken-4', className: 'bg-pink-darken-4 text-white' },
                { key: 'accent-1', className: 'bg-pink-accent-1 text-black' },
                { key: 'accent-2', className: 'bg-pink-accent-2 text-white' },
                { key: 'accent-3', className: 'bg-pink-accent-3 text-white' },
                { key: 'accent-4', className: 'bg-pink-accent-4 text-white' },
            ]
        },
        {
            name: 'purple',
            tones: [
                { key: 'lighten-5', className: 'bg-purple-lighten-5 text-black' },
                { key: 'lighten-4', className: 'bg-purple-lighten-4 text-black' },
                { key: 'lighten-3', className: 'bg-purple-lighten-3 text-black' },
                { key: 'lighten-2', className: 'bg-purple-lighten-2 text-black' },
                { key: 'lighten-1', className: 'bg-purple-lighten-1 text-white' },
                { key: 'base', className: 'bg-purple text-white' },
                { key: 'darken-1', className: 'bg-purple-darken-1 text-white' },
                { key: 'darken-2', className: 'bg-purple-darken-2 text-white' },
                { key: 'darken-3', className: 'bg-purple-darken-3 text-white' },
                { key: 'darken-4', className: 'bg-purple-darken-4 text-white' },
                { key: 'accent-1', className: 'bg-purple-accent-1 text-black' },
                { key: 'accent-2', className: 'bg-purple-accent-2 text-white' },
                { key: 'accent-3', className: 'bg-purple-accent-3 text-white' },
                { key: 'accent-4', className: 'bg-purple-accent-4 text-white' },
            ]
        },
        {
            name: 'deep-purple',
            tones: [
                { key: 'lighten-5', className: 'bg-deep-purple-lighten-5 text-black' },
                { key: 'lighten-4', className: 'bg-deep-purple-lighten-4 text-black' },
                { key: 'lighten-3', className: 'bg-deep-purple-lighten-3 text-black' },
                { key: 'lighten-2', className: 'bg-deep-purple-lighten-2 text-black' },
                { key: 'lighten-1', className: 'bg-deep-purple-lighten-1 text-white' },
                { key: 'base', className: 'bg-deep-purple text-white' },
                { key: 'darken-1', className: 'bg-deep-purple-darken-1 text-white' },
                { key: 'darken-2', className: 'bg-deep-purple-darken-2 text-white' },
                { key: 'darken-3', className: 'bg-deep-purple-darken-3 text-white' },
                { key: 'darken-4', className: 'bg-deep-purple-darken-4 text-white' },
                { key: 'accent-1', className: 'bg-deep-purple-accent-1 text-black' },
                { key: 'accent-2', className: 'bg-deep-purple-accent-2 text-white' },
                { key: 'accent-3', className: 'bg-deep-purple-accent-3 text-white' },
                { key: 'accent-4', className: 'bg-deep-purple-accent-4 text-white' },
            ]
        },
        {
            name: 'indigo',
            tones: [
                { key: 'lighten-5', className: 'bg-indigo-lighten-5 text-black' },
                { key: 'lighten-4', className: 'bg-indigo-lighten-4 text-black' },
                { key: 'lighten-3', className: 'bg-indigo-lighten-3 text-black' },
                { key: 'lighten-2', className: 'bg-indigo-lighten-2 text-black' },
                { key: 'lighten-1', className: 'bg-indigo-lighten-1 text-white' },
                { key: 'base', className: 'bg-indigo text-white' },
                { key: 'darken-1', className: 'bg-indigo-darken-1 text-white' },
                { key: 'darken-2', className: 'bg-indigo-darken-2 text-white' },
                { key: 'darken-3', className: 'bg-indigo-darken-3 text-white' },
                { key: 'darken-4', className: 'bg-indigo-darken-4 text-white' },
                { key: 'accent-1', className: 'bg-indigo-accent-1 text-black' },
                { key: 'accent-2', className: 'bg-indigo-accent-2 text-white' },
                { key: 'accent-3', className: 'bg-indigo-accent-3 text-white' },
                { key: 'accent-4', className: 'bg-indigo-accent-4 text-white' },
            ]
        },
        {
            name: 'blue',
            tones: [
                { key: 'lighten-5', className: 'bg-blue-lighten-5 text-black' },
                { key: 'lighten-4', className: 'bg-blue-lighten-4 text-black' },
                { key: 'lighten-3', className: 'bg-blue-lighten-3 text-black' },
                { key: 'lighten-2', className: 'bg-blue-lighten-2 text-black' },
                { key: 'lighten-1', className: 'bg-blue-lighten-1 text-white' },
                { key: 'base', className: 'bg-blue text-white' },
                { key: 'darken-1', className: 'bg-blue-darken-1 text-white' },
                { key: 'darken-2', className: 'bg-blue-darken-2 text-white' },
                { key: 'darken-3', className: 'bg-blue-darken-3 text-white' },
                { key: 'darken-4', className: 'bg-blue-darken-4 text-white' },
                { key: 'accent-1', className: 'bg-blue-accent-1 text-black' },
                { key: 'accent-2', className: 'bg-blue-accent-2 text-white' },
                { key: 'accent-3', className: 'bg-blue-accent-3 text-white' },
                { key: 'accent-4', className: 'bg-blue-accent-4 text-white' },
            ]
        },
        {
            name: 'light-blue',
            tones: [
                { key: 'lighten-5', className: 'bg-light-blue-lighten-5 text-black' },
                { key: 'lighten-4', className: 'bg-light-blue-lighten-4 text-black' },
                { key: 'lighten-3', className: 'bg-light-blue-lighten-3 text-black' },
                { key: 'lighten-2', className: 'bg-light-blue-lighten-2 text-black' },
                { key: 'lighten-1', className: 'bg-light-blue-lighten-1 text-white' },
                { key: 'base', className: 'bg-light-blue text-white' },
                { key: 'darken-1', className: 'bg-light-blue-darken-1 text-white' },
                { key: 'darken-2', className: 'bg-light-blue-darken-2 text-white' },
                { key: 'darken-3', className: 'bg-light-blue-darken-3 text-white' },
                { key: 'darken-4', className: 'bg-light-blue-darken-4 text-white' },
                { key: 'accent-1', className: 'bg-light-blue-accent-1 text-black' },
                { key: 'accent-2', className: 'bg-light-blue-accent-2 text-white' },
                { key: 'accent-3', className: 'bg-light-blue-accent-3 text-white' },
                { key: 'accent-4', className: 'bg-light-blue-accent-4 text-white' },
            ]
        },
        {
            name: 'cyan',
            tones: [
                { key: 'lighten-5', className: 'bg-cyan-lighten-5 text-black' },
                { key: 'lighten-4', className: 'bg-cyan-lighten-4 text-black' },
                { key: 'lighten-3', className: 'bg-cyan-lighten-3 text-black' },
                { key: 'lighten-2', className: 'bg-cyan-lighten-2 text-black' },
                { key: 'lighten-1', className: 'bg-cyan-lighten-1 text-white' },
                { key: 'base', className: 'bg-cyan text-white' },
                { key: 'darken-1', className: 'bg-cyan-darken-1 text-white' },
                { key: 'darken-2', className: 'bg-cyan-darken-2 text-white' },
                { key: 'darken-3', className: 'bg-cyan-darken-3 text-white' },
                { key: 'darken-4', className: 'bg-cyan-darken-4 text-white' },
                { key: 'accent-1', className: 'bg-cyan-accent-1 text-black' },
                { key: 'accent-2', className: 'bg-cyan-accent-2 text-black' },
                { key: 'accent-3', className: 'bg-cyan-accent-3 text-black' },
                { key: 'accent-4', className: 'bg-cyan-accent-4 text-white' },
            ]
        },
        {
            name: 'teal',
            tones: [
                { key: 'lighten-5', className: 'bg-teal-lighten-5 text-black' },
                { key: 'lighten-4', className: 'bg-teal-lighten-4 text-black' },
                { key: 'lighten-3', className: 'bg-teal-lighten-3 text-black' },
                { key: 'lighten-2', className: 'bg-teal-lighten-2 text-black' },
                { key: 'lighten-1', className: 'bg-teal-lighten-1 text-white' },
                { key: 'base', className: 'bg-teal text-white' },
                { key: 'darken-1', className: 'bg-teal-darken-1 text-white' },
                { key: 'darken-2', className: 'bg-teal-darken-2 text-white' },
                { key: 'darken-3', className: 'bg-teal-darken-3 text-white' },
                { key: 'darken-4', className: 'bg-teal-darken-4 text-white' },
                { key: 'accent-1', className: 'bg-teal-accent-1 text-black' },
                { key: 'accent-2', className: 'bg-teal-accent-2 text-black' },
                { key: 'accent-3', className: 'bg-teal-accent-3 text-black' },
                { key: 'accent-4', className: 'bg-teal-accent-4 text-white' },
            ]
        },
        {
            name: 'green',
            tones: [
                { key: 'lighten-5', className: 'bg-green-lighten-5 text-black' },
                { key: 'lighten-4', className: 'bg-green-lighten-4 text-black' },
                { key: 'lighten-3', className: 'bg-green-lighten-3 text-black' },
                { key: 'lighten-2', className: 'bg-green-lighten-2 text-black' },
                { key: 'lighten-1', className: 'bg-green-lighten-1 text-white' },
                { key: 'base', className: 'bg-green text-white' },
                { key: 'darken-1', className: 'bg-green-darken-1 text-white' },
                { key: 'darken-2', className: 'bg-green-darken-2 text-white' },
                { key: 'darken-3', className: 'bg-green-darken-3 text-white' },
                { key: 'darken-4', className: 'bg-green-darken-4 text-white' },
                { key: 'accent-1', className: 'bg-green-accent-1 text-black' },
                { key: 'accent-2', className: 'bg-green-accent-2 text-black' },
                { key: 'accent-3', className: 'bg-green-accent-3 text-black' },
                { key: 'accent-4', className: 'bg-green-accent-4 text-white' },
            ]
        },
        {
            name: 'light-green',
            tones: [
                { key: 'lighten-5', className: 'bg-light-green-lighten-5 text-black' },
                { key: 'lighten-4', className: 'bg-light-green-lighten-4 text-black' },
                { key: 'lighten-3', className: 'bg-light-green-lighten-3 text-black' },
                { key: 'lighten-2', className: 'bg-light-green-lighten-2 text-black' },
                { key: 'lighten-1', className: 'bg-light-green-lighten-1 text-black' },
                { key: 'base', className: 'bg-light-green text-black' },
                { key: 'darken-1', className: 'bg-light-green-darken-1 text-white' },
                { key: 'darken-2', className: 'bg-light-green-darken-2 text-white' },
                { key: 'darken-3', className: 'bg-light-green-darken-3 text-white' },
                { key: 'darken-4', className: 'bg-light-green-darken-4 text-white' },
                { key: 'accent-1', className: 'bg-light-green-accent-1 text-black' },
                { key: 'accent-2', className: 'bg-light-green-accent-2 text-black' },
                { key: 'accent-3', className: 'bg-light-green-accent-3 text-black' },
                { key: 'accent-4', className: 'bg-light-green-accent-4 text-black' },
            ]
        },
        {
            name: 'lime',
            tones: [
                { key: 'lighten-5', className: 'bg-lime-lighten-5 text-black' },
                { key: 'lighten-4', className: 'bg-lime-lighten-4 text-black' },
                { key: 'lighten-3', className: 'bg-lime-lighten-3 text-black' },
                { key: 'lighten-2', className: 'bg-lime-lighten-2 text-black' },
                { key: 'lighten-1', className: 'bg-lime-lighten-1 text-black' },
                { key: 'base', className: 'bg-lime text-black' },
                { key: 'darken-1', className: 'bg-lime-darken-1 text-black' },
                { key: 'darken-2', className: 'bg-lime-darken-2 text-black' },
                { key: 'darken-3', className: 'bg-lime-darken-3 text-white' },
                { key: 'darken-4', className: 'bg-lime-darken-4 text-white' },
                { key: 'accent-1', className: 'bg-lime-accent-1 text-black' },
                { key: 'accent-2', className: 'bg-lime-accent-2 text-black' },
                { key: 'accent-3', className: 'bg-lime-accent-3 text-black' },
                { key: 'accent-4', className: 'bg-lime-accent-4 text-black' },
            ]
        },
        {
            name: 'yellow',
            tones: [
                { key: 'lighten-5', className: 'bg-yellow-lighten-5 text-black' },
                { key: 'lighten-4', className: 'bg-yellow-lighten-4 text-black' },
                { key: 'lighten-3', className: 'bg-yellow-lighten-3 text-black' },
                { key: 'lighten-2', className: 'bg-yellow-lighten-2 text-black' },
                { key: 'lighten-1', className: 'bg-yellow-lighten-1 text-black' },
                { key: 'base', className: 'bg-yellow text-black' },
                { key: 'darken-1', className: 'bg-yellow-darken-1 text-black' },
                { key: 'darken-2', className: 'bg-yellow-darken-2 text-black' },
                { key: 'darken-3', className: 'bg-yellow-darken-3 text-black' },
                { key: 'darken-4', className: 'bg-yellow-darken-4 text-white' },
                { key: 'accent-1', className: 'bg-yellow-accent-1 text-black' },
                { key: 'accent-2', className: 'bg-yellow-accent-2 text-black' },
                { key: 'accent-3', className: 'bg-yellow-accent-3 text-black' },
                { key: 'accent-4', className: 'bg-yellow-accent-4 text-black' },
            ]
        },
        {
            name: 'amber',
            tones: [
                { key: 'lighten-5', className: 'bg-amber-lighten-5 text-black' },
                { key: 'lighten-4', className: 'bg-amber-lighten-4 text-black' },
                { key: 'lighten-3', className: 'bg-amber-lighten-3 text-black' },
                { key: 'lighten-2', className: 'bg-amber-lighten-2 text-black' },
                { key: 'lighten-1', className: 'bg-amber-lighten-1 text-black' },
                { key: 'base', className: 'bg-amber text-black' },
                { key: 'darken-1', className: 'bg-amber-darken-1 text-black' },
                { key: 'darken-2', className: 'bg-amber-darken-2 text-black' },
                { key: 'darken-3', className: 'bg-amber-darken-3 text-black' },
                { key: 'darken-4', className: 'bg-amber-darken-4 text-black' },
                { key: 'accent-1', className: 'bg-amber-accent-1 text-black' },
                { key: 'accent-2', className: 'bg-amber-accent-2 text-black' },
                { key: 'accent-3', className: 'bg-amber-accent-3 text-black' },
                { key: 'accent-4', className: 'bg-amber-accent-4 text-black' },
            ]
        },
        {
            name: 'orange',
            tones: [
                { key: 'lighten-5', className: 'bg-orange-lighten-5 text-black' },
                { key: 'lighten-4', className: 'bg-orange-lighten-4 text-black' },
                { key: 'lighten-3', className: 'bg-orange-lighten-3 text-black' },
                { key: 'lighten-2', className: 'bg-orange-lighten-2 text-black' },
                { key: 'lighten-1', className: 'bg-orange-lighten-1 text-black' },
                { key: 'base', className: 'bg-orange text-white' },
                { key: 'darken-1', className: 'bg-orange-darken-1 text-white' },
                { key: 'darken-2', className: 'bg-orange-darken-2 text-white' },
                { key: 'darken-3', className: 'bg-orange-darken-3 text-white' },
                { key: 'darken-4', className: 'bg-orange-darken-4 text-white' },
                { key: 'accent-1', className: 'bg-orange-accent-1 text-black' },
                { key: 'accent-2', className: 'bg-orange-accent-2 text-black' },
                { key: 'accent-3', className: 'bg-orange-accent-3 text-black' },
                { key: 'accent-4', className: 'bg-orange-accent-4 text-white' },
            ]
        },
        {
            name: 'deep-orange',
            tones: [
                { key: 'lighten-5', className: 'bg-deep-orange-lighten-5 text-black' },
                { key: 'lighten-4', className: 'bg-deep-orange-lighten-4 text-black' },
                { key: 'lighten-3', className: 'bg-deep-orange-lighten-3 text-black' },
                { key: 'lighten-2', className: 'bg-deep-orange-lighten-2 text-black' },
                { key: 'lighten-1', className: 'bg-deep-orange-lighten-1 text-black' },
                { key: 'base', className: 'bg-deep-orange text-white' },
                { key: 'darken-1', className: 'bg-deep-orange-darken-1 text-white' },
                { key: 'darken-2', className: 'bg-deep-orange-darken-2 text-white' },
                { key: 'darken-3', className: 'bg-deep-orange-darken-3 text-white' },
                { key: 'darken-4', className: 'bg-deep-orange-darken-4 text-white' },
                { key: 'accent-1', className: 'bg-deep-orange-accent-1 text-black' },
                { key: 'accent-2', className: 'bg-deep-orange-accent-2 text-white' },
                { key: 'accent-3', className: 'bg-deep-orange-accent-3 text-white' },
                { key: 'accent-4', className: 'bg-deep-orange-accent-4 text-white' },
            ]
        },
        {
            name: 'brown',
            tones: [
                { key: 'lighten-5', className: 'bg-brown-lighten-5 text-black' },
                { key: 'lighten-4', className: 'bg-brown-lighten-4 text-black' },
                { key: 'lighten-3', className: 'bg-brown-lighten-3 text-black' },
                { key: 'lighten-2', className: 'bg-brown-lighten-2 text-black' },
                { key: 'lighten-1', className: 'bg-brown-lighten-1 text-white' },
                { key: 'base', className: 'bg-brown text-white' },
                { key: 'darken-1', className: 'bg-brown-darken-1 text-white' },
                { key: 'darken-2', className: 'bg-brown-darken-2 text-white' },
                { key: 'darken-3', className: 'bg-brown-darken-3 text-white' },
                { key: 'darken-4', className: 'bg-brown-darken-4 text-white' },
            ]
        },
        {
            name: 'blue-grey',
            tones: [
                { key: 'lighten-5', className: 'bg-blue-grey-lighten-5 text-black' },
                { key: 'lighten-4', className: 'bg-blue-grey-lighten-4 text-black' },
                { key: 'lighten-3', className: 'bg-blue-grey-lighten-3 text-black' },
                { key: 'lighten-2', className: 'bg-blue-grey-lighten-2 text-black' },
                { key: 'lighten-1', className: 'bg-blue-grey-lighten-1 text-white' },
                { key: 'base', className: 'bg-blue-grey text-white' },
                { key: 'darken-1', className: 'bg-blue-grey-darken-1 text-white' },
                { key: 'darken-2', className: 'bg-blue-grey-darken-2 text-white' },
                { key: 'darken-3', className: 'bg-blue-grey-darken-3 text-white' },
                { key: 'darken-4', className: 'bg-blue-grey-darken-4 text-white' },
            ]
        },
        {
            name: 'grey',
            tones: [
                { key: 'lighten-5', className: 'bg-grey-lighten-5 text-black' },
                { key: 'lighten-4', className: 'bg-grey-lighten-4 text-black' },
                { key: 'lighten-3', className: 'bg-grey-lighten-3 text-black' },
                { key: 'lighten-2', className: 'bg-grey-lighten-2 text-black' },
                { key: 'lighten-1', className: 'bg-grey-lighten-1 text-black' },
                { key: 'base', className: 'bg-grey text-white' },
                { key: 'darken-1', className: 'bg-grey-darken-1 text-white' },
                { key: 'darken-2', className: 'bg-grey-darken-2 text-white' },
                { key: 'darken-3', className: 'bg-grey-darken-3 text-white' },
                { key: 'darken-4', className: 'bg-grey-darken-4 text-white' },
            ]
        },
        {
            name: 'white',
            tones: [{ key: 'base', className: 'bg-white text-black' }]
        },
        {
            name: 'black',
            tones: [{ key: 'base', className: 'bg-black text-white' }]
        },
    ]
</script>

<template>
    <div class="palette">
        <section
            v-for="group in palette"
            :key="group.name"
            class="palette__group"
        >
            <header class="palette__header">
                <h3 class="palette__title">
                    {{ group.name }}
                </h3>
            </header>

            <div class="palette__grid">
                <article
                    v-for="tone in group.tones"
                    :key="`${group.name}-${tone.key}`"
                    class="palette__card d-flex flex-col justify-space-between radius-12 pa-3"
                    :class="tone.className"
                >
                    <div class="palette__name">
                        {{ group.name }}
                    </div>
                    <div class="palette__tone">
                        {{ tone.key }}
                    </div>
                    <div class="palette__class">
                        {{ tone.key === 'base' ? `bg-${group.name}` : `bg-${group.name}-${tone.key}` }}
                    </div>
                </article>
            </div>
        </section>
    </div>
</template>

<style scoped lang="scss">
    .palette {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }

    .palette__group {
        display: flex;
        flex-direction: column;
        gap: 14px;
    }

    .palette__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .palette__title {
        margin: 0;
        font-size: 20px;
        line-height: 1.2;
        font-weight: 700;
        color: var(--vp-c-text-1);
        text-transform: none;
    }

    .palette__grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
        gap: 12px;
    }

    .palette__card {
        min-height: 90px;
        border: 1px solid rgba(0, 0, 0, 0.08);
        transition: transform .15s ease, box-shadow .15s ease;
    }

    .palette__card:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
    }

    .palette__name {
        font-size: 13px;
        font-weight: 700;
        line-height: 1.2;
    }

    .palette__tone {
        font-size: 12px;
        opacity: 0.9;
        line-height: 1.2;
    }

    .palette__class {
        font-size: 11px;
        opacity: 0.85;
        line-height: 1.2;
        word-break: break-word;
    }
</style>

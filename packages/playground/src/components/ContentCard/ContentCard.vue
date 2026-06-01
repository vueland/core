<script setup lang="ts">
    import { IconAliases } from '@vueland/ui/enums/IconName'
    import { ref } from 'vue'

    const value = ref()

    const items = [
        'one',
        'two',
        'three'
    ]
</script>
<template>
    <c-card class="elevation-2">
        <c-card-header>
            <h2 class="xl:fs-xl lg:fs-xl md:fs-xl sm:fs-md px-3 text-left text-blue text-uppercase op-10">
                Content Card Example
                <c-icon
                    size="24"
                    :name="IconAliases.CALENDAR"
                    class="text-green"
                />
            </h2>
        </c-card-header>
        <c-card-body class="grow-1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt inventore nemo nihil nostrum praesentium
            quos reiciendis repudiandae. Commodi corporis eos libero minima nobis pariatur, perspiciatis quis quo
            voluptatum. Amet assumenda corporis dicta et explicabo harum incidunt neque nisi possimus sed!
        </c-card-body>
        <c-card-footer class="d-flex justify-start items-center">
            <c-tooltip
                top
                offset-y="10"
                open-on-hover
                close-on-leave
                strategy="reverse"
                class="elevation-2 pa-2"
                offset-x="-40"
            >
                <template #activator="{on, activator}">
                    <c-btn
                        v-bind="activator"
                        class="bg-green hover:bg-green-lighten-1 active:bg-green-darken-2 text-white elevation-2"
                        v-on="on"
                    >
                        tooltip
                    </c-btn>
                </template>
                <template #default>
                    <div>
                        <span>A little beautiful text</span>
                    </div>
                </template>
            </c-tooltip>
            <c-menu
                top
                open-on-click
                close-on-click
                close-on-click-outside
                close-on-content-click
                offset-y="5"
                strategy="reverse"
                class="elevation-2 w-[120px] max-w-[120px]"
            >
                <template #activator="{on, activator}">
                    <c-btn
                        v-bind="activator"
                        class="ml-2 text-white hover:bg-blue-lighten-1 active:bg-blue-darken-2 elevation-2"
                        v-on="on"
                    >
                        MENU
                    </c-btn>
                </template>
                <template #default>
                    <c-list>
                        <c-list-item
                            v-for="it in 10"
                            :key="it"
                        >
                            <c-list-item-title>
                                {{ it }} item
                            </c-list-item-title>
                        </c-list-item>
                    </c-list>
                </template>
            </c-menu>
        </c-card-footer>
    </c-card>
</template>

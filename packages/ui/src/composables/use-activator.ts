import { type ComponentPublicInstance, computed, markRaw, shallowRef, unref } from 'vue'

export type ActivatorProps = {
    closeOnClick?: boolean
    openOnClick?: boolean
    openOnHover?: boolean
    closeOnLeave?: boolean
    openOnFocus?: boolean
}

export type ActivatorListeners = {
    mouseenter?: (e: Event) => void
    mouseleave?: (e: Event) => void
    mouseover?: (e: Event) => void
    mouseout?: (e: Event) => void
    contextmenu?: (e: Event) => void
    focus?: (e: Event) => void
    blur?: (e: Event) => void
    click?: (e: Event) => void
    input?: (e: Event) => void
    change?: (e: Event) => void
}

export function useActivator(props: Partial<ActivatorProps> & Record<string, unknown>) {
    const activatorEl = shallowRef<ComponentPublicInstance | HTMLElement>()
    const activatorProps: Record<string, any> = { ref: set }

    function set(val: HTMLElement | ComponentPublicInstance) {
        activatorEl.value = val
    }

    function getActivator<T>() {
        return activatorEl.value as T
    }

    function getActivatorElement(): HTMLElement {
        return (unref(activatorEl) as ComponentPublicInstance)?.$el ?? unref(activatorEl)
    }

    function genListeners({
        open,
        close,
        toggle,
    }: {
        open: () => void
        close: () => void
        toggle: () => void
    }) {
        return computed(() => (markRaw({
            ...(props.openOnHover ? {
                mouseenter: () => open(),
            } : {}),
            ...(props.closeOnLeave ? {
                mouseleave: () => close(),
            } : {}),
            ...(props.openOnClick ? {
                click: () => open(),
            } : {}),
            ...(props.closeOnClick ? {
                click: () => toggle(),
            } : {}),
            ...(props.openOnFocus ? {
                focus: () => open(),
            } : {}),
        })))
    }

    return {
        activatorProps,
        getActivatorElement,
        genListeners,
        getActivator,
    }
}

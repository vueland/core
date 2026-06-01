import { describe, expect, it } from 'vitest'
import { computed, defineComponent, h, nextTick, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { useFieldAttrs } from '../../src/composables'

const mountWithReactiveAttrs = (initial: Record<string, any>) => {
    const state = reactive<Record<string, any>>({ ...initial })

    const Child = defineComponent({
        name: 'CChild',
        inheritAttrs: false,
        setup() {
            const fieldAttrs = useFieldAttrs()
            return { fieldAttrs }
        },
        render() {
            return h(
                'div',
                [h('input', { ...this.fieldAttrs })],
            )
        },
    })

    const Parent = defineComponent({
        name: 'CParent',
        setup() {
            // Важно для реактивности добавления/удаления ключей
            const boundAttrs = computed(() => ({ ...state }))
            return () => h(Child, boundAttrs.value)
        },
    })

    const wrapper = mount(Parent)
    const child = wrapper.findComponent(Child)
    const childVm = child.vm as any

    return { wrapper, child, state, childVm }
}

describe('useInputAttrs', () => {
    it('делит attrs на fieldAttrs и inputAttrs (и реально байндит на DOM)', async () => {
        const { childVm, child } = mountWithReactiveAttrs({
            type: 'text',
            name: 'email',
            placeholder: 'Enter email',
            autocomplete: 'email',
            tabindex: 0,
            'aria-label': 'Email',

            class: 'my-field',
            id: 'field-id',
            'data-test': 'x',

            onClick: () => {
            }
        })

        await nextTick()

        expect(childVm.fieldAttrs).toEqual({
            type: 'text',
            name: 'email',
            placeholder: 'Enter email',
            autocomplete: 'email',
            tabindex: 0,
            'aria-label': 'Email',
        })

        // 2) проверяем что реально применилось к DOM
        const input = child.find('input')

        expect(input.attributes('type')).toBe('text')
        expect(input.attributes('name')).toBe('email')
        expect(input.attributes('placeholder')).toBe('Enter email')
        expect(input.attributes('autocomplete')).toBe('email')
        expect(input.attributes('tabindex')).toBe('0') // DOM всегда строка
        expect(input.attributes('aria-label')).toBe('Email')
    })

    it('aria-* всегда попадает в fieldAttrs', () => {
        const { childVm, child } = mountWithReactiveAttrs({
            'aria-hidden': 'true',
            role: 'textbox',
        })

        expect(childVm.fieldAttrs).toEqual({ 'aria-hidden': 'true' })

        const input = child.find('input')
        expect(input.attributes('aria-hidden')).toBe('true')
        expect(input.attributes('role')).toBeUndefined()
    })

    it('реактивно пересчитывает и переливает attrs при изменениях (включая delete)', async () => {
        const { state, child } = mountWithReactiveAttrs({
            type: 'text',
            class: 'a',
            'aria-label': 'A',
        })

        let input = child.find('input')

        expect(input.attributes('type')).toBe('text')
        expect(input.attributes('aria-label')).toBe('A')

        state.class = 'b'
        state.placeholder = 'Hello'
        state['aria-label'] = 'B'
        delete state.type

        await nextTick()

        input = child.find('input')

        expect(input.attributes('placeholder')).toBe('Hello')
        expect(input.attributes('aria-label')).toBe('B')
        expect(input.attributes('type')).toBeUndefined()
    })
})

import { isDef } from '../helpers'

const stack: number[] = []

export function useTabindex() {
    let tabindex = -1

    const register = () => {
        const last = stack[stack.length - 1]

        tabindex = isDef(last)
            ? last + 1
            : 0

        stack.push(tabindex)

        return tabindex
    }

    const unregister = () => {
        const i = stack.indexOf(tabindex)

        if (i > -1) {
            stack.splice(i, 1)
        }
    }

    return {
        register,
        unregister,
        tabindex
    }
}

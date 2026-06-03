import { describe, expect, it } from 'vitest'
import { utilsJIT } from '../src'

describe('utilsJIT plugin', () => {
    it('creates vite plugin with expected name', () => {
        const plugin = utilsJIT()

        expect(plugin.name).toBe('utils-jit')
        expect(typeof plugin.configResolved).toBe('function')
        expect(typeof plugin.transform).toBe('function')
        expect(typeof plugin.handleHotUpdate).toBe('function')
    })

    it('accepts custom numeric breakpoints', () => {
        const plugin = utilsJIT({
            breakpoints: {
                xs: 480,
                xl: 1440,
            },
        })

        expect(plugin.name).toBe('utils-jit')
    })
})

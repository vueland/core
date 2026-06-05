import { defineConfig, type PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { utilsJIT, defineRule } from '@vueland/utils-jit'

// Для максимально комфортной разработки компонентов:
// алиасим на исходники ui, чтобы не ждать сборку и ловить HMR.
export default defineConfig({
    plugins: [
        vue(),
        utilsJIT({
            breakpoints: {
                xs: 480,
                sm: 640,
                md: 768,
                lg: 1024,
                xl: 1440
            },
            rules: [
                defineRule({
                    name: 'translate',
                    matcher: /^translate-\[(.+)\]$/,
                    validate: (v) => !!v,
                    declaration: (value) => ({
                        transform: `translate(${value})`,
                    })
                })
            ]
        }) as PluginOption
    ],
    resolve: {
        alias: {
            '@vueland/ui': path.resolve(__dirname, '../ui/src/'),
        }
    },
    css: {
        preprocessorOptions: {
            scss: {}
        }
    },
    server: {
        host: '0.0.0.0',
        port: 8081,
    },
    optimizeDeps: {
        exclude: ['@vueland/ui']
    }
})

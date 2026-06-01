import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { coreUiJit } from '@vueland/utils-jit'

// Для максимально комфортной разработки компонентов:
// алиасим на исходники core-ui, чтобы не ждать сборку и ловить HMR.
export default defineConfig({
    plugins: [
        vue(),
        coreUiJit({
            breakpoints: {
                sm: 375,
                md: 768,
                lg: 992,
                xl: 1024,
                xxl: 1920
            },
        }) as Plugin],
    resolve: {
        alias: {
            '@vueland/ui': path.resolve(__dirname, '../ui/src/'),
            // '@vueland/ui/styles.css': path.resolve(__dirname, '../core-ui/dist/style.css'),
            // '@vueland/ui/themes/default-theme.css': path.resolve(__dirname, '../core-ui/dist/themes/default-theme.css'),
            // '@vueland/ui/examples/': path.resolve(__dirname, '../core-ui/dist/examples'),
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

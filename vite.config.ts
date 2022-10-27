import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import viteCompression from 'vite-plugin-compression'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import * as path from 'path'
import vue from '@vitejs/plugin-vue'
import removeConsole from 'vite-plugin-remove-console'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    removeConsole(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]'
    }),
    viteCompression(),
    AutoImport({
      include: [
        /\.[tj]sx?$/,
        /\.vue$/, /\.vue\?vue/,
        /\.md$/
      ],
      imports: [
        'vue',
        'vue-router',
        {
          '@vueuse/core': [
            'useMouse',
            ['useFetch', 'useMyFetch']
          ],
          axios: [
            ['default', 'axios']
          ]
        }
      ],
      dirs: [

      ],
      dts: './auto-imports.d.ts',
      vueTemplate: false,
      resolvers: [

      ],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      }
    }),
    Components({
      dts: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    assetsDir: './static',
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    reportCompressedSize: false
  }
})

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // https://github.com/antfu/unplugin-auto-import/tree/main
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      /**
       * 用于处理 eslint no-undef 检查冲突
       * 启用该配置会生成一个 .eslintrc-auto-import.json 文件
       * 添加到 eslintrc.cjs extends 下即可
       */
      eslintrc: {
        enabled: true
      },
      dts: './src/typings/auto-imports.d.ts'
    })
  ],
  resolve: {
    /**
     * 注意！！ alias 使用如下方式配置
     * 若使用 对象形式，如 { "@": resolve(__dirname, 'src') }，import 的 url 必需为完整的路径，包括 index 及后缀
     * eg:
     *  import router from '@/router/index.ts'
     */
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      },
      {
        find: '@views',
        replacement: resolve(__dirname, 'src/views')
      },
      {
        find: '@components',
        replacement: resolve(__dirname, 'src/components')
      }
    ],
    // vite 默认扩展名配置，可不需显式配置
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/styles/variables.scss' as *;@use '@/styles/global.scss' as *;`
      }
    }
  }
})

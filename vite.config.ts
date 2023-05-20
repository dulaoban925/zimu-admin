import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 注意！！ alias 使用如下方式配置，若使用 对象形式，如 { "@": resolve(__dirname, 'src') }，import 的 url 必需为完整的路径，包括 index 及后缀
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
  }
})

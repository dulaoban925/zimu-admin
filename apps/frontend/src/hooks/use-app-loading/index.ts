import AppLoading from '@views/static/loading/index.vue'
import { ElMessage } from 'element-plus'
import { createApp } from 'vue'

export const useAppLoading = () => {
  const appLoading = createApp(AppLoading)

  let timer: NodeJS.Timeout

  // 接口请求过期限制
  const requestTimeout: number = Number(import.meta.env.VITE_REQUEST_TIMEOUT)

  const mount = (selector: string) => {
    appLoading.mount(selector)

    timer = setTimeout(() => {
      const errorMsg = '系统初始化失败：请求超时，请刷新页面'
      ElMessage.error(errorMsg)
    }, requestTimeout)
  }

  const unmount = () => {
    appLoading.unmount()
    clearTimeout(timer)
  }

  return {
    mount,
    unmount
  }
}

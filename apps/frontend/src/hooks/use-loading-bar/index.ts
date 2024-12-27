/**
 * 页面加载进度条
 */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

type NProgressOptions = Partial<{
  minimum: number
  template: string
  easing: string
  speed: number
  trickle: boolean
  trickleSpeed: number
  showSpinner: boolean
  parent: string
  positionUsing: string
  barSelector: string
  spinnerSelector: string
}>

export function useLoadingBar(config: NProgressOptions = {}) {
  // 设置默认 config
  function setDefaultConfig(config: NProgressOptions) {
    if (!config.showSpinner && config.showSpinner !== false) {
      config.showSpinner = false
    }
  }

  setDefaultConfig(config)
  NProgress.configure(config)

  const start = () => {
    NProgress.start()
  }

  const done = (force: boolean = false) => {
    NProgress.done(force)
  }

  return {
    start,
    done
  }
}

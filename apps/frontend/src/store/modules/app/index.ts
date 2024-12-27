/**
 * 应用共享数据
 */
export const useAppStore = defineStore('app-store', () => {
  // 是否加载完成
  const loadedFlag = ref(true)
  const setLoadedFlag = (flag: boolean) => (loadedFlag.value = flag)

  /**
   * 重新加载页面
   */
  const reloadPage = async (duration = 300) => {
    setLoadedFlag(false)

    await new Promise(resolve => {
      setTimeout(resolve, duration)
    })

    setLoadedFlag(true)
  }

  const states = {
    loadedFlag
  }
  const actions = {
    setLoadedFlag,
    reloadPage
  }
  return {
    ...states,
    ...actions
  }
})

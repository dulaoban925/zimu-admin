/**
 * 系统设置 store
 */
export const useSettingStore = defineStore('setting-store', () => {
  // 主题
  const enableFaceRecognition = ref(false)

  return {
    /** state start */
    enableFaceRecognition
    /** state end */
  }
})

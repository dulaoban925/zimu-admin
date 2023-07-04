/**
 * 系统设置
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

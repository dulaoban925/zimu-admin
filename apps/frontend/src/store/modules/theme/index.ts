/**
 * 主题 store
 */
import { useColorMode } from '@vueuse/core'
import { THEME_KEY, THEME_SCHEMES } from '@/constants'
import type { ValueOf } from '@/utils'

type ThemeSchemes = ValueOf<typeof THEME_SCHEMES>

export const useThemeStore = defineStore('theme-store', () => {
  // 主题
  const themeScheme = useColorMode({
    emitAuto: true,
    storageKey: THEME_KEY
  })
  // 是否暗黑主题
  const darkMode = computed(() => themeScheme.value === THEME_SCHEMES.DARK)

  // 切换主题
  const setThemeScheme = (theme: ThemeSchemes) => {
    themeScheme.value = theme
  }

  return {
    themeScheme,
    darkMode,
    setThemeScheme
  }
})

/**
 * 主题操作 hook
 */
import { useColorMode, useDark, type BasicColorSchema } from '@vueuse/core'
import { THEME_KEY } from '@/constants'
export function useTheme() {
  const ORIGIN_THEMES: Record<string, BasicColorSchema> = {
    DARK: 'dark',
    LIGHT: 'light'
  }
  const CUSTOM_THEMES = {}

  // 主题
  const mode = useColorMode({
    storageKey: THEME_KEY,
    modes: CUSTOM_THEMES
  })

  // 切换主题
  const toggleThemeMode = (theme?: BasicColorSchema) => {
    if (!theme) {
      const isDark = useDark()
      isDark.value = !isDark.value
      mode.value = isDark.value ? ORIGIN_THEMES.DARK : ORIGIN_THEMES.LIGHT
    } else mode.value = theme
  }

  return {
    mode,
    toggleThemeMode
  }
}

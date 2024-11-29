import { useDark, useToggle } from '@vueuse/core'

export const isDark = useDark({
  storageKey: 'zm-theme'
})

export const toggleDark = useToggle(isDark)

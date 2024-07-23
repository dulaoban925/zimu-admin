import type { NavigationHookAfter } from 'vue-router'
import { useLoadingBar } from '@/hooks'

export default function createAfterEachGuard(): NavigationHookAfter {
  return () => {
    const loadingBar = useLoadingBar()
    loadingBar.done()
  }
}

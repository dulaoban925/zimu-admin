import { useLoadingBar } from '@/hooks'
import type { NavigationHookAfter } from 'vue-router'

export default function createAfterEachGuard(): NavigationHookAfter {
  return () => {
    const loadingBar = useLoadingBar()
    loadingBar.done()
  }
}

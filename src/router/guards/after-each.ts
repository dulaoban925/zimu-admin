import type {
  RouteLocationNormalized,
  NavigationHookAfter,
  NavigationFailure
} from 'vue-router'
import { useLoadingBar } from '@/hooks'

export default function createAfterEachGuard(): NavigationHookAfter {
  return (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    failure?: NavigationFailure | void
  ) => {
    const loadingBar = useLoadingBar()
    loadingBar.done()
  }
}

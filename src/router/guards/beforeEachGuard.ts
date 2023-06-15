import type {
  RouteLocationNormalized,
  NavigationGuardNext,
  NavigationGuardWithThis
} from 'vue-router'
import { useRouteStore } from '@/store'

export default function createBeforeEachGuard(): NavigationGuardWithThis<undefined> {
  return async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    await handleAuthRoutes()
    next()
  }
}

async function handleAuthRoutes() {
  const routeStore = useRouteStore()
  if (!routeStore.isAuthRouteInitialized) {
    await routeStore.initRoutes()
  }
}

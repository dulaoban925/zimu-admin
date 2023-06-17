import type {
  RouteLocationNormalized,
  NavigationGuardNext,
  NavigationGuardWithThis
} from 'vue-router'
import { useRouteStore } from '@/store'
import { STATIC_ROUTE_NAME } from '@/constants'

export default function createBeforeEachGuard(): NavigationGuardWithThis<undefined> {
  return async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    await handleDynamicRoutes(to, from, next)
    next()
  }
}

async function handleDynamicRoutes(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const routeStore = useRouteStore()
  // 是否初始化路由
  const isAuthRouteInitialized = routeStore.isAuthRouteInitialized
  // 若为初始化，则执行初始化函数
  if (!isAuthRouteInitialized) {
    await routeStore.initRoutes()

    /**
     * 路由初始化过程中，若跳转的路由为 “notfound”，可能为路由为加载完成导致的
     * 重新跳转到当前目标路由
     */
    console.log(to)
    if (to.name === STATIC_ROUTE_NAME.NOT_FOUND) {
      console.log('111')
      // 重定向的路由路径
      const path =
        to.redirectedFrom?.name === STATIC_ROUTE_NAME.ROOT ? '/' : to.fullPath
      next({ path, query: to.query, hash: to.hash, replace: true })
    }
  }

  if (to.name === STATIC_ROUTE_NAME.NOT_FOUND) {
    next({ name: STATIC_ROUTE_NAME[404], replace: true })
  }
}

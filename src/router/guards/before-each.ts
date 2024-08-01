import type {
  RouteLocationNormalized,
  NavigationGuardNext,
  NavigationGuardWithThis
} from 'vue-router'
import { useMenuStore, useUserStore } from '@/store'
import { STATIC_ROUTE_NAME } from '@/constants'
import { useLoadingBar } from '@/hooks'

export default function createBeforeEachGuard(): NavigationGuardWithThis<undefined> {
  return async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    // 页面加载 loading bar
    const loadingBar = useLoadingBar()
    loadingBar.start()

    const normalNext = await handleDynamicRoutes(to, from, next)

    normalNext && next()
  }
}

async function handleDynamicRoutes(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const menuStore = useMenuStore()
  // 是否已初始化权限菜单
  const isAuthInitialized = menuStore.isAuthInitialized
  // 是否跳转到登录页面
  const isToLogin = to.name === STATIC_ROUTE_NAME.LOGIN
  // 若未初始化，则执行初始化函数
  if (!isAuthInitialized && !isToLogin) {
    const userStore = useUserStore()
    await menuStore.initAuthMenus(userStore.username)

    /**
     * 路由初始化过程中，若跳转的路由为 “notfound”，可能未路由为加载完成导致的
     * 重新跳转到当前目标路由
     */
    if (to.name === STATIC_ROUTE_NAME.NOT_FOUND) {
      // 重定向的路由路径
      const path =
        to.redirectedFrom?.name === STATIC_ROUTE_NAME.ROOT ? '/' : to.fullPath
      next({ path, query: to.query, hash: to.hash, replace: true })
      return false
    }
  }

  if (to.name === STATIC_ROUTE_NAME.NOT_FOUND) {
    next({ name: STATIC_ROUTE_NAME[404], replace: true })
    return false
  }

  return true
}

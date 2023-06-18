/**
 * 路由 store
 */
import { routes, router } from '@/router'
import type { ValueOf } from '@/utils'
import { transformRouteConfigToVueRoutes } from '@/router/helpers'

export const RouteMatchModeEnum = {
  Static: 'static',
  Dynamic: 'dynamic'
}

type RouteMatchMode = ValueOf<typeof RouteMatchModeEnum>

export const useRouteStore = defineStore('route-store', () => {
  // 路由匹配模式，static(静态：从代码中获取固定路由) or dynamic(动态：根据权限配置匹配)
  const mode = ref<RouteMatchMode>('static')
  // 导航菜单
  const menus = ref([])
  // 缓存路由，路由名称集合
  const cachedRoute = ref([])
  // 权限路由是否已初始化
  const isAuthRouteInitialized = ref(false)

  // 初始化静态路由
  async function initStaticRoutes() {
    if (!routes.length) return
    // 将 路由配置 转化为可用的、平铺的 vue 路由
    const vueRoutes = transformRouteConfigToVueRoutes(routes)
    for (const route of vueRoutes) {
      router.addRoute(route)
    }
    isAuthRouteInitialized.value = true
  }

  // 初始化动态路由
  function initDynamicRoutes() {}

  // 初始化权限路由
  async function initRoutes() {
    if (mode.value === RouteMatchModeEnum.Static) await initStaticRoutes()
    else await initDynamicRoutes()
  }
  return {
    /** state start */
    mode,
    menus,
    cachedRoute,
    isAuthRouteInitialized,
    /** state end */

    /** action start */
    initRoutes
    /** action end */
  }
})

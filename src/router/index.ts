import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw
} from 'vue-router'
import { setupRouterGuards } from './guards'
import { transformRouteConfigToVueRoutes } from './helpers'
import { constantRoutes } from './routes'
import type { App } from 'vue'

export const constantVueRoutes: RouteRecordRaw[] =
  transformRouteConfigToVueRoutes(constantRoutes) as RouteRecordRaw[]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantVueRoutes,
  strict: true,
  sensitive: true
})

export async function setupRouter(app: App<Element>) {
  app.use(router)
  setupRouterGuards(router)
  // 等待路由初始化完成
  await router.isReady()
}

export default router
export * from './routes'

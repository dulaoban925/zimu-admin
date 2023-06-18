import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './routes'
import { setupRouterGuards } from './guards'
import { transformRouteConfigToVueRoutes } from './helpers'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: transformRouteConfigToVueRoutes(constantRoutes),
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
export * from './modules'

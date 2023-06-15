import type { App } from 'vue'
import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './routes'
import { setupRouterGuards } from './guards'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as unknown as RouteRecordRaw[]
})

export async function setupRouter(app: App<Element>) {
  app.use(router)
  setupRouterGuards(router)
  // 等待路由初始化完成
  await router.isReady()
}

export default router
export * from './modules'

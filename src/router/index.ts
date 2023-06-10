import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './routes'
import type { App } from 'vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export async function setupRouter(app: App<Element>) {
  app.use(router)
  // 等待路由初始化完成
  await router.isReady()
}

export default router
export * from './modules'

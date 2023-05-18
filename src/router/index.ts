import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const allRoutes: RouteRecordRaw[] = []

const router = createRouter({
  history: createWebHashHistory(),
  routes: allRoutes
})

export default router
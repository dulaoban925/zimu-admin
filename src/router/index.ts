import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const Dashboard = () => import('@views/dashboard/index.vue')

const allRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: allRoutes
})

export default router
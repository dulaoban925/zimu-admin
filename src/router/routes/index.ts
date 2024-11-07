import { ROUTE_COMPONENT_LAYOUT_VALUE, STATIC_ROUTE_NAME } from '@/constants'
import type { ZiMuRoute } from '@/typings/route'
import { routes } from '../modules'

const RouteComponents = {
  Dashboard: () => import('@views/dashboard/index.vue'), // 控制台
  Login: () => import('@views/login/index.vue'), // 登录页
  403: () => import('@views/static/403/index.vue'), // 403 页
  404: () => import('@views/static/404/index.vue'), // 404 页
  500: () => import('@views/static/500/index.vue') // 500 页
}

/** 根路由: */
export const ROOT_ROUTE: ZiMuRoute.Route = {
  name: STATIC_ROUTE_NAME.ROOT,
  path: '/',
  redirect: import.meta.env.VITE_ROUTE_HOME_PATH,
  meta: {
    title: 'Root'
  }
}

/** 控制台路由 */
const DASHBOARD_ROUTE: ZiMuRoute.Route = {
  name: 'Dashboard',
  path: '/dashboard',
  component: ROUTE_COMPONENT_LAYOUT_VALUE.BASIC,
  children: [
    {
      name: 'Home',
      path: '',
      component: RouteComponents.Dashboard
    }
  ],
  meta: { title: '主页', affix: true }
}

/** 登录路由 */
const LOGIN_ROUTE: ZiMuRoute.Route = {
  name: STATIC_ROUTE_NAME.LOGIN,
  path: '/login',
  component: RouteComponents.Login,
  meta: {
    title: 'Login'
  }
}

// 匹配无效路径的路由
const NO_MATCH_ROUTE: ZiMuRoute.Route = {
  name: STATIC_ROUTE_NAME.NO_MATCH,
  path: '/:pathMatch(.*)*',
  component: ROUTE_COMPONENT_LAYOUT_VALUE.BLANK,
  meta: {
    title: '未找到'
  }
}

const ERROR_ROUTES: ZiMuRoute.Route[] = [
  {
    name: STATIC_ROUTE_NAME[403],
    path: '/403',
    component: RouteComponents[403],
    meta: {
      title: '未授权'
    }
  },
  {
    name: STATIC_ROUTE_NAME[404],
    path: '/404',
    component: RouteComponents[404],
    meta: {
      title: '未找到'
    }
  },
  {
    name: STATIC_ROUTE_NAME[500],
    path: '/500',
    component: RouteComponents[500],
    meta: {
      title: '服务器错误'
    }
  }
]

// 固定路由配置
export const constantRoutes: ZiMuRoute.Route[] = [
  ROOT_ROUTE,
  LOGIN_ROUTE,
  DASHBOARD_ROUTE,
  ...ERROR_ROUTES,
  NO_MATCH_ROUTE
]

// 动态路由配置
export { routes }

// 所有路由配置
export const allRoutes: ZiMuRoute.Route[] = [...constantRoutes, ...routes]

/**
 * 权限 store
 */
import { useRouteStore } from '@/store'
import { menus } from '@/server-data'
import { transformFlatMenusToTree } from './helpers'

export const useMenuStore = defineStore('menu-store', () => {
  // 所有权限菜单平铺结构
  const flatMenus = ref<ZiMuAuth.Menu[]>([])
  // 所有权限菜单属性结构
  const authMenus = ref<ZiMuAuth.Menu[]>([])
  // 当前激活的菜单
  const activeMenu = ref<string>()
  // 是否已初始化权限
  const isAuthInitialized = ref(false)

  const routeStore = useRouteStore()

  // 初始化权限菜单
  const initAuthMenus = async () => {
    flatMenus.value = [...menus]
    await routeStore.initRoutes(flatMenus.value)
    authMenus.value = transformFlatMenusToTree(flatMenus.value)
    isAuthInitialized.value = true
  }

  // 设置激活的菜单
  const setActiveMenu = (menu: string) => {
    activeMenu.value = menu
  }
  return {
    /** state start */
    authMenus,
    flatMenus,
    activeMenu,
    isAuthInitialized,
    /** state end */
    /** action end */
    initAuthMenus,
    setActiveMenu
    /** action end */
  }
})

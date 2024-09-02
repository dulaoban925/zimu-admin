/**
 * 权限 store
 */
import { getUserAuth } from '@/apis'
import { MENU_TYPE } from '@/constants'
import { useRouteStore } from '@/store'
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
  const initAuthMenus = async (username: string) => {
    // menus 包含所有权限资源，菜单、按钮等
    const menus = await getUserAuth(username)
    // 筛选菜单类型
    flatMenus.value = menus.filter(
      (m: ZiMuAuth.Menu) => m.type === MENU_TYPE.MENU
    )
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

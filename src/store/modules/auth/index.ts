import { getUserAuth } from '@/apis'
import { MENU_TYPE } from '@/constants'
import { useMenuStore, useRouteStore } from '@/store'
import { transformFlatMenusToTree } from '../menu/helpers'

/**
 * 权限 store
 *
 * 包括 权限菜单（todo）、权限按钮等
 */
export const useAuthStore = defineStore('auth-store', () => {
  const routeStore = useRouteStore()
  const menuStore = useMenuStore()

  // 权限菜单集合
  const authMenus = ref<ZiMuAuth.Menu[]>([])
  // 权限按钮对象集合
  const authButtons = ref<ZiMuAuth.Menu[]>([])
  // 权限按钮编码集合
  const authButtonCodes = computed<string[]>(() =>
    authButtons.value.map(b => b.code)
  )
  // 是否已初始化权限
  const isAuthInitialized = ref(false)

  // 初始化权限
  const initAuth = async (username: string) => {
    // menus 包含所有权限资源，菜单、按钮等
    const menus = await getUserAuth(username)
    // 筛选菜单类型
    const flatMenus = menus.filter(
      (m: ZiMuAuth.Menu) => m.type === MENU_TYPE.MENU
    )
    menuStore.setFlatMenus(flatMenus)
    authButtons.value = menus.filter(
      (m: ZiMuAuth.Menu) => m.type === MENU_TYPE.BUTTON
    )
    // 初始化 Vue 路由
    routeStore.initRoutes(flatMenus)
    // 导航菜单树形结构
    authMenus.value = transformFlatMenusToTree(flatMenus)
    isAuthInitialized.value = true
  }

  const states = {
    authMenus,
    authButtons,
    authButtonCodes,
    isAuthInitialized
  }

  const actions = {
    initAuth
  }

  return {
    ...states,
    ...actions
  }
})

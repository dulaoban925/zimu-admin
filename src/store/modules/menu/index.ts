/**
 * 权限 store
 */
export const useMenuStore = defineStore('menu-store', () => {
  // 所有菜单平铺结构
  const flatMenus = ref<ZiMuAuth.Menu[]>([])
  // 当前激活的菜单
  const activeMenu = ref<string>()

  // 设置平铺结构菜单集合
  const setFlatMenus = (menus: ZiMuAuth.Menu[]) => {
    flatMenus.value = menus
  }

  // 设置激活的菜单
  const setActiveMenu = (menu: string) => {
    activeMenu.value = menu
  }

  const states = {
    flatMenus,
    activeMenu
  }

  const actions = {
    setFlatMenus,
    setActiveMenu
  }

  return {
    ...states,
    ...actions
  }
})

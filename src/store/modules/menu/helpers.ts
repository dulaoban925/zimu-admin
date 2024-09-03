/**
 * 将平铺的菜单结构转化为树形结构
 * @param flatMenus 平铺的菜单列表
 * @returns
 */
export function transformFlatMenusToTree(flatMenus: ZiMuAuth.Menu[]) {
  if (!flatMenus.length) return []
  const result: ZiMuAuth.Menu[] = []

  // 菜单 code 与 菜单对象的映射
  const menuCodeMap = new Map()
  for (const menu of flatMenus) {
    menu.children = []
    menuCodeMap.set(menu.code, menu)
  }

  for (const menu of flatMenus) {
    const parent = menuCodeMap.get(menu.parent)
    if (parent) parent.children.push(menu)
    else result.push(menu)
  }
  return sortMenuTree(result)
}

/**
 * 树形结构菜单排序
 * @param menus 树形结构菜单
 * @returns
 */
export function sortMenuTree(menus: ZiMuAuth.Menu[]) {
  if (!menus.length) return []
  menus.sort((pre, next) => Number(pre.sort) - Number(next.sort))
  for (const menu of menus) {
    if (menu.children) sortMenuTree(menu.children)
  }

  return menus
}

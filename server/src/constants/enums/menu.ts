/**
 * 菜单相关枚举
 */
/**
 * 菜单类型
 * MENU - 系统菜单
 * BUTTON - 功能按钮
 * PAGE - 关联页面，如详情，查看等
 */
export enum MENU_TYPE {
  MENU = 'menu', // 菜单
  BUTTON = 'button', // 按钮
  PAGE = 'page' // 系统页
}

/**
 * 菜单状态
 *
 * ACTIVATE - 激活
 * DEACTIVATE - 停用
 */
export enum MENU_STATUS {
  ACTIVATED = 'activated',
  DEACTIVATED = 'deactivated'
}

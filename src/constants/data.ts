/**
 * 数据类常量
 */
/** 启用状态 start */
export const ACTIVATION_STATUS = {
  ACTIVATED: 'activated',
  DEACTIVATED: 'deactivated'
}

export const ACTIVATION_STATUS_DESC = {
  [ACTIVATION_STATUS.ACTIVATED]: '启用',
  [ACTIVATION_STATUS.DEACTIVATED]: '停用'
}
/** 页面操作类型 end */

/** 菜单类型 start */
export const MENU_TYPE = {
  MENU: 'menu',
  BUTTON: 'button',
  PAGE: 'page'
}

export const MENU_TYPE_DESC = {
  [MENU_TYPE.MENU]: '菜单',
  [MENU_TYPE.BUTTON]: '按钮',
  [MENU_TYPE.PAGE]: '系统页'
}
/** 菜单类型 end */

/** 页面操作类型 start */
export const PAGE_OPERATION = {
  NEW: 'new',
  EDIT: 'edit',
  VIEW: 'view'
}

export const PAGE_OPERATION_DESC = {
  [PAGE_OPERATION.NEW]: '新增',
  [PAGE_OPERATION.EDIT]: '编辑',
  [PAGE_OPERATION.VIEW]: '查看'
}
/** 页面操作类型 end */

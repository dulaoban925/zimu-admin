/**
 * 数据类常量
 */
/** 启用状态 start */
export const ACTIVATION_STATUS = {
  ACTIVATED: 'activated',
  DEACTIVATED: 'deactivated'
} as const

export const ACTIVATION_STATUS_DESC = {
  [ACTIVATION_STATUS.ACTIVATED]: '启用',
  [ACTIVATION_STATUS.DEACTIVATED]: '停用'
}
/** 启用状态 end */

/** 人员在职状态 start */
export const EMPLOYEE_STATUS = {
  SERVING: 'serving', // 在职
  RESIGNED: 'resigned' // 离职
} as const

export const EMPLOYEE_STATUS_DESC = {
  [EMPLOYEE_STATUS.SERVING]: '在职',
  [EMPLOYEE_STATUS.RESIGNED]: '离职'
}
/** 人员在职状态 end */

/** 人员性别 start */
export const GENDER = {
  MALE: 'male', // 男性
  FEMALE: 'female', // 女性
  UNKNOWN: 'unknown' // 未知
} as const

export const GENDER_DESC = {
  [GENDER.MALE]: '男',
  [GENDER.FEMALE]: '女',
  [GENDER.UNKNOWN]: '未知'
}
/** 人员性别 end */

/** 菜单类型 start */
export const MENU_TYPE = {
  MENU: 'menu',
  BUTTON: 'button',
  PAGE: 'page'
} as const

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
} as const

export const PAGE_OPERATION_DESC = {
  [PAGE_OPERATION.NEW]: '新增',
  [PAGE_OPERATION.EDIT]: '编辑',
  [PAGE_OPERATION.VIEW]: '查看'
}
/** 页面操作类型 end */

/** 页面操作类型 start */
export const Y_N = {
  Y: 'Y',
  N: 'N'
} as const

export const Y_N_DESC = {
  [Y_N.Y]: '是',
  [Y_N.N]: '否'
}
/** 页面操作类型 end */

/** 主题类型 start */
export const THEME_SCHEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
} as const
/** 主题类型 end */

/** 用户模块枚举 start */
// 性别
export enum USER_GENDER {
  MALE = 'male', // 男性
  FEMALE = 'female', // 女性
  UNKNOWN = 'unknown' // 未知
}

export enum USER_GENDER_DESC {
  male = '男', // 男性
  female = '女', // 女性
  unknown = '未知' // 未知
}
/** 用户模块枚举 end */

/** 菜单相关枚举 start */
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

export enum MENU_TYPE_DESC {
  menu = '菜单', // 菜单
  button = '按钮', // 按钮
  page = '系统页' // 系统页
}

/**
 * 菜单跳转类型
 */
export enum MENU_NAVIGATE_TYPE {
  INTERNAL = 'internal', // 内部跳转
  EXTERNAL = 'external', // 外部跳转
  NONE = 'none' // 无跳转
}

export enum MENU_NAVIGATE_TYPE_DESC {
  internal = '内部跳转',
  external = '外部跳转',
  none = '无跳转'
}
/** 菜单相关枚举 end */

/** 状态 start */
/**
 * 激活状态
 *
 * ACTIVATE - 激活
 * DEACTIVATE - 停用
 */
export enum ACTIVATION_STATUS {
  ACTIVATED = 'activated',
  DEACTIVATED = 'deactivated'
}

export enum ACTIVATION_STATUS_DESC {
  activated = '启用',
  deactivated = '停用'
}

// 在职状态
export enum USER_STATUS {
  SERVING = 'serving', // 在职
  RESIGNED = 'resigned' // 离职
}

export enum USER_STATUS_DESC {
  serving = '在职', // 在职
  resigned = '离职' // 离职
}

/** 状态 end */

// 是否
export enum Y_N {
  Y = 'Y',
  N = 'N'
}

export enum Y_N_DESC {
  Y = '是',
  N = '否'
}

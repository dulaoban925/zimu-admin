/**
 * 激活状态
 *
 * ACTIVATE - 激活
 * DEACTIVATE - 停用
 */
export const enum ACTIVATION_STATUS {
  ACTIVATED = 'activated',
  DEACTIVATED = 'deactivated'
}

export const enum ACTIVATION_STATUS_DESC {
  activated = '激活',
  deactivated = '停用'
}

// 用户在职状态
export const enum USER_STATUS {
  SERVING = 'serving', // 在职
  RESIGNED = 'resigned' // 离职
}

export const enum USER_STATUS_DESC {
  serving = '在职', // 在职
  resigned = '离职' // 离职
}

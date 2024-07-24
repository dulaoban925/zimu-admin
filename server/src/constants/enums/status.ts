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

// 用户在职状态
export enum USER_STATUS {
  SERVING = 'serving', // 在职
  RESIGNED = 'resigned' // 离职
}

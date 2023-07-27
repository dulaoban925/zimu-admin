// 过度效果名称
export const TRANSITION_NAME = {
  FADE: 'fade', // 消退
  FADE_SLIDE: 'fade-slide', // 滑动
  FADE_BOTTOM: 'fade-bottom', // 底部消退
  FADE_SCALE: 'fade-scale', // 缩放消退
  ZOOM_FADE: 'zoom-fade', // 渐变
  ZOOM_OUT: 'zoom-out' // 闪现
} as const

// 过度模式
export const TRANSITION_MODE = {
  OUT_IN: 'out-in', // 先出后进
  IN_OUT: 'in-out', // 先进后出
  DEFAULT: 'default' // 先进后出
} as const

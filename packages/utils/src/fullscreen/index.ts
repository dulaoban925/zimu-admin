/**
 * 全屏相关
 */
// 开启全屏函数
type RFSMethodName =
  | 'webkitRequestFullScreen'
  | 'requestFullscreen'
  | 'msRequestFullscreen'
  | 'mozRequestFullScreen'
// 关闭全屏函数
type EFSMethodName =
  | 'webkitExitFullscreen'
  | 'msExitFullscreen'
  | 'mozCancelFullScreen'
  | 'exitFullscreen'
// 全屏元素属性名
type FSEPropName =
  | 'webkitFullscreenElement'
  | 'msFullscreenElement'
  | 'mozFullScreenElement'
  | 'fullscreenElement'
/**
 * 全屏事件名称
 * onwebkitfullscreenchange - safari
 * onmozfullscreenchange - fireFox
 * MSFullscreenChange - IE11
 */
type FSCEPropName =
  | 'fullscreenchange'
  | 'onwebkitfullscreenchange'
  | 'onmozfullscreenchange'
  | 'MSFullscreenChange'

// document element
const DOC_EL = document.documentElement
// html head element
let headEl = DOC_EL.querySelector('head')
// 空的 style 标签
const styleEl = document.createElement('style')
let REQUEST_FULL_SCREEN_METHOD: RFSMethodName = 'requestFullscreen'
let EXIT_FULL_SCREEN_METHOD: EFSMethodName = 'exitFullscreen'
let FULL_SCREEN_ELEMENT: FSEPropName = 'fullscreenElement'
let FULL_SCREEN_CHANGE_EVENT: FSCEPropName = 'fullscreenchange'

// 检查浏览器支持程度
export function checkEnvSupport() {
  if (`webkitRequestFullScreen` in DOC_EL) {
    REQUEST_FULL_SCREEN_METHOD = 'webkitRequestFullScreen'
    EXIT_FULL_SCREEN_METHOD = 'webkitExitFullscreen'
    FULL_SCREEN_ELEMENT = 'webkitFullscreenElement'
    FULL_SCREEN_CHANGE_EVENT = 'onwebkitfullscreenchange'
  } else if (`msRequestFullscreen` in DOC_EL) {
    REQUEST_FULL_SCREEN_METHOD = 'msRequestFullscreen'
    EXIT_FULL_SCREEN_METHOD = 'msExitFullscreen'
    FULL_SCREEN_ELEMENT = 'msFullscreenElement'
    FULL_SCREEN_CHANGE_EVENT = 'MSFullscreenChange'
  } else if (`mozRequestFullScreen` in DOC_EL) {
    REQUEST_FULL_SCREEN_METHOD = 'mozRequestFullScreen'
    EXIT_FULL_SCREEN_METHOD = 'mozCancelFullScreen'
    FULL_SCREEN_ELEMENT = 'mozFullScreenElement'
    FULL_SCREEN_CHANGE_EVENT = 'onmozfullscreenchange'
  } else if (!(`requestFullscreen` in DOC_EL)) {
    throw new Error('当前浏览器不支持Fullscreen API !')
  }
}

/**
 * 获取操作全屏的元素
 * 如果传入的不是HTMLElement,
 * 比如是EventTarget
 * 那么返回document.documentElement
 * @param el 目标元素
 * @returns 目标元素或者document.documentElement
 */
function getCurrentElement(el?: HTMLElement): HTMLElement {
  return el instanceof HTMLElement ? el : DOC_EL
}

/**
 * 开启全屏
 * @param el 全屏的目标元素，若不存在，则为 document.documentElement
 * @param backgroundColor 全屏状态下的背景色
 * @returns Promise<void>
 */
export function launchFullScreen(
  el?: HTMLElement,
  backgroundColor?: string
): Promise<void> {
  if (backgroundColor) {
    if (!headEl) headEl = document.createElement('head')
    styleEl.innerHTML = `:fullscreen { background-color: ${backgroundColor}; }`
    headEl?.appendChild(styleEl)
  }
  return getCurrentElement(el)[REQUEST_FULL_SCREEN_METHOD]()
}

/**
 * 退出全屏
 * @returns Promise<void>
 */
export function exitFullScreen(): Promise<void> {
  if (DOC_EL.contains(styleEl)) headEl?.removeChild(styleEl)
  return document[EXIT_FULL_SCREEN_METHOD]()
}

/**
 * 元素是否全屏
 * @param el 目标元素
 */
export function isFullScreen(el?: HTMLElement): boolean {
  return getCurrentElement(el) === document[FULL_SCREEN_ELEMENT]
}

/**
 * 触发开启/关闭全屏
 * @param el 目标元素
 * @param backgroundColor 全屏状态下的背景色
 * @returns boolean
 */
export function toggleFullScreen(
  el?: HTMLElement,
  backgroundColor?: string
): boolean {
  if (isFullScreen(el)) {
    exitFullScreen()
    return false
  } else {
    launchFullScreen(el, backgroundColor)
    return true
  }
}

/**
 * 添加监听
 * @param listener 监听事件
 */
export function toggleFullScreenEventListener(
  // eslint-disable-next-line no-undef
  listener: EventListenerOrEventListenerObject,
  add: boolean
) {
  add
    ? window.addEventListener(FULL_SCREEN_CHANGE_EVENT, listener)
    : window.removeEventListener(FULL_SCREEN_CHANGE_EVENT, listener)
}

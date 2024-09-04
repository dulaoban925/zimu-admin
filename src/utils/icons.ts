import { icons } from '@zimu/icons'
import type { App } from 'vue'

/**
 * 获取指定 icon
 */
export function getIcon(icon: string) {
  return (icons as any)[icon] ?? null
}

/**
 * 安装 @zimu/icons
 */
export function setupZimuIcons(app: App<any>) {
  for (const [key, component] of Object.entries(icons)) {
    console.log('🚀 ~ setupZimuIcons ~ key, component:', key, component)
    app.component(key, component)
  }
}

import { App, Component } from 'vue'
import { ZmMenu } from './zm-menu'
import * as ElementPlusIcons from '@element-plus/icons'
import * as ZmIcons from './zm-icons'

export * from './zm-menu'

const customComponents: {
  [propName: string]: Component
} = {
  ZmMenu
}

export default (app: App<Element>) => {
  const componentEntries: [string, Component][] = [
    ...Object.entries(customComponents),
    ...Object.entries(ZmIcons),
    ...Object.entries(ElementPlusIcons)
  ]
  for (const [key, component] of componentEntries) {
    app.component(key, component)
  }
}

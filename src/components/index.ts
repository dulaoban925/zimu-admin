import { App, Component } from 'vue'
import { ZmMenu } from './zm-menu'
import { ZmTransition } from './zm-transition'
import * as ElementPlusIcons from '@element-plus/icons'
import * as ZiMuIcons from '@zimu/icons'

export * from './zm-menu'

const customComponents: {
  [propName: string]: Component
} = {
  ZmMenu,
  ZmTransition
}

export default (app: App<Element>) => {
  const componentEntries: [string, Component][] = [
    ...Object.entries(customComponents),
    ...Object.entries(ElementPlusIcons),
    ...Object.entries(ZiMuIcons)
  ]
  for (const [key, component] of componentEntries) {
    app.component(key, component)
  }
}

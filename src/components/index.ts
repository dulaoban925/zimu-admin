import { App, Component } from 'vue'
import { ZmMenu } from './zm-menu'
import { ZmTransition } from './zm-transition'
import { ZmScroll } from './zm-scroll'
import * as ElementPlusIcons from '@element-plus/icons'
import ZiMuIcons from '@zimu/icons'

export * from './zm-menu'

const customComponents: {
  [propName: string]: Component
} = {
  ZmMenu,
  ZmTransition,
  ZmScroll
}

const install = (app: App<Element>) => {
  const componentEntries: [string, Component][] = [
    ...Object.entries(customComponents),
    ...Object.entries(ElementPlusIcons)
  ]
  for (const [key, component] of componentEntries) {
    app.component(key, component)
  }
}

export const setupComponents = (app: App<Element>) => {
  install(app)
  app.use(ZiMuIcons)
}

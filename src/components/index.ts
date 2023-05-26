import { App } from 'vue'
import { ZmMenu } from './zm-menu'
import * as ElementPlusIcons from '@element-plus/icons'

export * from './zm-menu'

const customComponents = {
  ZmMenu
}

export default {
  install(app: App<Element>) {
    for (const [key, component] of Object.entries(ElementPlusIcons)) {
      app.component(key, component)
    }

    for (const [key, component] of Object.entries(customComponents)) {
      app.component(key, component)
    }
  }
}

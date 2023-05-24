import { App } from 'vue'
import * as ElementPlusIcons from '@element-plus/icons'

export default {
  install(app: App<Element>) {
    for (const [key, component] of Object.entries(ElementPlusIcons)) {
      app.component(key, component)
    }
  }
}

import * as ElementPlusIcons from '@element-plus/icons-vue'
import ZiMuIcons from '@zimu/icons'
import type { App, Component } from 'vue'

type ComponentModule = Record<
  string,
  { default: Component; [propName: string]: any }
>

function getCustomComponents() {
  const modules: ComponentModule = import.meta.glob('./**/index.ts', {
    eager: true
  })

  const components = []
  for (const m of Object.values(modules)) {
    for (const k of Object.keys(m)) {
      if (k !== 'default' && m[k]?.name === k) {
        components.push(m[k])
      }
    }
  }

  return components
}

export const setupComponents = (app: App<Element>) => {
  const customComponents = getCustomComponents()
  for (const component of customComponents) {
    app.component(component.name!, component)
  }
  for (const icon of Object.values(ElementPlusIcons)) {
    app.component(icon.name!, icon)
  }
  app.use(ZiMuIcons)
}

export default (app: App<Element>) => {
  setupComponents(app)
}

export * from './zm-menu'

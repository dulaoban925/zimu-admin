import { App, Component } from 'vue'
import ElementPlusIcons from '@element-plus/icons-vue/global'
import ZiMuIcons from '@zimu/icons'

type ComponentModule = Record<string, { default: Component }>

function getCustomComponents() {
  const modules: ComponentModule = import.meta.glob('./**/index.ts', {
    eager: true
  })

  const components = Object.values(modules)
    .map(m => m.default)
    .filter(c => !!c)

  return components
}

export const setupComponents = (app: App<Element>) => {
  const customComponents = getCustomComponents()
  for (const component of customComponents) {
    app.component(component.name!, component)
  }
  app.use(ElementPlusIcons)
  app.use(ZiMuIcons)
}

export default (app: App<Element>) => {
  setupComponents(app)
}

export * from './zm-menu'

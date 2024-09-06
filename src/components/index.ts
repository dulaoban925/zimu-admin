import { setupZimuIcons } from '@/utils/icons'
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
  for (const module of Object.values(modules)) {
    for (const key of Object.keys(module)) {
      if (key !== 'default' && module[key]?.name === key) {
        components.push(module[key])
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
  setupZimuIcons(app)
}

export default (app: App<Element>) => {
  setupComponents(app)
}

export * from './zm-menu'

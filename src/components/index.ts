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
  setupZimuIcons(app)
}

export default (app: App<Element>) => {
  setupComponents(app)
}

export * from './zm-menu'

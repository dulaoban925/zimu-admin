import * as icons from './components'
import type { App } from 'vue'

export interface Options {
  prefix?: string
}

export default (app: App, { prefix = '' }: Options = {}) => {
  Object.entries(icons).forEach(([k, component]) => {
    app.component(`${prefix}${k}`, component)
  })
}

export { icons }
export * from './components'

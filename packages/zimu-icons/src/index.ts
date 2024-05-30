import { App } from 'vue'

import * as icons from './components'

export interface Options {
  prefix?: string
}

export default (app: App<Element>, { prefix = '' }: Options = {}) => {
  Object.entries(icons).forEach(([k, component]) => {
    app.component(`${prefix}${k}`, component)
  })
}

export { icons }
export * from './components'

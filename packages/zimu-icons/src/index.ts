import { App } from 'vue'

import * as components from './components'

export * from './components'

export default (app: App<Element>) => {
  Object.entries(components).forEach(([k, component]) => {
    console.log(k, component)
    app.component(k, component)
  })
}

import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import { setupComponents } from '@/components'
import { setup as setupDirective } from '@/directives'
import { useAppLoading } from '@/hooks'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import App from './App.vue'
import './style.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/app.scss'

const appSelector = '#app'
async function setup() {
  const appLoading = useAppLoading()
  appLoading.mount(appSelector)

  const app = createApp(App)
  app.use(ElementPlus)
  setupComponents(app)
  setupStore(app)
  setupDirective(app)
  await setupRouter(app)

  appLoading.unmount()
  app.mount(appSelector)
}

setup()

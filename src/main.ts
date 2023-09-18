import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import App from './App.vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { setupComponents } from '@/components'

async function setup() {
  const app = createApp(App)

  app.use(ElementPlus)

  setupComponents(app)

  setupStore(app)

  await setupRouter(app)

  app.mount('#app')
}

setup()

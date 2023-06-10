import { createApp } from 'vue'
import './style.css'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import CustomComponents from '@/components'
import App from './App.vue'

async function setup() {
  const app = createApp(App)

  app.use(ElementPlus)

  app.use(CustomComponents)

  setupStore(app)

  await setupRouter(app)

  app.mount('#app')
}

setup()

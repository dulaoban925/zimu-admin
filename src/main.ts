import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import { setupComponents } from '@/components'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import App from './App.vue'
import './style.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
async function setup() {
  const app = createApp(App)

  app.use(ElementPlus)

  setupComponents(app)

  setupStore(app)

  await setupRouter(app)

  app.mount('#app')
}

setup()

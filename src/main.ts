import { createApp } from 'vue'
import './style.css'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import CustomComponents from '@/components'
import App from './App.vue'

const app = createApp(App)

app.use(router)

app.use(ElementPlus)

app.use(CustomComponents)

app.mount('#app')

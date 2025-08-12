import ElementPlus from 'element-plus'

import { createApp } from 'vue'

import App from './App.vue'

import stores from './stores'

import '@unocss/reset/tailwind.css'

import 'uno.css'

import './styles/index.scss'

import 'element-plus/dist/index.css'

import 'element-plus/theme-chalk/dark/css-vars.css'

// 导入 SVG 图标
import 'virtual:svg-icons-register'

// createApp(App).mount(
//   (() => {
//     // App.use(ElementPlus)
//     const app = document.createElement('div')

//     document.body.append(app)
//     return app
//   })(),
// )
const app = createApp(App)

app.use(ElementPlus)

app.use(stores)

const container = document.createElement('div')

document.body.append(container)

app.mount(container)

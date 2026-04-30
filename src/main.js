/**
 * Main entry point | 主入口
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createDiscreteApi } from 'naive-ui'
import App from './App.vue'
import router from './router'
import './style.css'

const { message, dialog } = createDiscreteApi(
  ['message', 'dialog'],
  {
    messageProviderProps: {
      placement: 'top-right',
      max: 1,
      duration: 2500
    }
  }
)
window.$message = message
window.$dialog = dialog

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')

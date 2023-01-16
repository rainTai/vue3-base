import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index'
import 'normalize.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus, { locale })
app.mount('#app')

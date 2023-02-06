import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index'
import 'normalize.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'

// 预览组件以及样式
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
// VuePress主题以及样式（这里也可以选择github主题）
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

// Prism
import Prism from 'prismjs'
// 代码高亮
import 'prismjs/components/prism-json'

// 选择使用主题
VMdPreview.use(vuepressTheme, {
  Prism,
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus, { locale })
// 引入v-md-editor预览组件
app.use(VMdPreview)
app.mount('#app')

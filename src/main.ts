import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// element-plus
import installElementPlus from './plugins/element'
// 初始化css
import 'normalize.css/normalize.css'
// 全局样式
import '@/style/index.scss'

const app = createApp(App)
installElementPlus(app)
app.use(store).use(router).use(installElementPlus).mount('#app')

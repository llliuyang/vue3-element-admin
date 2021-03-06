import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { key } from './store'
// element-plus
import installElementPlus, { Size } from './plugins/element'
// 初始化css
import 'normalize.css/normalize.css'
// 全局样式
import '@/styles/index.scss'
// svg icons
import initSvgIcons from '@/icons/index'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'

const app = createApp(App)
// 获取存储在store里的size
const size = store.state.app.size
app
  .use(store, key)
  .use(router)
  .use(installElementPlus, { size })
  .use(initSvgIcons)
  .mount('#app')

// vue实例上挂载属性类型声明
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: typeof ElMessage;
    $notify: typeof ElNotification;
    $confirm: typeof ElMessageBox.confirm;
    $alert: typeof ElMessageBox.alert;
    $prompt: typeof ElMessageBox.prompt;
    $ELEMENT: {
      size: Size
    }
  }
}

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// element-plus
import installElementPlus from './plugins/element'
// 初始化css
import 'normalize.css/normalize.css'
// 全局样式
import '@/styles/index.scss'
// svg icons
import initSvgIcons from '@/icons/index'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
const app = createApp(App)
installElementPlus(app)
app
  .use(store)
  .use(router)
  .use(installElementPlus)
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
  }
}

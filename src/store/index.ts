import { createStore, Store, useStore as baseUseStore } from 'vuex'
import app, { IAppState } from '@/store/modules/app'
import { InjectionKey } from 'vue'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
import tagsView, { ITagsViewState } from '@/store/modules/tagsView'
import settings, { ISettingsState } from '@/store/modules/settings'

// 声明全局状态类型，主要就是我们定义的模块 这样store.state.app才会有类型提示
export interface IRootState {
  app: IAppState,
  tagsView: ITagsViewState,
  settings: ISettingsState,
}

// 通过下面方式使用 TypeScript 定义 store 能在使用时正确地为 store 提供类型声明。
// https://next.vuex.vuejs.org/guide/typescript-support.html#simplifying-usestore-usage
// eslint-disable-next-line symbol-description
export const key: InjectionKey<Store<IRootState>> = Symbol()
// 这个key算是个密钥 入口main.ts需要用到 vue.use(store, key) 才能正常使用

// vuex store持久化 默认使用localstorage持久化
const persisteAppState = createPersistedState({
  storage: window.sessionStorage,
  key: 'vuex_app', // 存储名 默认都是vuex 多个模块需要指定 否则会覆盖
  // paths: ['app'] // 针对app这个模块持久化
  // 只针对app模块下sidebar.opened状态持久化
  paths: ['app.sidebar.opened', 'app.size'] // 通过点连接符指定state路径
})

const persisteSettingsState = createPersistedState({
  storage: window.sessionStorage, // 指定storage 也可自定义
  key: 'vuex_setting',
  paths: ['settings.theme', 'settings.originalStyle', 'settings.tagsView', 'settings.sidebarLogo'] // 通过点连接符指定state路径
})

export default createStore<IRootState>({
  plugins: [persisteAppState, persisteSettingsState],
  getters,
  modules: {
    app,
    tagsView,
    settings
  }
})

// 定义自己的 `useStore` 组合式函数
// https://next.vuex.vuejs.org/zh/guide/typescript-support.html#%E7%AE%80%E5%8C%96-usestore-%E7%94%A8%E6%B3%95
// eslint-disable-next-line
export function useStore () {
  return baseUseStore(key)
}

// vuex持久化 vuex-persistedstate文档说明
// https://www.npmjs.com/package/vuex-persistedstate

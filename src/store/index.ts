import { createStore, Store, useStore as baseUseStore } from 'vuex'
import app, { IAppState } from '@/store/modules/app'
import { InjectionKey } from 'vue'
import getters from './getters'

// 声明全局状态类型，主要就是我们定义的模块 这样store.state.app才会有类型提示
export interface IRootState {
  app: IAppState
}
// 通过下面方式使用 TypeScript 定义 store 能在使用时正确地为 store 提供类型声明。
// https://next.vuex.vuejs.org/guide/typescript-support.html#simplifying-usestore-usage
// eslint-disable-next-line symbol-description
export const key: InjectionKey<Store<IRootState>> = Symbol()
// 这个key算是个密钥 入口main.ts需要用到 vue.use(store, key) 才能正常使用

export default createStore<IRootState>({
  getters,
  modules: {
    app
  }
})

// 定义自己的 `useStore` 组合式函数
// https://next.vuex.vuejs.org/zh/guide/typescript-support.html#%E7%AE%80%E5%8C%96-usestore-%E7%94%A8%E6%B3%95
// eslint-disable-next-line
export function useStore () {
  return baseUseStore(key)
}

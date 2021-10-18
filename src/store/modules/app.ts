import { ActionTree, Module, MutationTree } from 'vuex'
import { IRootState } from '@/store'

export interface IAppState {
  sidebar: {
    opened: boolean // 菜单导航展开时true 收缩时false
  }
}

const mutations: MutationTree<IAppState> = {
  TOGGLE_SIDEBAR (state) {
    state.sidebar.opened = !state.sidebar.opened
  }
}

const actions: ActionTree<IAppState, IRootState> = {
  toggleSidebar ({ commit }) {
    commit('TOGGLE_SIDEBAR')
  }
}

const app: Module<IAppState, IRootState> = {
  // 用了命名空间 store.dispatch('模块名/action函数名')
  // 获取state就要 store.state.app.sidebar (store.state.模块名.状态)
  namespaced: true,
  state: {
    sidebar: {
      opened: true
    }
  },
  mutations,
  actions
}

export default app

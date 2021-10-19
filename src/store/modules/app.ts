import { ActionTree, Module, MutationTree } from 'vuex'
import { IRootState } from '@/store'
import { Size } from '@/plugins/element'

export interface IAppState {
  sidebar: {
    opened: boolean // 菜单导航展开时true 收缩时false
  },
  size: Size
}

const mutations: MutationTree<IAppState> = {
  TOGGLE_SIDEBAR (state) {
    state.sidebar.opened = !state.sidebar.opened
  },
  SET_SIZE(state, size: Size) {
    state.size = size
  }
}

const actions: ActionTree<IAppState, IRootState> = {
  toggleSidebar ({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  setSize({ commit }, size: Size) {
    commit('SET_SIZE', size)
  }
}

const app: Module<IAppState, IRootState> = {
  // 用了命名空间 store.dispatch('模块名/action函数名')
  // 获取state就要 store.state.app.sidebar (store.state.模块名.状态)
  namespaced: true,
  state: {
    sidebar: {
      opened: true
    },
    size: 'medium'
  },
  mutations,
  actions
}

export default app

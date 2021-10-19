import { GetterTree } from 'vuex'
import { IRootState } from '@/store/index'

const getters: GetterTree<IRootState, IRootState> = {
  sidebar: (state) => state.app.sidebar,
  size: (state) => state.app.size
}
export default getters

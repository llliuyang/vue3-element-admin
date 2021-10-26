<template>
  <div class="navbar">
    <hambuger @toggleClick="toggleSidebar" :is-active="sidebar.opened"/>
    <breadcrumb/>
    <div class="right-menu">
      <!--      设置-->
      <div class="setting right-menu-item hover-effect" @click="openShowSetting">
        <i class="el-icon-s-tools"></i>
      </div>
      <!--全屏切换-->
      <screenfull id="screenfull" class="right-menu-item hover-effect"></screenfull>
      <!--element组件size切换-->
      <el-tooltip content="Global Size" effect="dark" placement="bottom">
        <size-select class="right-menu-item hover-effect"></size-select>
      </el-tooltip>
      <!--      用户头像-->
      <avatar/>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hambuger from '@/components/Hambuger/index.vue'
import { useStore } from '@/store'
import Screenfull from '@/components/Screenfull/index.vue'
import SizeSelect from '@/components/SizeSelect/index.vue'
import Avatar from './Avatar/index.vue'

export default defineComponent({
  name: 'Navbar',
  components: {
    SizeSelect,
    Hambuger,
    Breadcrumb,
    Screenfull,
    Avatar
  },
  emits: ['showSetting'],
  setup (props, { emit }) {
    const store = useStore()
    const toggleSidebar = () => {
      store.dispatch('app/toggleSidebar')
    }
    const sidebar = computed(() => store.getters.sidebar)

    // 打开设置面板
    const openShowSetting = () => {
      emit('showSetting', true)
    }

    return {
      toggleSidebar,
      sidebar,
      openShowSetting
    }
  }
})
</script>

<style lang="scss">
.navbar {
  display: flex;
  background: #fff;
  border-bottom: 1px solid rgba(0, 21, 41, .08);
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .right-menu {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 15px;

    .setting {
      font-size: 26px;
    }

    &-item {
      padding: 0 8px;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025);
        }
      }
    }
  }
}
</style>

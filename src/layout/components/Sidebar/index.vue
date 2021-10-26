<template>
  <div class="sidebar-wrapper">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <scroll-panel>
      <el-menu
        class="sidebar-container-menu"
        :class="{ 'sidebar-show-logo': showLogo }"
        mode="vertical"
        :default-active="activeMenu"
        :background-color="scssVariables.menuBg"
        :text-color="scssVariables.menuText"
        :active-text-color="themeColor"
        :collapse="isCollapse"
        :collapse-transition="true">
        <sidebar-item
          v-for="route in menuRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"/>
      </el-menu>
    </scroll-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
// 导入scss变量在组件中使用
import variables from '@/styles/variables.scss'
// 导入路由表
import { routes } from '@/router'
// el-menu-item封装组件
import SidebarItem from './SidebarItem.vue'
import { useStore } from '@/store'
import Logo from './Logo.vue'
import ScrollPanel from '@/components/ScrollPanel/ScrollPanel.vue'

export default defineComponent({
  name: 'Sidebar',
  components: {
    ScrollPanel,
    Logo,
    SidebarItem
  },
  setup () {
    const route = useRoute()
    const store = useStore()
    // 根据路由路径 对应 当前激活的菜单 页面刷新后 激活当前路由匹配的菜单
    const activeMenu = computed(() => {
      const {
        path,
        meta
      } = route
      // 根据meta.activeMenu指定当前路由激活时，哪个高亮
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })
    // scss 变量
    const scssVariables = computed(() => variables)
    // 展开收起状态,如果是展开就收起
    const isCollapse = computed(() => !store.getters.sidebar.opened)
    // 渲染路由
    const menuRoutes = computed(() => routes)

    // 获取主题色
    const themeColor = computed(() => store.getters.themeColor)

    const showLogo = computed(() => store.state.settings.sidebarLogo)

    return {
      scssVariables,
      isCollapse,
      activeMenu,
      menuRoutes,
      themeColor,
      showLogo
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar-wrapper {
  .sidebar-container-menu {
    height: 100vh;
    &.sidebar-show-logo {
      height: calc(100vh - 50px);
    }
  }
}
</style>

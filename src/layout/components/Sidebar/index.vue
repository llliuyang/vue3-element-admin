<template>
  <div>
    <el-menu
      class="sidebar-container-menu"
      mode="vertical"
      :default-active="activeMenu"
      :background-color="scssVariables.menuBg"
      :text-color="scssVariables.menuText"
      :active-text-color="scssVariables.menuActiveText"
      :collapse="isCollapse"
      :collapse-transition="true">
      <sidebar-item
        v-for="route in menuRoutes"
        :key="route.path"
        :item="route"
        :base-path="route.path"/>
    </el-menu>
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

export default defineComponent({
  name: 'Sidebar',
  components: {
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

    return {
      scssVariables,
      isCollapse,
      activeMenu,
      menuRoutes
    }
  }
})
</script>

<style scoped>

</style>

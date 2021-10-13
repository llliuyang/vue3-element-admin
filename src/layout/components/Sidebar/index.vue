<template>
  <div>
    <h8 @click="isCollapse=!isCollapse">colspan test</h8>
    <el-menu
      class="sidebar-container-menu"
      mode="vertical"
      :default-active="activeMenu"
      :background-color="scssVariables.menuBg"
      :text-color="scssVariables.menuText"
      :active-text-color="scssVariables.menuActiveText"
      :collapse="isCollapse"
      :collapse-transition="true">
      <sidebar-item />
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
// 导入scss变量在组件中使用
import variables from '@/styles/variables.scss'
// el-menu-item封装组件
import SidebarItem from './SidebarItem.vue'

export default defineComponent({
  name: 'Sidebar',
  components: {
    SidebarItem
  },
  setup() {
    const route = useRoute()
    // 根据路由路径 对应 当前激活的菜单 页面刷新后 激活当前路由匹配的菜单
    const activeMenu = computed(() => {
      const { path } = route
      return path
    })
    // scss 变量
    const scssVariables = computed(() => variables)
    const isCollapse = ref(true)

    return {
      scssVariables,
      isCollapse,
      activeMenu
    }
  }
})
</script>

<style scoped>

</style>

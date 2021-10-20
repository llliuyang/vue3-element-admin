<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <Sidebar></Sidebar>
    </div>
    <div class="main-container">
      <div class="header">
        <navbar/>
        <tags-view/>
      </div>
      <app-main/>
    </div>
  </div>
</template>
<script lang="ts">
import Sidebar from './components/Sidebar/index.vue'
import AppMain from '@/layout/components/AppMain.vue'
import Navbar from '@/layout/components/Navbar.vue'
import TagsView from '@/layout/components/TagsView/index.vue'

export default {
  components: {
    TagsView,
    Navbar,
    AppMain,
    Sidebar
  }
}
</script>
<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  width: 100%;
  height: 100%;

  .main-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .app-main {
      /* 50= navbar  50  如果有tagsview + 34  */
      min-height: calc(100vh - 84px);
      background: #fff;
    }
  }
}
</style>

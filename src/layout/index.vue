<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <Sidebar></Sidebar>
    </div>
    <div class="main-container">
      <div class="header">
        <navbar @showSetting="openSetting" />
        <tags-view/>
      </div>
      <app-main/>
    </div>
    <right-panel
      v-model="showSetting"
      title="样式风格设置"
      :size="settingsPanelWidth">
    </right-panel>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import Sidebar from './components/Sidebar/index.vue'
import AppMain from '@/layout/components/AppMain.vue'
import Navbar from '@/layout/components/Navbar.vue'
import TagsView from '@/layout/components/TagsView/index.vue'
import RightPanel from '@/components/RightPanel/index.vue'
import variables from '@/styles/variables.scss'

export default defineComponent({
  components: {
    RightPanel,
    TagsView,
    Navbar,
    AppMain,
    Sidebar
  },
  setup() {
    const showSetting = ref(false)
    const openSetting = () => {
      showSetting.value = true
    }

    return {
      showSetting,
      openSetting,
      settingsPanelWidth: variables.settingPanelWidth
    }
  }
})
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

<template>
  <div class="navbar">
    <hambuger @toggleClick="toggleSidebar" :is-active="sidebar.opened"/>
    <breadcrumb/>
    <div class="right-menu">
      <screenfull id="screenfull" class="right-menu-item hover-effect"></screenfull>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hambuger from '@/components/Hambuger/index.vue'
import { useStore } from '@/store'
import Screenfull from '@/components/Screenfull/index.vue'

export default defineComponent({
  name: 'Navbar',
  components: {
    Hambuger,
    Breadcrumb,
    Screenfull
  },
  setup () {
    const store = useStore()
    const toggleSidebar = () => {
      store.dispatch('app/toggleSidebar')
    }
    const sidebar = computed(() => store.getters.sidebar)

    return {
      toggleSidebar,
      sidebar
    }
  }
})
</script>

<style lang="scss">
.navbar {
  display: flex;

  .right-menu {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 15px;

    .right-menu-item.hover-effect {
      cursor: pointer;
    }
  }
}
</style>

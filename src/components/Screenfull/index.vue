<template>
  <div>
    <svg-icon
      :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'"
      @click="handleClick"></svg-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue'
import screenfull, { Screenfull } from 'screenfull'

export default defineComponent({
  name: 'ScreenFull',
  setup () {
    const { proxy } = getCurrentInstance()!
    const isFullscreen = ref(false)
    const handleClick = () => {
      if (screenfull.isEnabled) {
        screenfull.toggle()
        return
      }
      return proxy?.$message({
        message: 'your browser can not work',
        type: 'warning'
      })
    }

    const change = () => {
      // 更新当前全屏状态 根据状态切换对应图标
      isFullscreen.value = (screenfull as Screenfull).isFullscreen
    }

    const init = () => {
      if (screenfull.isEnabled) {
        screenfull.on('change', change)
      }
    }

    onMounted(() => {
      init()
    })

    return {
      isFullscreen,
      handleClick
    }
  }
})
</script>

<style scoped>

</style>

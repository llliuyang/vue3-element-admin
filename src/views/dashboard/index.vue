<template>
  <div>
    <h1>Dashboard page</h1>
    缓存测试 <input type="text">
    <svg-icon icon-class="bug"></svg-icon>
    <svg-icon icon-class="404" class-name="custom" @click="sayHi"></svg-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  name: 'Dashboard',
  setup() {
    const { proxy } = getCurrentInstance()!
    const sayHi = () => {
      // eslint-disable-next-line no-unused-expressions
      proxy?.$message.success('hello! hi~')
    }
    return { sayHi }
  }
})
</script>

<style lang="scss">
.custom{
  font-size: 200px;
  color: green;
  border: 1px solid #12efff;
}
</style>

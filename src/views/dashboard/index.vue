<template>
  <div>
    <h1>Dashboard page</h1>
    <svg-icon icon-class="bug"></svg-icon>
    <svg-icon icon-class="404" class-name="custom" @click="sayHi"></svg-icon>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const sayHi = () => {
      alert('hi')
    }

    return {
      sayHi
    }
  }
}
</script>

<style lang="scss">
.custom{
  font-size: 200px;
  color: green;
  border: 1px solid #12efff;
}
</style>

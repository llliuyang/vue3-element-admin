<template>
  <div class="right-panel">
    <el-drawer
      :model-value="modelValue"
      :direction="direction"
      :show-close="showClose"
      :custom-class="customClass"
      :with-header="withHeader"
      :title="title"
      :size="size"
      @close="handleClose">
      <slot/>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RightPanel',
  props: {
    modelValue: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      validator (val: string) {
        return ['rtl', 'ltr', 'ttb', 'btt'].includes(val)
      },
      default: 'rtl'
    },
    showClose: {
      type: Boolean,
      default: true
    },
    customClass: {
      type: String,
      default: 'setting-panel'
    },
    withHeader: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '自定义标题'
    },
    size: {
      type: [String, Number]
    }
  },
  emits: ['update:modelValue', 'close'],
  setup(props, { emit }) {
    const handleClose = () => {
      emit('update:modelValue', false)
      emit('close')
    }

    return {
      handleClose
    }
  }
})
</script>

<style scoped>

</style>

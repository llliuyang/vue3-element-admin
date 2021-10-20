<template>
  <div class="tags-view-container">
    <div class="tags-view-wrapper">
      <!--      一个个tags view就是router-link-->
      <router-link class="tags-view-item"
                   :class="{active: isActive(tag)}"
                   v-for="(tag,index) in visitedTags"
                   :key="index"
                   :to="{path: tag.path, query: tag.query, fullPath:tag.fullPath}"
                   tag="span">
        {{ tag.meta.title }}
        <span class="el-icon-close"
              @click.prevent.stop="closeSelectedTag(tag)"></span>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watch } from 'vue'
import { useStore } from '@/store'
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import { RouteLocationWithFullPath } from '@/store/modules/tagsView'

export default defineComponent({
  name: 'TagsView',
  setup () {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const visitedTags = computed(() => store.state.tagsView.visitedViews)
    // 添加tag
    const addedTags = () => {
      const { name } = route
      if (name) {
        store.dispatch('tagsView/addView', route)
      }
    }

    // 当路径发生变化，追加tags view
    watch(() => route.path, () => {
      addedTags()
    })

    onMounted(() => {
      addedTags()
    })

    // 当前是否是激活的tag
    const isActive = (tag: RouteRecordRaw) => {
      return tag.path === route.path
    }

    // 删除后，让tagview集合中最后一个变为选中状态
    const toLastView = (visitedViews: RouteLocationWithFullPath[], view: RouteLocationWithFullPath) => {
      // 得到集合中最后一个项tag view 可能没有
      const lastView = visitedViews[visitedViews.length - 1]
      if (lastView) {
        router.push(lastView.fullPath as string)
      } else {
        // 集合中没有tag view时
        // 如果刚刚删除的正是Dashboard 就重定向回Dashboard（首页）
        if (view.name === 'Dashboard') {
          router.replace({ path: '/redirect' + view.fullPath as string })
        } else {
          // tag都没有了 删除的也不是Dashboard 只能跳转首页
          router.push('/')
        }
      }
    }

    // 关闭当前右键的tag路由
    const closeSelectedTag = (view: RouteLocationWithFullPath) => {
      // 关闭并移除view
      store.dispatch('tagsView/delView', view).then(() => {
        // 如果移除的view是当前选中状态view, 就让删除后的集合中最后一个tag view为选中态
        if (isActive(view)) {
          toLastView(visitedTags.value, view)
        }
      })
    }

    return {
      visitedTags,
      isActive,
      closeSelectedTag
    }
  }
})
</script>

<style lang="scss" scoped>
.tags-view-container {
  width: 100%;
  height: 34px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);

  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      background: #fff;
      color: #495060;
      padding: 0 8px;
      box-sizing: border-box;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;

        &::before {
          position: relative;
          display: inline-block;
          content: '';
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 5px;
          background: #fff;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.tags-view-container {
  .el-icon-close {
    width: 16px;
    height: 16px;
    position: relative;
    left: 2px;
    border-radius: 50%;
    text-align: center;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    transform-origin: 100% 50%;

    &:before {
      transform: scale(.6);
      display: inline-block;
      vertical-align: -1px;
    }

    &:hover {
      background-color: #b4bccc;
      color: #fff;
    }
  }
}
</style>

import { useStore } from '@/store'
import { computed } from 'vue'
import { writeNewStyle } from '@/utils/writeNewStyle'
import { generateColors } from '@/utils/color'
import { useThemeFiles } from '@/hooks/useThemeFiles'
import { getStyleTemplate } from '@/utils/getStyleTemplate'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useGenerateTheme = () => {
  const store = useStore()
  // 从store中获取theme主题色
  const defaultTheme = computed(() => store.state.settings.theme)
  // 获取element-ui 主题文件内容 通过axios获取的 作为变量替换模板
  const originalStyle = computed(() => store.state.settings.originalStyle)
  // 生成主题
  // 了解element ui 设计 https://juejin.cn/post/6844903960218697741
  const generateTheme = (color: string) => {
    const colors = Object.assign({
      primary: defaultTheme.value
    }, generateColors(color))
    // 写入新的css样式
    writeNewStyle(originalStyle.value, colors)
  }

  // 第一步 远程获取element-ui 主题文件作为模板 然后进行变量替换 替换成我们所选主题色
  const { getThemeChalkStyle } = useThemeFiles()
  // 如果主题模板不存在 就要发送请求获取
  if (!originalStyle.value) {
    // axios请求后去 主题模板
    getThemeChalkStyle().then(data => {
      // data是获取到主题文件的css内容
      // 生成样式模板 将里面css内容里默认主题颜色值 替换成变量标记 如 '#409eff' => 'primary',
      // 方便我们后续 把primary字符标记 换成我们的主题色
      const styleValue = getStyleTemplate(data as string)
      // 把模板保存到 store中缓存起来 不用每次重新获取
      store.dispatch('settings/changeSetting', {
        key: 'originalStyle',
        value: styleValue
      })
      // 根据主题色生成主题 插入到html中
      generateTheme(defaultTheme.value)
    })
  } else {
    generateTheme(defaultTheme.value)
  }
  return {
    generateTheme
  }
}

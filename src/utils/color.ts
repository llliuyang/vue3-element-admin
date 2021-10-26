import color from 'css-color-function'
import { formula, IObject } from './constants'

// 转换成不同色调的rgb颜色值
// https://www.w3cplus.com/css/the-power-of-rgba.html
export const generateColors = (primary: string): IObject => {
  const colors = {} as IObject
  Object.keys(formula).forEach(key => {
    // element ui 主题色 渐变色设计 https://juejin.cn/post/6844903960218697741
    // 根据主题色生成渐变色 将formula对象中字符primary 替换成我们所选的主题色
    const value = formula[key].replace(/primary/g, primary)
    colors[key] = color.convert(value) // 转换成rgba颜色值
  })
  return colors
}

<!-- 主题切换按钮 -->
<template>
  <el-switch
    ref="switchRef"
    v-model="darkMode"
    v-bind="attrs"
    :before-change="handleBeforeChange"
    :active-action-icon="DarkIcon"
    :inactive-action-icon="LightIcon"
  />
</template>

<script setup lang="ts">
import { isDark, toggleDark } from './helper'
import DarkIcon from './icons/dark.vue'
import LightIcon from './icons/light.vue'

defineOptions({
  name: 'ZmThemeToggler'
})

const emit = defineEmits(['toggled'])

const darkMode = ref(isDark.value)

watch(
  () => darkMode.value,
  () => {
    toggleDark()
  }
)

const attrs = useAttrs()

const switchRef = useTemplateRef('switchRef')
const handleBeforeChange = () => {
  // 浏览器不支持 View Transitions 时的回退方案：
  if (!document.startViewTransition) {
    return true
  }

  return new Promise(resolve => {
    // el-switch dom 元素
    const switchEl = switchRef.value.$el as HTMLElement
    const rect = switchEl.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    // 获取剪切圆半径，勾股定理，已知两边求第三边长度：a2 + b2 = c2
    const radius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )

    const transition = document.startViewTransition(async () => {
      resolve(true)
      emit('toggled', isDark.value)
      await nextTick()
    })
    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${radius}px at ${x}px ${y}px)`
      ]
      // 新视图的根元素动画
      document.documentElement.animate(
        {
          clipPath
        },
        {
          duration: 500,
          easing: 'ease-in',
          // 指定要附加动画的伪元素
          pseudoElement: '::view-transition-new(root)'
        }
      )
    })
  })
}
</script>

<style lang="scss" scoped>
:deep(.dark-icon) {
  border-radius: 50%;
  font-size: 1rem;
  color: #cfd3dc;
  background-color: #141414;
}

:deep(.light-icon) {
  font-size: 1rem;
  color: #606266;
}
</style>

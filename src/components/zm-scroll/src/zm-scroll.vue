<!--
  滚动组件
-->
<template>
  <div class="zm-scroll">
    <div
      ref="wrapperRef"
      :class="{
        'zm-scroll__wrapper': true,
        'zm-scroll__wrapper--scrollX': scrollX
      }"
    >
      <div
        ref="contentRef"
        :class="{
          'zm-scroll__content': true,
          'zm-scroll__content--scrollX': scrollX
        }"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import BS from '@better-scroll/core'
import { useElementSize } from '@vueuse/core'
import type { Options } from '@better-scroll/core'

defineOptions({
  name: 'ZmScroll'
})

interface Props {
  options: Options
}

const props = defineProps<Props>()

const scrollX = computed(() => props.options.scrollX)

// 容器元素
const wrapperRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
// 滚动实例
const instance = ref<BS>()

const { width: wrapperWidth, height: wrapperHeight } =
  useElementSize(wrapperRef)
const { width: contentWidth, height: contentHeight } =
  useElementSize(contentRef)

watch([wrapperWidth, wrapperHeight, contentWidth, contentHeight], () => {
  // 容器元素和内容元素发生变化，刷新 BS
  if (instance.value) instance.value.refresh()
})

function init() {
  if (!wrapperRef.value) return
  instance.value = new BS(wrapperRef.value, props.options)
}

onMounted(() => {
  init()
})

defineExpose({
  instance
})
</script>
<style lang="scss" scoped>
@import '../style/zm-scroll.scss';
</style>

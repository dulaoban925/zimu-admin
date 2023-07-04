<template>
  <component :is="Wrapper">
    <common-content />
  </component>
  <common-face />
</template>
<script setup lang="ts">
import { LAYOUT_PROVIDE_KEY } from './constants'
import Wrapper from './horizontal-layout/index.vue'
import CommonContent from '../common/content/index.vue'
import CommonFace from '../common/face/index.vue'

defineOptions({
  name: 'Layout'
})

const menus = [
  {
    index: '1',
    label: '组件示例',
    icon: 'DocumentCopy',
    children: [
      {
        index: '1.1',
        label: '图标集合'
      },
      {
        index: '1.2',
        label: '文件上传'
      }
    ]
  }
]

provide(LAYOUT_PROVIDE_KEY, {
  menus
})
</script>

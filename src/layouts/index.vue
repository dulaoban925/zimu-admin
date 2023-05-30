<template>
  <component :is="Wrapper">
    <router-view />
  </component>
</template>
<script setup lang="ts">
import { LAYOUT_PROVIDE_KEY } from './constants'
import Wrapper from './wrappers/horizontal/index.vue'

const menus = [
  {
    index: '1',
    label: '申请单据',
    icon: 'UserFilled',
    children: [
      {
        index: '1.1',
        label: '报销单',
        children: [
          {
            index: '1.1.1',
            label: '员工报销单',
            children: []
          }
        ]
      },
      {
        index: '1.2',
        label: '付款单',
        children: []
      }
    ]
  }
]

provide(LAYOUT_PROVIDE_KEY, {
  menus
})
</script>

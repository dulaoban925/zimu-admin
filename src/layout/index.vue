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
  },
  {
    index: '2',
    label: '系统管理',
    icon: 'Document',
    children: [
      {
        index: '2.1',
        label: '菜单管理',
        children: [
          {
            index: '2.1.1',
            label: '管理菜单',
            children: []
          },
          {
            index: '2.1.2',
            label: '首页菜单',
            children: []
          }
        ]
      },
      {
        index: '2.2',
        label: '用户管理',
        children: [
          {
            index: '2.2.1',
            label: '内部用户',
            children: []
          },
          {
            index: '2.2.2',
            label: '外部用户',
            children: []
          }
        ]
      },
      {
        index: '2.3',
        label: '权限管理',
        children: []
      }
    ]
  }
]

provide(LAYOUT_PROVIDE_KEY, {
  menus
})
</script>

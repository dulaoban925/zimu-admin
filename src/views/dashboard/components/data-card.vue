<!-- 数据指标卡片 -->
<template>
  <el-card class="data-card">
    <el-row :gutter="20">
      <el-col v-for="item in cardData" :key="item.key" :span="6"
        ><data-card-item
          :title="item.title"
          :value="item.value"
          :icon="item.icon"
          :bg="item.bg"
      /></el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import { DataAnalysis, Edit, Finished, User } from '@zimu/icons'
import { useThemeStore } from '@/store'
import DataCardItem from './data-card-item.vue'

type CardData = {
  key: string
  title: string
  value: string | number
  bg: string
  icon: Component
}

const themeStore = useThemeStore()

const cardBgMap = computed(() => ({
  userCount: `linear-gradient(to right bottom, ${themeStore.darkMode ? '#f759ab, #eb2f96' : '#ffadd2, #ff85c0'})`,
  todoCount: `linear-gradient(to right bottom, ${themeStore.darkMode ? '#4096ff, #1677ff' : '#91caff, #69b1ff'})`,
  downloadCount: `linear-gradient(to right bottom, ${themeStore.darkMode ? '#9254de, #722ed1' : '#d3adf7, #b37feb'})`,
  dealCount: `linear-gradient(to right bottom, ${themeStore.darkMode ? '#ffc53d, #faad14' : '#ffe58f, #ffd666'})`
}))

const cardData = computed<CardData[]>(() => [
  {
    key: 'userCount',
    title: '用户数',
    value: 9527,
    bg: cardBgMap.value.userCount,
    icon: User
  },
  {
    key: 'todoCount',
    title: '代办数',
    value: 1314,
    bg: cardBgMap.value.todoCount,
    icon: Edit
  },
  {
    key: 'downloadCount',
    title: '下载量',
    value: 1425,
    bg: cardBgMap.value.downloadCount,
    icon: DataAnalysis
  },
  {
    key: 'dealCount',
    title: '成交量',
    value: 1104,
    bg: cardBgMap.value.dealCount,
    icon: Finished
  }
])
</script>

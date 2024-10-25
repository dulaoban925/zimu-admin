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
import DataCardItem from './data-card-item.vue'

type CardData = {
  key: string
  title: string
  value: string | number
  bg: string
  icon: Component
}

const cardData = ref<CardData[]>([
  {
    key: 'visitCount',
    title: '用户数',
    value: 9527,
    bg: 'linear-gradient(to right bottom, #ffadd2, #ff85c0)',
    icon: User
  },
  {
    key: 'turnover',
    title: '代办数',
    value: 1314,
    bg: 'linear-gradient(to right bottom, #91caff, #69b1ff)',
    icon: Edit
  },
  {
    key: 'downloadCount',
    title: '下载量',
    value: 1425,
    bg: 'linear-gradient(to right bottom, #d3adf7, #b37feb)',
    icon: DataAnalysis
  },
  {
    key: 'dealCount',
    title: '成交量',
    value: 1104,
    bg: 'linear-gradient(to right bottom, #ffe58f, #ffd666)',
    icon: Finished
  }
])
</script>

<template>
  <div class="dashboard">
    <!-- 数据指标 -->
    <data-card class="part" />
    <!-- 图表 -->
    <charts class="part" />
    <!-- TODO: 代办 & 消息 -->
  </div>
</template>

<script setup lang="ts">
import Charts from './components/charts.vue'
import DataCard from './components/data-card.vue'

defineOptions({
  name: 'Dashboard'
})
</script>

<style scoped lang="scss">
.part {
  margin-bottom: var(--zm-common-padding);
}
</style>

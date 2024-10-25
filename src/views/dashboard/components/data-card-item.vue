<!-- 数据指标卡片项目 -->
<template>
  <el-card class="data-card-item">
    <div class="title">{{ title }}</div>
    <div class="content">
      <el-icon size="25px"><component :is="icon" /></el-icon>
      <span class="value">{{ value }}</span>
    </div>
  </el-card>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DataCardItem'
})

type Props = {
  title: string
  icon: object
  value: string | number
  bg: string
}
const { title, icon, value, bg } = defineProps<Props>()
</script>

<style scoped lang="scss">
@use '@/styles/mixins.scss' as *;

.data-card-item {
  --el-card-padding: 13px;

  background: v-bind(bg);

  .title {
    font-weight: bold;
    margin-bottom: var(--zm-common-padding);
  }

  .content {
    @include flex-center-space-between();

    .value {
      font-size: var(--zm-font-size-larger);
      font-weight: bold;
    }
  }
}
</style>

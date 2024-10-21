<!--
  水平布局顶部操作栏
-->
<template>
  <common-header>
    <template #operation>
      <operation-buttons />
    </template>
  </common-header>
</template>

<script setup lang="ts">
import CommonHeader from '@/layouts/common/header/index.vue'
import OperationButtons from './operation-buttons.vue'

defineOptions({
  name: 'HorizontalLayoutToolbar'
})
</script>

<style scoped></style>

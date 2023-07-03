<!--
  顶部操作栏布局
-->
<template>
  <common-tabs />
  <div class="main-content">
    <slot />
  </div>
</template>

<script setup lang="ts">
import CommonTabs from '@/layouts/common/tabs/index.vue'

defineOptions({
  name: 'CommonMain'
})
</script>
<style lang="scss" scoped>
.main-content {
  padding: var(--zm-common-padding);
  height: calc(
    100% - var(--zm-common-padding) * 2 - var(--zm-layout-tab-height)
  );
  background-color: var(--el-color-white);
}
</style>

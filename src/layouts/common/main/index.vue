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
  /** 视口大小 - header - padding * 2 - tab */
  height: calc(
    100vh - var(--zm-toolbar-height) - var(--zm-common-padding) * 2 - var(
        --zm-layout-tab-height
      )
  );
  box-sizing: border-box;
  background-color: var(--el-bg-color);
  overflow: auto;
}
</style>

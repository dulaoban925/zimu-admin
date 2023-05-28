<!--
  顶部操作栏布局
-->
<template>
  <div class="toolbar">
    <logo />
    <div class="toolbar__middle">
      <slot name="middle" />
    </div>
    <div class="toolbar__operation">
      <slot name="operation" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo.vue'
</script>

<style lang="scss">
.toolbar {
  &__operation {
    .el-icon {
      padding: 0.5rem;
      cursor: pointer;

      &:hover {
        background-color: var(--el-color-primary-light-3);
      }
    }
  }
}
</style>

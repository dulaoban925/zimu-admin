<template>
  <div class="app-loading-page">
    <el-icon color="var(--el-color-primary)" size="100px">
      <BearSmileLine />
    </el-icon>
    <br />
    <el-icon class="is-loading" color="var(--el-color-primary)" size="30px">
      <Loading />
    </el-icon>
    <h1>{{ name }}</h1>
  </div>
</template>

<script setup lang="ts">
import { BearSmileLine, Loading } from '@zimu/icons'
import { ElIcon } from 'element-plus'
const name = import.meta.env.VITE_APP_TITLE
</script>

<style lang="scss" scoped>
.app-loading-page {
  text-align: center;
  position: relative;
  top: 50%;
  transform: translateY(-50%);

  .primary {
    color: var(--el-color-primary);
  }

  h1 {
    line-height: 0;
  }
}
</style>

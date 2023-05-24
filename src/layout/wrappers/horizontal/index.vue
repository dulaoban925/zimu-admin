<!--
  水平结构框架
  特点：导航菜单在左侧，顶部操作栏
-->
<template>
  <div class="horizontal-wrapper layout-wrapper">
    <el-header>
      <toolbar />
    </el-header>
    <el-content>
      <el-aside>
        <sidebar />
      </el-aside>
      <el-main>
        <slot />
      </el-main>
    </el-content>
  </div>
</template>
<script setup lang="ts">
import Toolbar from './toolbar.vue'
import Sidebar from './sidebar.vue'
</script>
<style lang="scss">
@import '../../style.scss';
</style>

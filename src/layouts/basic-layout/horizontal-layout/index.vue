<!--
  水平结构框架
  特点：导航菜单在左侧，顶部操作栏
-->
<template>
  <div class="horizontal-wrapper layout-wrapper">
    <el-container>
      <el-header>
        <toolbar />
      </el-header>
      <el-container>
        <el-aside>
          <sidebar />
        </el-aside>
        <el-main>
          <common-main>
            <slot />
          </common-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import CommonMain from '@/layouts/common/main/index.vue'
import Sidebar from './sidebar.vue'
import Toolbar from './toolbar.vue'

defineOptions({
  name: 'HorizontalLayout'
})
</script>

<style lang="scss">
@import '../style.scss';
</style>

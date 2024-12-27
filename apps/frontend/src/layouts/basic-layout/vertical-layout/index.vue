<!--
  TODO:
  垂直结构框架
  特点：顶部包含导航菜单和操作栏
-->
<template>
  <div class="vertical-wrapper layout-wrapper">
    <el-header />
    <el-content>
      <el-aside />
      <el-main>
        <slot />
      </el-main>
    </el-content>
  </div>
</template>

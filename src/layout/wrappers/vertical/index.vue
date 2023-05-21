<!--
  TODO:
  垂直结构框架
  特点：顶部包含导航菜单和操作栏
-->
<template>
  <div class="vertical-wrapper">
    <el-header></el-header>
    <el-content>
      <el-sidebar></el-sidebar>
      <el-main>
        <slot />
      </el-main>
    </el-content>
  </div>
</template>

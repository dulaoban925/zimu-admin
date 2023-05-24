<!--
  顶部操作栏布局
-->
<template>
  <div class="toolbar">
    <img src="/logo.png" alt="logo" width="100" height="50" />
    <div class="toolbar__middle">
      <slot name="middle" />
    </div>
    <div class="toolbar__operation">
      <slot name="operation" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

<template>
  <div class="css-backdrop-filter">
    <h1>仿 ElementPlus 官网导航栏模糊背景效果</h1>
    <div class="container">
      <div class="header" />
      <div class="content">
        我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容我是正文内容
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}

.container {
  width: 500px;
  height: 300px;
  position: relative;
  margin: 0 auto;
  border: 1px solid var(--el-color-primary);

  .header {
    position: absolute;
    width: 100%;
    height: 100px;
    background-image: radial-gradient(transparent 1.25px, black 1.25px);
    background-size: 4px 4px;
    backdrop-filter: saturate(50%) blur(4px);
  }

  .content {
    width: 100%;
    height: 100%;
    font-size: 30px;
    overflow: auto;
  }
}
</style>

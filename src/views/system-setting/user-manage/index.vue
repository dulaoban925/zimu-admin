<template>
  <div class="menu-manage">
    用户管理
    <el-button @click="back">返回</el-button>
  </div>
</template>

<script setup lang="ts">
const _router = useRouter()

function back() {
  _router.back()
}
</script>

<style scoped></style>

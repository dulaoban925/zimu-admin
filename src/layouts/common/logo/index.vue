<!--
  顶部操作栏 logo 部分
-->
<template>
  <div class="wrapper-logo" @click="handleClick">
    <el-icon size="50px">
      <pink-bear />
    </el-icon>
    <span>ZIMU</span>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

defineOptions({
  name: 'CommonLogo'
})

const _router = useRouter()
const handleClick = () => {
  _router.push(import.meta.env.VITE_ROUTE_HOME_PATH)
}
</script>

<style scoped></style>

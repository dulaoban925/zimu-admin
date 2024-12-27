<!--
  顶部操作栏 logo 部分
-->
<template>
  <div class="wrapper-logo" @click="handleClick">
    <el-icon color="var(--el-color-primary)">
      <bear-smile-line />
    </el-icon>
    <span>{{ appTitle }}</span>
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

const appTitle = import.meta.env.VITE_APP_TITLE
</script>

<style scoped></style>

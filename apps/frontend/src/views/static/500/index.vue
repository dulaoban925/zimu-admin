<template>
  <el-result icon="error" title="500" sub-title="Internal Server Error">
    <template #extra>
      <el-button type="primary" @click="handleClick">回到首页</el-button>
    </template>
  </el-result>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

defineOptions({
  name: '500'
})

const _router = useRouter()

const handleClick = () => {
  _router.replace(import.meta.env.VITE_ROUTE_HOME_PATH)
}
</script>

<style scoped></style>

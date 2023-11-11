<!--
  权限管理
-->
<template>
  <div class="auth-manage">
    <zm-table :table-props="tableProps">
      <zm-table-column prop="code" label="编码" filterable />
      <zm-table-column prop="label" label="名称" filterable />
    </zm-table>
  </div>
</template>

<script setup lang="ts">
import { getList } from './api'

const tableProps = reactive({
  data: []
})

onBeforeMount(() => {
  getList().then((res: any) => {
    tableProps.data = res
  })
})
</script>

<style scoped></style>

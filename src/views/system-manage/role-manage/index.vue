<!--
  角色管理
-->
<template>
  <div class="role-manage">
    <zm-table :table-props="tableProps">
      <zm-table-column prop="code" label="编码" filterable />
      <zm-table-column prop="label" label="名称" filterable />
    </zm-table>
  </div>
</template>

<script setup lang="ts">
const data = [{ code: 'admin', label: '管理员' }]

const tableProps = {
  data
}
</script>

<style scoped></style>

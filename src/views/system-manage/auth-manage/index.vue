<!--
  权限管理：
  1.菜单权限
  2.组织权限
-->
<template>
  <div class="auth-manage">
    <zm-table :table-props="tableProps">
      <zm-table-column
        prop="code"
        label="权限编码"
        filterable
        min-width="120"
      />
      <zm-table-column
        prop="label"
        label="权限名称"
        filterable
        min-width="120"
      />
      <zm-table-column prop="status" label="状态" filterable min-width="80" />
      <zm-table-column prop="createdByName" label="创建人" min-width="120" />
      <zm-table-column prop="createdAt" label="创建时间" min-width="120" />
      <zm-table-column prop="updatedByName" label="更新人" min-width="120" />
      <zm-table-column prop="updatedAt" label="更新时间" min-width="120" />
      <zm-table-column fixed="right" label="操作" min-width="220">
        <template #default="{ row }">
          <el-button link type="primary">编辑</el-button>
          <el-button link type="danger">删除</el-button>
          <el-button v-if="isEnable(row.status)" link type="primary">
            启用
          </el-button>
          <el-button v-else link type="primary">停用</el-button>
        </template>
      </zm-table-column>
    </zm-table>
  </div>
</template>

<script setup lang="ts">
import { getList } from './api'
import { isEnable } from '@/utils/is'

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

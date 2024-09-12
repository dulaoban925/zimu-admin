<!--
  菜单管理
-->
<template>
  <div class="menu-manage">
    <zm-table :table-props="tableProps" :pagination-props="paginationProps">
      <zm-table-column
        prop="code"
        label="菜单编码"
        filterable
        min-width="180"
      />
      <zm-table-column
        prop="name"
        label="菜单名称"
        filterable
        min-width="180"
      />
      <zm-table-column
        prop="typeText"
        label="类型"
        filterable
        min-width="120"
      />
      <zm-table-column prop="parent" label="父菜单编码" min-width="180" />
      <zm-table-column label="图标" min-width="60">
        <template #default="{ row: { icon } }">
          <el-icon size="18"><component :is="getIcon(icon)" /></el-icon>
        </template>
      </zm-table-column>
      <zm-table-column prop="level" label="层级" min-width="60" />
      <zm-table-column prop="sort" label="排序" min-width="60" />
      <zm-table-column prop="sort" label="状态" min-width="80" />
      <zm-table-column fixed="right" label="操作" min-width="180">
        <template #default="{ row }">
          <el-button link type="primary" @click="handleEdit(row.id)"
            >编辑</el-button
          >
          <el-button link type="danger" @click="handleDelete(row.id)"
            >删除</el-button
          >
          <el-button v-if="isEnable(row.status)" link type="primary">
            启用
          </el-button>
          <el-button v-else link type="primary">停用</el-button>
        </template>
      </zm-table-column>
      <template #rightOperation>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </template>
    </zm-table>

    <edit-dialog
      v-model="dialogVisible"
      v-bind="dialogProps"
      @saved="handleSaved"
    />
  </div>
</template>

<script setup lang="ts">
import { PAGE_OPERATION } from '@/constants'
import { getIcon } from '@/utils/icons'
import { isEnable } from '@/utils/is'
import { del, getList } from './api'
import editDialog from './components/edit-dialog.vue'

const tableProps = reactive({
  data: []
})

const paginationProps = reactive({
  total: 0,
  currentPage: 1,
  pageSize: 10
})

onBeforeMount(() => {
  init()
})

// 弹窗显隐
const dialogVisible = ref(false)
// dialog props
const dialogProps = reactive<{
  operation?: string
  menuId?: string
}>({})

const init = (page = 1, pageSize = 10) => {
  getList(page, pageSize).then(({ rows, total }: any) => {
    tableProps.data = rows
    paginationProps.total = total
  })
}

// 新增
const handleAdd = () => {
  Object.assign(dialogProps, {
    menuId: '',
    operation: PAGE_OPERATION.NEW
  })
  dialogVisible.value = true
}

// 编辑
const handleEdit = (id: string) => {
  Object.assign(dialogProps, {
    menuId: id,
    operation: PAGE_OPERATION.EDIT
  })
  dialogVisible.value = true
}

// 保存回调
const handleSaved = () => {
  init(paginationProps.currentPage, paginationProps.pageSize)
}

// 删除
const handleDelete = (id: number) => {
  del(id).then(() =>
    init(paginationProps.currentPage, paginationProps.pageSize)
  )
}
</script>

<style scoped></style>

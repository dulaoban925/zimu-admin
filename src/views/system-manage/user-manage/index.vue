<!--
  用户管理
-->
<template>
  <div class="user-manage">
    <zm-table
      :table-props="tableProps"
      :pagination-props="paginationProps"
      @filter-search="handleSearch"
    >
      <zm-table-column
        prop="username"
        label="账号"
        filterable
        min-width="180"
      />
      <zm-table-column prop="name" label="姓名" filterable min-width="100" />
      <zm-table-column
        prop="genderText"
        label="性别"
        filterable
        min-width="100"
      />
      <zm-table-column prop="tel" label="电话" min-width="150" />
      <zm-table-column prop="email" label="电子邮箱" min-width="60" />
      <zm-table-column prop="address" label="住址" min-width="60" />
      <zm-table-column prop="isAdmin" label="超管权限" min-width="80">
        <template #default="{ row: { isAdmin } }">
          <el-checkbox :value="isYes(isAdmin)" />
        </template>
      </zm-table-column>
      <zm-table-column prop="statusText" label="状态" min-width="80">
        <template #default="{ row: { status, statusText } }">
          <el-tag :type="isServing(status) ? 'primary' : 'danger'">{{
            statusText
          }}</el-tag>
        </template>
      </zm-table-column>
      <zm-table-column fixed="right" label="操作" min-width="120">
        <template #default="{ row }">
          <zm-button link type="primary" @click="handleEdit(row.id)">
            编辑
          </zm-button>
          <zm-button
            link
            type="danger"
            need-confirm
            :pop-confirm-props="{
              title: '确认删除？'
            }"
            @confirm="handleDelConfirm(row.id)"
          >
            删除
          </zm-button>
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
import { ElMessage } from 'element-plus'
import { PAGE_OPERATION } from '@/constants'
import { isServing, isYes } from '@/utils/is'
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
// 筛选对象
const filterModel = ref<Record<string, string>>({})

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

/**
 * 初始化函数
 */
const init = (page = 1, pageSize = 10, filter?: Record<string, string>) => {
  getList(page, pageSize, filter).then(({ rows, total }: any) => {
    tableProps.data = rows
    paginationProps.total = total
  })
}

// 筛选查询
const handleSearch = (filter: any) => {
  filterModel.value = { ...filter }
  init(paginationProps.currentPage, paginationProps.pageSize, filterModel.value)
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
  init(paginationProps.currentPage, paginationProps.pageSize, filterModel.value)
}

// 确认删除
const handleDelConfirm = (id: number) => {
  del(id).then(() => {
    ElMessage.success('删除成功')
    init(
      paginationProps.currentPage,
      paginationProps.pageSize,
      filterModel.value
    )
  })
}
</script>

<style scoped></style>

<!--
  角色管理
-->
<template>
  <div class="role-manage">
    <zm-table
      :table-props="tableProps"
      :pagination-props="paginationProps"
      @filter-search="handleSearch"
    >
      <zm-table-column prop="code" label="编码" filterable min-width="120" />
      <zm-table-column prop="name" label="名称" filterable min-width="120" />
      <zm-table-column prop="statusText" label="状态" min-width="80">
        <template #default="{ row: { status, statusText } }">
          <el-tag
            v-if="status"
            :type="isEnable(status) ? 'primary' : 'danger'"
            >{{ statusText }}</el-tag
          >
        </template>
      </zm-table-column>
      <zm-table-column fixed="right" label="操作" width="240">
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
          <zm-button
            link
            type="primary"
            need-confirm
            :pop-confirm-props="{
              title: `确认${getStatusText(row.status)}？`
            }"
            @confirm="handleChangeStatusConfirm(row)"
          >
            {{ getStatusText(row.status) }}
          </zm-button>
          <zm-button link type="primary" @click="showDistribute(row)">
            分配权限
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
    <!-- 分配资源弹窗 -->
    <distribute-dialog
      v-model="distributeDialogVisible"
      v-bind="distributeDialogProps"
      @distribute="handleDistribute"
    />
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ACTIVATION_STATUS, PAGE_OPERATION } from '@/constants'
import { isEnable } from '@/utils/is'
import type { ValueOf } from '@/utils'
import type { AuthItem } from '@/views/system-manage/auth-manage/types'
import { changeStatus, del, distribute, getList } from './api'
import distributeDialog from './components/distribute-dialog.vue'
import editDialog from './components/edit-dialog.vue'
import type { RoleItem } from './types'

defineOptions({
  name: 'RoleManage'
})

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
  operation?: ValueOf<typeof PAGE_OPERATION>
  roleId?: number
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
  handleReload()
}

// 新增
const handleAdd = () => {
  Object.assign(dialogProps, {
    roleId: '',
    operation: PAGE_OPERATION.NEW
  })
  dialogVisible.value = true
}

// 编辑
const handleEdit = (id: number) => {
  Object.assign(dialogProps, {
    roleId: id,
    operation: PAGE_OPERATION.EDIT
  })
  dialogVisible.value = true
}

// 保存回调
const handleSaved = () => {
  handleReload()
}

// 确认删除
const handleDelConfirm = (id: number) => {
  del(id).then(() => {
    ElMessage.success('删除成功')
    handleReload()
  })
}

// 停用/启用描述
const getStatusText = (status: string) => {
  return isEnable(status) ? '停用' : '启用'
}

/**
 * 启用/停用
 */
const handleChangeStatusConfirm = ({
  id,
  status
}: {
  id: number
  status: string
}) => {
  const newStatus = isEnable(status)
    ? ACTIVATION_STATUS.DEACTIVATED
    : ACTIVATION_STATUS.ACTIVATED

  changeStatus(id, newStatus).then(() => {
    ElMessage.success(`${getStatusText(status)}成功`)
    handleReload()
  })
}

// 重新加载
const handleReload = () => {
  init(paginationProps.currentPage, paginationProps.pageSize, filterModel.value)
}

/** 分配资源弹窗 start */
// 弹窗显隐
const distributeDialogVisible = ref(false)
// 分配权限的角色对象
const distributeRole = ref<RoleItem>({})
// DistributeDialog Props
const distributeDialogProps = reactive<{
  roleId: number
}>({
  roleId: -1
})

/**
 * 分配资源
 */
const showDistribute = (row: RoleItem) => {
  distributeRole.value = { ...row }
  Object.assign(distributeDialogProps, {
    roleId: row.id
  })
  distributeDialogVisible.value = true
}

/**
 * 分配
 */
const handleDistribute = (authorizations: AuthItem[]) => {
  distribute({
    id: distributeRole.value.id,
    authorizations
  }).then(() => {
    handleReload()
    ElMessage.success('分配成功')
    distributeDialogVisible.value = false
  })
}
/** 分配资源弹窗 end */
</script>

<style scoped></style>

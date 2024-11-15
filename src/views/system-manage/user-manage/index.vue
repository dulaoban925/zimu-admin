<!--
  用户管理
-->
<template>
  <div class="user-manage">
    <zm-table
      :table-props="tableProps"
      :pagination-props="paginationProps"
      @filter-search="handleSearch"
      @row-click="handleRowClick"
    >
      <zm-table-column
        prop="username"
        label="账号"
        filterable
        min-width="120"
      />
      <zm-table-column prop="name" label="姓名" filterable min-width="100" />
      <zm-table-column
        prop="genderText"
        label="性别"
        filterable
        min-width="80"
      />
      <zm-table-column prop="tel" label="电话" min-width="120" filterable />
      <zm-table-column
        prop="email"
        label="电子邮箱"
        min-width="120"
        filterable
      />
      <zm-table-column prop="address" label="住址" min-width="180" filterable />
      <zm-table-column prop="isAdmin" label="超管" min-width="80">
        <template #default="{ row: { isAdmin } }">
          <el-tag v-if="isAdmin" :type="isYes(isAdmin) ? 'primary' : 'danger'"
            >{{ Y_N_DESC[isAdmin as keyof typeof Y_N_DESC] }}
          </el-tag>
        </template>
      </zm-table-column>
      <zm-table-column prop="statusText" label="状态" min-width="80">
        <template #default="{ row: { status, statusText } }">
          <el-tag
            v-if="status"
            :type="isServing(status) ? 'primary' : 'danger'"
            >{{ statusText }}</el-tag
          >
        </template>
      </zm-table-column>
      <zm-table-column fixed="right" label="操作" min-width="280">
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
              title: '确认重置？'
            }"
            @confirm="handleResetPassword(row.id)"
          >
            重置密码
          </zm-button>
          <zm-button link type="primary" @click="showDistribute(row)">
            分配角色
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
      @saved="handleReload"
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
import { PAGE_OPERATION, Y_N_DESC } from '@/constants'
import { isServing, isYes } from '@/utils/is'
import type { ValueOf } from '@/utils'
import { del, distribute, getList, resetPassword } from './api'
import distributeDialog from './components/distribute-dialog.vue'
import editDialog from './components/edit-dialog.vue'
import type { UserItem } from './types'
import type { RoleItem } from '@views/system-manage/role-manage/types'

defineOptions({
  name: 'UserManage'
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
  userId?: number
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
    userId: '',
    operation: PAGE_OPERATION.NEW
  })
  dialogVisible.value = true
}

// 编辑
const handleEdit = (id: string) => {
  Object.assign(dialogProps, {
    userId: id,
    operation: PAGE_OPERATION.EDIT
  })
  dialogVisible.value = true
}

// 确认删除
const handleDelConfirm = (id: number) => {
  del(id).then(() => {
    ElMessage.success('删除成功')
    handleReload()
  })
}

// 重置密码
const handleResetPassword = (id: number) => {
  resetPassword(id).then(() => {
    ElMessage.success('密码重置成功')
    handleReload()
  })
}

const handleRowClick = (coll: boolean) => {
  console.log('🚀 ~ handleCollapsed ~ coll:', coll)
}

const handleReload = () => {
  init(paginationProps.currentPage, paginationProps.pageSize, filterModel.value)
}

/** 分配资源弹窗 start */
// 弹窗显隐
const distributeDialogVisible = ref(false)
// 分配权限的角色对象
const distributeUser = ref<UserItem>({})
// DistributeDialog Props
const distributeDialogProps = reactive<{
  userId: number
}>({
  userId: -1
})

/**
 * 分配资源
 */
const showDistribute = (row: UserItem) => {
  distributeUser.value = { ...row }
  Object.assign(distributeDialogProps, {
    userId: row.id
  })
  distributeDialogVisible.value = true
}

/**
 * 分配
 */
const handleDistribute = (roles: RoleItem[]) => {
  distribute({
    id: distributeUser.value.id,
    roles
  }).then(() => {
    handleReload()
    ElMessage.success('分配成功')
    distributeDialogVisible.value = false
  })
}
/** 分配资源弹窗 end */
</script>

<style scoped></style>

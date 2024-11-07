<!-- 分配权限弹窗 -->
<template>
  <zm-popper
    v-model="visible"
    title="分配权限"
    width="35%"
    destroy-on-close
    @opened="handleOpened"
    @closed="handleClosed"
    @confirm="handleConfirm"
  >
    <el-input
      v-model="filterText"
      style="width: 240px"
      placeholder="请输入权限编码/名称进行筛选"
      @change="handleFilterChange"
    />
    <el-tree
      ref="tree"
      :data="authData"
      node-key="id"
      show-checkbox
      :default-checked-keys="treeDefaultCheckedKeys"
      default-expand-all
      :props="treeProps"
      :filter-node-method="filterNodeMethod"
      @check="handleTreeCheck"
    />
  </zm-popper>
</template>

<script setup lang="ts">
import { getAllList } from '@views/system-manage/auth-manage/api'
import { getDistributedAuthList } from '../api'
import type { RoleItem } from '../types'
import type { AuthItem } from '@views/system-manage/auth-manage/types'
import type { ElTree } from 'element-plus'

defineOptions({
  name: 'RoleDistributeDialog'
})

type Props = {
  roleId: number
}

const { roleId } = defineProps<Props>()

const emit = defineEmits(['distribute'])

// 弹窗显隐
const visible = defineModel({ type: Boolean, default: false })
// 筛选数据
const filterText = ref('')
// ElTree ref
const treeRef = useTemplateRef<typeof ElTree>('tree')
// 菜单树形结构数据
const authData = ref<AuthItem[]>([])
// ElTree Props
const treeProps = {
  label: 'name'
}
// ElTree 默认勾选的 key
const treeDefaultCheckedKeys = ref<number[]>([])
// 勾选的菜单集合
const checkedAuths = ref<RoleItem[]>([])

// ElTree 节点筛选函数
const filterNodeMethod = (value: string, data: Record<string, string>) => {
  if (!value) return true
  return data.name.includes(value) || data.code.includes(value)
}

// 搜索
const handleFilterChange = (val: string) => {
  treeRef.value?.filter(val)
}

// 勾选菜单
const handleTreeCheck = (
  data: Record<string, string>,
  {
    checkedNodes
  }: {
    checkedNodes: RoleItem[]
  }
) => {
  checkedAuths.value = [...new Set(checkedNodes)]
}

const initDistributedAuthList = async () => {
  const list = await getDistributedAuthList(roleId)
  checkedAuths.value = [...list]
  treeDefaultCheckedKeys.value = list.map((item: AuthItem) => item.id!)
}

// 初始化
const init = async () => {
  initDistributedAuthList()
  const { rows } = await getAllList()
  authData.value = [...rows]
}

const handleOpened = () => {
  init()
}

const handleClosed = () => {
  // 重置勾选的节点
  treeDefaultCheckedKeys.value = []
}

const handleConfirm = () => {
  emit('distribute', checkedAuths.value)
}
</script>

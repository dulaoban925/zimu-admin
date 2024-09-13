<!--
  编辑弹窗，可操作：新增、编辑
-->
<template>
  <zm-popper
    v-model="visible"
    :title="dialogTitle"
    width="35%"
    destroy-on-close
    @opened="handleOpened"
    @confirm="handleConfirm"
  >
    <el-form
      ref="dialogFormRef"
      :model="dialogFormModel"
      label-width="100px"
      label-suffix=":"
      :rules="dialogFormRules"
    >
      <el-form-item label="编码" prop="code">
        <el-input
          v-model="dialogFormModel.code"
          placeholder="请输入..."
          :disabled="isEdit"
        />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="dialogFormModel.name" placeholder="请输入..." />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <type-selector v-model="dialogFormModel.type" placeholder="请输入..." />
      </el-form-item>
      <el-form-item label="父菜单编码" prop="parent">
        <el-input v-model="dialogFormModel.parent" placeholder="请输入..." />
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input v-model="dialogFormModel.icon" placeholder="请输入..." />
      </el-form-item>
      <el-form-item label="层级" prop="level">
        <el-input
          v-model="dialogFormModel.level"
          type="number"
          placeholder="请输入..."
        />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input
          v-model="dialogFormModel.sort"
          type="number"
          placeholder="请输入..."
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <status-selector
          v-model="dialogFormModel.status"
          placeholder="请输入..."
          :disabled="isEdit"
        />
      </el-form-item>
    </el-form>
  </zm-popper>
</template>

<script setup lang="ts">
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import {
  ACTIVATION_STATUS,
  MENU_TYPE,
  PAGE_OPERATION,
  PAGE_OPERATION_DESC
} from '@/constants'
import { getDetail, save } from '../api'
import type { MenuItem } from '../types'
import StatusSelector from './selectors/status-selector.vue'
import TypeSelector from './selectors/type-selector.vue'

defineOptions({
  name: 'MenuEditDialog'
})

const props = defineProps({
  // 弹窗操作，默认新增
  operation: {
    type: String,
    default: PAGE_OPERATION.NEW
  },
  // 菜单 id
  menuId: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['saved'])

// 弹窗显隐
const visible = defineModel({ type: Boolean, default: false })
// 是否编辑
const isEdit = computed(() => props.operation === PAGE_OPERATION.EDIT)
// 弹窗标题
const dialogTitle = computed(
  () => `${PAGE_OPERATION_DESC[props.operation]}菜单`
)
// 表单 ref
const dialogFormRef = ref<FormInstance>()
// 表单默认值
const dialogFormDefault = {
  type: MENU_TYPE.MENU,
  status: ACTIVATION_STATUS.ACTIVATED
}
// 表单对象
const dialogFormModel = ref<MenuItem>({ ...dialogFormDefault })
// 表单规则
const dialogFormRules = ref<FormRules<MenuItem>>({
  code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
  level: [{ required: true, message: '请输入层级', trigger: 'blur' }],
  sort: [{ required: true, message: '请输入排序', trigger: 'blur' }],
  status: [{ required: true, message: '请选择状态', trigger: 'blur' }]
})

// 初始化
const init = async () => {
  if (props.operation === PAGE_OPERATION.EDIT) {
    const menu = await getDetail(props.menuId)
    if (menu) dialogFormModel.value = menu
  }
}

const handleOpened = () => {
  init()
}

const handleConfirm = () => {
  dialogFormRef.value?.validate(valid => {
    if (!valid) return
    save(dialogFormModel.value).then(() => {
      ElMessage.success('保存成功！')
      visible.value = false
      emit('saved')
    })
  })
}

// 关闭弹窗后重置表单
watchEffect(() => {
  if (!visible.value) dialogFormModel.value = { ...dialogFormDefault }
})
</script>

<style lang="scss" scoped></style>

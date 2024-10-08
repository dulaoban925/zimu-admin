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
      <el-form-item label="状态" prop="status">
        <activation-status-selector
          v-model="dialogFormModel.status"
          placeholder="请输入..."
        />
      </el-form-item>
    </el-form>
  </zm-popper>
</template>

<script setup lang="ts">
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import {
  ACTIVATION_STATUS,
  PAGE_OPERATION,
  PAGE_OPERATION_DESC
} from '@/constants'
import type { ValueOf } from '@/utils'
import { getDetail, save } from '../api'
import type { AuthItem } from '../types'

defineOptions({
  name: 'AuthEditDialog'
})

const props = defineProps({
  // 弹窗操作，默认新增
  operation: {
    type: String as PropType<ValueOf<typeof PAGE_OPERATION>>,
    default: PAGE_OPERATION.NEW
  },
  // 权限 id
  authId: {
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
  () => `${PAGE_OPERATION_DESC[props.operation]}权限`
)
// 表单 ref
const dialogFormRef = ref<FormInstance>()
// 表单默认值
const dialogFormDefault = {
  status: ACTIVATION_STATUS.ACTIVATED
}
// 表单对象
const dialogFormModel = ref<AuthItem>({ ...dialogFormDefault })
// 表单规则
const dialogFormRules = ref<FormRules<AuthItem>>({
  code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  status: [{ required: true, message: '请选择状态', trigger: 'blur' }]
})

// 初始化
const init = async () => {
  if (props.operation === PAGE_OPERATION.EDIT) {
    const auth = await getDetail(props.authId)
    if (auth) dialogFormModel.value = auth
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

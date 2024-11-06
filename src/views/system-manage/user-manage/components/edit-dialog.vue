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
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="dialogFormModel.username"
          placeholder="请输入..."
          :disabled="isEdit"
        />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="dialogFormModel.name" placeholder="请输入..." />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <gender-selector
          v-model="dialogFormModel.gender"
          placeholder="请输入..."
        />
      </el-form-item>
      <el-form-item label="电话" prop="tel">
        <el-input v-model="dialogFormModel.tel" placeholder="请输入..." />
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email">
        <el-input v-model="dialogFormModel.email" placeholder="请输入..." />
      </el-form-item>
      <el-form-item label="住址" prop="address">
        <el-input
          v-model="dialogFormModel.address"
          type="number"
          placeholder="请输入..."
        />
      </el-form-item>
      <el-form-item label="超管权限" prop="isAdmin">
        <y-n-selector
          v-model="dialogFormModel.isAdmin"
          placeholder="请输入..."
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <employee-status-selector
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
  EMPLOYEE_STATUS,
  PAGE_OPERATION,
  PAGE_OPERATION_DESC,
  Y_N
} from '@/constants'
import type { ValueOf } from '@/utils'
import { getDetail, save } from '../api'
import type { UserItem } from '../types'

defineOptions({
  name: 'UserEditDialog'
})

type Props = {
  operation?: ValueOf<typeof PAGE_OPERATION>
  userId?: number
}

const { operation = PAGE_OPERATION.NEW, userId } = defineProps<Props>()

const emit = defineEmits(['saved'])

// 弹窗显隐
const visible = defineModel({ type: Boolean, default: false })
// 是否编辑
const isEdit = computed(() => operation === PAGE_OPERATION.EDIT)
// 弹窗标题
const dialogTitle = computed(() => `${PAGE_OPERATION_DESC[operation]}用户`)
// 表单 ref
const dialogFormRef = ref<FormInstance>()
// 表单默认值
const dialogFormDefault = {
  isAdmin: Y_N.N,
  status: EMPLOYEE_STATUS.SERVING
}
// 表单对象
const dialogFormModel = ref<UserItem>({ ...dialogFormDefault })
// 表单规则
const dialogFormRules = ref<FormRules<UserItem>>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
  tel: [{ required: true, message: '请输入电话', trigger: 'blur' }],
  status: [{ required: true, message: '请选择状态', trigger: 'blur' }]
})

// 初始化
const init = async () => {
  if (operation === PAGE_OPERATION.EDIT && userId) {
    const user = await getDetail(userId)
    if (user) dialogFormModel.value = user
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

<template>
  <div class="zm-query-form">
    <el-form :model="model" v-bind="attrs">
      <el-row>
        <query-form-item
          v-for="item in items"
          :key="item.uid"
          v-bind="item"
          v-model:form-model="model"
        />
      </el-row>
    </el-form>
    <!-- 操作按钮 -->
    <div class="zm-query-form__operations">
      <el-button
        v-if="showCollapseBtn"
        type="text"
        :size="attrs.size"
        @click="handleChangeCollapse"
      >
        <span>{{ collapseBtnText }}</span>
        <el-icon>
          <component :is="collapseBtnIcon"></component>
        </el-icon>
      </el-button>
      <slot name="operations">
        <el-button :size="attrs.size" @click="handleReset">{{
          resetButtonText
        }}</el-button>
        <el-button type="primary" :size="attrs.size" @click="handleSearch">{{
          searchButtonText
        }}</el-button>
      </slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { FormProps } from 'element-plus'
import type { QueryFormItemType } from './types'
import QueryFormItem from './form-item/query-form-item'

defineOptions({
  name: 'ZmQueryForm'
})

interface Props {
  items: QueryFormItemType[]
  resetButtonText?: string
  searchButtonText?: string
}

withDefaults(defineProps<Props>(), {
  items: () => [],
  resetButtonText: '重置',
  searchButtonText: '查询'
})

const emit = defineEmits(['triggerReset', 'triggerSearch'])

const attrs: FormProps = useAttrs() as FormProps

const model = ref<any>({})

const showCollapseBtn = ref(false)
const collapseBtnText = ref('')
const collapseBtnIcon = ref()

const handleChangeCollapse = () => {}

const handleReset = () => {
  emit('triggerReset')
}

const handleSearch = () => {
  console.log(model.value)
  emit('triggerSearch')
}
</script>
<style lang="scss">
@use '../../style/query-form.scss' as *;
</style>
./form-item/query-form-item

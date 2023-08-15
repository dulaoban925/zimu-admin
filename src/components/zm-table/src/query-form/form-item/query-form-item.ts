import type { PropType } from '@vue/runtime-core'
import { ElFormItem, ElCol } from 'element-plus'
import type { FormItemProps, ColProps } from 'element-plus'
import type { ItemType, TagProps } from '../types'
import { fillDefaultFormItemProps, getFormModelValueKey } from './helpers'
import { typeGeneratorMap } from './generators'

const queryFormItemProps = {
  formModel: {
    type: Object,
    default: () => ({})
  },
  // 表单组件类型
  tagType: {
    type: String as PropType<ItemType>,
    required: true
  },
  formItemProps: {
    type: Object as PropType<FormItemProps>,
    default: () => ({})
  },
  colProps: {
    type: Object as PropType<ColProps>,
    default: () => ({})
  },
  tagProps: {
    type: Object as PropType<TagProps>,
    default: () => ({})
  }
}

const queryFormItemEmits: string[] = ['update:formModel']

export default defineComponent({
  name: 'ZmQueryFormItems',
  props: queryFormItemProps,
  emits: queryFormItemEmits,
  setup(props, { emit }) {
    const formModel = computed({
      get() {
        return props.formModel
      },
      set(val) {
        emit('update:formModel', val)
      }
    })

    // 处理 v-model 双向绑定
    function handleVModelProps(oProps: any) {
      const key = getFormModelValueKey(oProps.modelKey)
      // 解决表单组件数据响应问题
      const mvRef = toRef(formModel.value[key])
      oProps.modelValue = mvRef
      oProps['onUpdate:modelValue'] = (val: any) => {
        mvRef.value = val
        formModel.value[key] = val
      }
      // 清理非组件 props 的对象属性
      delete oProps.modelKey
      return oProps
    }

    const componentProps = handleVModelProps(props.tagProps ?? {})
    const itemRender = typeGeneratorMap[props.tagType!]
    const fullFormItemProps = fillDefaultFormItemProps(props.formItemProps)

    return () =>
      h(
        ElCol,
        {
          ...props?.colProps,
          span: props?.colProps?.span || 8
        },
        () => h(ElFormItem, fullFormItemProps, () => itemRender(componentProps))
      )
  }
})

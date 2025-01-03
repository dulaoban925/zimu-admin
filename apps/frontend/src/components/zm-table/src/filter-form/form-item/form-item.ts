import {
  ElCol,
  ElFormItem,
  type ColProps,
  type FormItemProps
} from 'element-plus'
import type { ItemType, TagProps } from '../types'
import { typeGeneratorMap } from './generators'
import { fillDefaultFormItemProps } from './helpers'
import type { PropType } from '@vue/runtime-core'

const queryFormItemProps = {
  modelValue: {
    type: String,
    required: true
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

const queryFormItemEmits: string[] = ['update:modelValue']

export const ZmFilterFormItem = defineComponent({
  name: 'ZmFilterFormItem',
  props: queryFormItemProps,
  emits: queryFormItemEmits,
  setup(props, { emit }) {
    const modelValue = computed({
      get() {
        return props.modelValue
      },
      set(val) {
        emit('update:modelValue', val)
      }
    })

    // const formColProps = computed(() =>
    //   Object.assign({}, { span: 8 }, props.colProps ?? {})
    // )

    // 处理 v-model 双向绑定
    function handleVModelProps(oProps: any) {
      oProps.modelValue = modelValue
      oProps['onUpdate:modelValue'] = (val: any) => {
        modelValue.value = val
      }
      return oProps
    }

    const componentProps = handleVModelProps(props.tagProps ?? {})
    const itemRender = typeGeneratorMap[props.tagType!]
    const fullFormItemProps = fillDefaultFormItemProps(props.formItemProps)

    return () =>
      h(ElFormItem, fullFormItemProps, () => itemRender(componentProps))
  }
})

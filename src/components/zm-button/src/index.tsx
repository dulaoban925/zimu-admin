/**
 * 按钮组件
 */
import { buttonProps, type PopconfirmProps } from 'element-plus'
import type { ValueOf } from '@/utils'
import type { PropType } from 'vue'
import '../style/zm-button.scss'

const ZM_BUTTON_CONFIRM_SHOW_TYPE = {
  // 弹出确认框
  POP_CONFIRM: 'popConfirm',
  // 弹出提示框
  MESSAGE_BOX: 'messageBox'
}

const POP_CONFIRM_PROPS_DEFAULT = {
  title: '确认？'
}

const zmButtonProps = {
  ...buttonProps,
  // 是否需要确认
  needConfirm: {
    type: Boolean,
    default: false
  },
  // 弹出框类型
  confirmShowType: {
    type: String as PropType<ValueOf<typeof ZM_BUTTON_CONFIRM_SHOW_TYPE>>,
    default: ZM_BUTTON_CONFIRM_SHOW_TYPE.POP_CONFIRM
  },
  // popconfirm props
  popConfirmProps: {
    type: Object as PropType<PopconfirmProps>,
    default: () => POP_CONFIRM_PROPS_DEFAULT
  }
}

type ZmButtonProps = typeof zmButtonProps
type ZmButtonPropsKey = keyof ZmButtonProps

export const ZmButton = defineComponent({
  name: 'ZmButton',
  props: zmButtonProps,
  setup(props) {
    // el-button props
    const elButtonProps = computed(() =>
      Object.keys(buttonProps).reduce((pre: any, cur: string) => {
        pre[cur] = props[cur as ZmButtonPropsKey]
        return pre
      }, {})
    )
    return {
      elButtonProps
    }
  },
  render() {
    const buttonSlots = {
      default: this.$slots.default,
      loading: this.$slots.loading,
      icon: this.$slots.icon
    }
    const ElButton = (
      <el-button {...this.elButtonProps} v-slots={buttonSlots}></el-button>
    )

    // popconfirm button
    const PopConfirmButton = (
      <span class="zm-button">
        <el-popconfirm
          {...this.popConfirmProps}
          v-slots={{
            reference: () => ElButton,
            actions: this.$slots.popConfirmActions
          }}
        ></el-popconfirm>
      </span>
    )

    const renderButton = () => {
      return this.needConfirm &&
        this.confirmShowType === ZM_BUTTON_CONFIRM_SHOW_TYPE.POP_CONFIRM
        ? PopConfirmButton
        : ElButton
    }

    return renderButton()
  }
})

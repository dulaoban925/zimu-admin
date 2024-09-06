/**
 * 弹窗组件
 * 支持 Dialog 和 Drawer
 */
import { dialogProps, ElButton, ElDialog } from 'element-plus'
import type { ExtractPropTypes } from 'vue'

const zmDialogProps = {
  ...dialogProps,
  // 取消按钮文本
  cancelButtonText: {
    type: String,
    default: '取消'
  },
  // 确定按钮文本
  confirmButtonText: {
    type: String,
    default: '确定'
  }
}

const zmDialogEmits = ['confirm', 'cancel']

export const ZmDialog = defineComponent({
  name: 'ZmDialog',
  props: zmDialogProps,
  emits: zmDialogEmits,
  setup(props, { emit }) {
    const visible = computed({
      get() {
        return props.modelValue
      },
      set(val) {
        emit('update:modelValue', val)
      }
    })

    const elDialogProps = computed(() =>
      Object.keys(dialogProps).reduce((pre: any, cur: any) => {
        pre[cur] = props[cur]
        return pre
      }, {})
    )

    const onCancel = () => {
      visible.value = false
      emit('cancel')
    }

    const onConfirm = () => {
      emit('confirm')
    }

    return {
      visible,
      elDialogProps,
      onCancel,
      onConfirm
    }
  },
  render() {
    const { onCancel, onConfirm, cancelButtonText, confirmButtonText } = this

    const footer = this.$slots.footer
      ? this.$slots.footer
      : () => (
          <div>
            <ElButton onClick={onCancel}>{cancelButtonText}</ElButton>
            <ElButton type="primary" onClick={onConfirm}>
              {confirmButtonText}
            </ElButton>
          </div>
        )

    const slots = {
      header: this.$slots.title,
      default: this.$slots.default,
      footer
    }
    return (
      <ElDialog
        {...this.elDialogProps}
        v-model={this.visible}
        v-slots={slots}
      ></ElDialog>
    )
  }
})

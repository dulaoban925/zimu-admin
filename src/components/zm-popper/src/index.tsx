/**
 * 弹窗组件
 * 支持 Dialog 和 Drawer
 */
import { dialogProps, ElButton, ElDialog } from 'element-plus'
import { zmPopperEmits, zmPopperProps } from './popper'

export const ZmPopper = defineComponent({
  name: 'ZmPopper',
  props: zmPopperProps,
  emits: zmPopperEmits,
  setup(props, { emit }) {
    // 弹窗显隐标识
    const visible = computed({
      get() {
        return props.modelValue
      },
      set(val) {
        emit('update:modelValue', val)
      }
    })

    // 传递给 ElDialog 的 props
    const elDialogProps = computed(() =>
      Object.keys(dialogProps).reduce((pre: any, cur: any) => {
        pre[cur] = props[cur]
        return pre
      }, {})
    )

    // 取消操作
    const onCancel = () => {
      visible.value = false
      emit('cancel')
    }

    // 确认操作
    const onConfirm = () => {
      if (props.closeAfterConfirm) visible.value = false
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

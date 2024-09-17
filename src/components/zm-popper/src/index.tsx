/**
 * 弹窗组件
 * 支持 Dialog 和 Drawer
 */
import {
  dialogProps,
  drawerProps,
  ElButton,
  ElDialog,
  ElDrawer
} from 'element-plus'
import { PopperTypes, zmPopperEmits, zmPopperProps } from './popper'

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

    // 传递给 ElDrawer 的 props
    const elDrawerProps = computed(() =>
      Object.keys(drawerProps).reduce((pre: any, cur: any) => {
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
      elDrawerProps,
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

    // Dialog 组件
    const renderDialog = (
      <ElDialog
        {...this.elDialogProps}
        v-model={this.visible}
        v-slots={slots}
      ></ElDialog>
    )

    // Drawer 组件
    const renderDrawer = (
      <ElDrawer
        {...this.elDrawerProps}
        v-model={this.visible}
        v-slots={slots}
      ></ElDrawer>
    )
    return this.type === PopperTypes.DIALOG ? renderDialog : renderDrawer
  }
})

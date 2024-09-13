import { dialogProps } from 'element-plus'
import type { ValueOf } from '@/utils'
import type { PropType } from 'vue'

export const PopperTypes = {
  DIALOG: 'dialog',
  DRAWER: 'drawer'
}

export const zmPopperProps = {
  ...dialogProps,
  // popper 类型
  type: {
    type: String as PropType<ValueOf<typeof PopperTypes>>,
    default: PopperTypes.DRAWER
  },
  // 取消按钮文本
  cancelButtonText: {
    type: String,
    default: '取消'
  },
  // 确定按钮文本
  confirmButtonText: {
    type: String,
    default: '确定'
  },
  // 确认后是否关闭弹窗
  closeAfterConfirm: {
    type: Boolean,
    default: false
  }
}

export type ZmPopperProps = ExtractPropTypes<typeof zmPopperProps>

export const zmPopperEmits = ['confirm', 'cancel']

export type ZmPopperEmits = typeof zmPopperEmits

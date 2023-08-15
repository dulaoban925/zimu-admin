import type { FormItemProps } from 'element-plus'
import { uniqueId } from 'lodash-es'

// 填充 formItem 默认属性
export function fillDefaultFormItemProps(props?: Partial<FormItemProps>) {
  const copyProps = { ...props }
  if (copyProps?.label)
    copyProps.label = `${copyProps.label}${
      !copyProps.label.endsWith(':') ? ':' : ''
    }`
  const defaultProps = {
    labelWidth: '120px'
  }

  return Object.assign({}, defaultProps, copyProps ?? {})
}

// 获取 formItem 表单组件绑定的对象属性
export function getFormModelValueKey(oKey: string | undefined) {
  return oKey ?? uniqueId('__NO_PROPS__')
}

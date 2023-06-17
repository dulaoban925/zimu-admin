import { ROUTE_COMPONENT_LAYOUT_VALUE } from '@/constants'
import { ValueOf, WithPromise } from '@/utils'

// layout 布局类型，更多布局待扩展
export type LayoutType = ValueOf<typeof ROUTE_COMPONENT_LAYOUT_VALUE>

interface ModuleComponent {
  default: Component
}

type LayoutComponent = Record<LayoutType, WithPromise<ModuleComponent>>

const LayoutComponents: LayoutComponent = {
  basic: () => import('@/layouts/basic-layout/index.vue'),
  blank: () => import('@/layouts/blank-layout/index.vue')
}

/**
 * 获取布局组件
 * 懒加载
 * @param layoutType 布局类型
 * @returns
 */
export function getLayoutComponent(layoutType: LayoutType) {
  return LayoutComponents[layoutType]
}

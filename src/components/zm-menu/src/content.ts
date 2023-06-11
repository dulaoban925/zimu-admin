import { ref, h, PropType, defineComponent, watchEffect, VNode } from 'vue'
import { isString, isObject } from '@vue/shared'
import type { NavigationFailure } from 'vue-router'
import { checkIndexPath } from './zm-menu'
import { ZmMenuDataItem, ZmMenuItemClicked } from '../types'
import * as icons from '@element-plus/icons'
import {
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElIcon,
  ElScrollbar
} from 'element-plus'
import { isBoolean, Nullable } from '@/utils'

const props = {
  // 菜单数据
  data: {
    type: Array as PropType<ZmMenuDataItem[]>,
    default: () => []
  },
  // 筛选输入框输入的值
  filterInputValue: String
}

const emits = {
  // sub-menu 展开事件
  open: (index: string, indexPath: string[]) =>
    isString(index) && checkIndexPath(indexPath),
  // sub-menu 关闭事件
  close: (index: string, indexPath: string[]) =>
    isString(index) && checkIndexPath(indexPath),
  // 选中菜单
  select: (
    index: string,
    indexPath: string[],
    item: ZmMenuItemClicked,
    routerResult?: Promise<void | NavigationFailure>
  ) =>
    isString(index) &&
    checkIndexPath(indexPath) &&
    isObject(item) &&
    (routerResult === undefined || routerResult instanceof Promise),
  // 导航菜单收起状态变更事件
  collapseChange: (collapseFlag: boolean) => isBoolean(collapseFlag)
}

export default defineComponent({
  name: 'ZmMenuContent',
  components: {
    ElMenu,
    ElSubMenu,
    ElMenuItem,
    ElIcon,
    ElScrollbar
  },
  props,
  emits,
  setup(props, { emit, attrs }) {
    // 菜单主体虚拟节点
    const menuVnodes = ref<any>([])

    // 末级菜单筛选高亮节点渲染
    const renderHighlightMenuItem = (label: string) => {
      const splitLabel = props.filterInputValue
        ? label.split(props.filterInputValue)
        : [label]
      const childSpans = splitLabel.reduce(
        (ret: VNode[], c: VNode | string, index: number) => {
          c && ret.push(c as VNode)
          if (index < splitLabel.length - 1) {
            ret.push(
              h(
                'span',
                { style: { color: 'var(--el-color-primary)' } },
                props.filterInputValue
              )
            )
          }
          return ret
        },
        []
      )
      return h('span', childSpans)
    }

    // 渲染菜单子项
    const renderMenuChildren = (menus: ZmMenuDataItem[]) => {
      const result: any = []
      for (const menu of menus) {
        let subComp: any = null
        if (menu.children?.length) {
          // @ts-ignore
          const iconComp = menu.icon ? icons[menu.icon!] : null
          const iconVnode = iconComp ? h(ElIcon, () => h(iconComp)) : null
          const titleVnode = h('span', menu.label)
          subComp = h(
            ElSubMenu,
            {
              index: menu.index,
              disabled: menu.disabled
            },
            {
              default: () => renderMenuChildren(menu.children!),
              title: () => [iconVnode, titleVnode]
            }
          )
        } else {
          subComp = h(
            ElMenuItem,
            {
              index: menu.index,
              disabled: menu.disabled
            },
            () => renderHighlightMenuItem(menu.label)
          )
        }
        subComp && result.push(subComp)
      }
      return result
    }

    // 渲染 ElMenu
    const renderMenu = (menus: ZmMenuDataItem[]) => {
      return h(
        ElMenu,
        {
          ...(attrs as Nullable<typeof ElMenu>),
          collapseTransition: false,
          onOpen: (index: string, indexPath: string[]) =>
            emit('open', index, indexPath),
          onClose: (index: string, indexPath: string[]) =>
            emit('close', index, indexPath),
          onSelect: (
            index: string,
            indexPath: string[],
            item: ZmMenuItemClicked,
            routerResult?: Promise<void | NavigationFailure>
          ) => emit('select', index, indexPath, item, routerResult)
        },
        () => renderMenuChildren(menus)
      )
    }

    // scroll
    const renderScroll = () => {
      return h(
        ElScrollbar,
        {
          class: 'zm-menu__content-scroll'
        },
        () => renderMenu(props.data)
      )
    }

    watchEffect(() => {
      menuVnodes.value = renderScroll()
    })

    return () =>
      h(
        'div',
        {
          class: 'zm-menu__content'
        },
        menuVnodes.value ?? []
      )
  }
})

<!--
  左导航菜单
-->
<template>
  <div class="horizontal-sidebar">
    <zm-menu
      :data="menus"
      :default-active="activeMenu"
      index-key="code"
      show-common-used
      show-collect
      @select="handleMenuSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { MENU_NAVIGATE_TYPE } from '@/constants'
import { LAYOUT_PROVIDE_KEY } from '@/layouts/basic-layout/constants'
import type { LayoutProvide } from '@/layouts/basic-layout/types'

defineOptions({
  name: 'HorizontalLayoutSidebar'
})

const _router = useRouter()

const { menus, activeMenu } = inject<LayoutProvide>(LAYOUT_PROVIDE_KEY, {})

/**
 * 通过路径数组查找菜单项
 */
const findMenuItemByPath = (
  menus: ZiMuAuth.Menu[],
  path: string[]
): Nullable<ZiMuAuth.Menu> => {
  if (!menus.length) return null
  for (const menu of menus) {
    if (menu.code === path[0]) {
      if (path.length === 1) return menu
      if (menu.children?.length) {
        const menuItem = findMenuItemByPath(menu.children, path.slice(1))
        return menuItem
      } else {
        return null
      }
    }
  }
}

/**
 * 选择菜单
 */
const handleMenuSelect = (index: string, itemPath: string[]) => {
  const selectedMenu = findMenuItemByPath(menus.value, itemPath)
  if (!selectedMenu) return
  switch (selectedMenu.navigateType) {
    case MENU_NAVIGATE_TYPE.NONE:
      break
    case MENU_NAVIGATE_TYPE.INTERNAL:
      _router.push(selectedMenu.path ?? { name: index })
      break
    case MENU_NAVIGATE_TYPE.EXTERNAL:
      selectedMenu.path && window.open(selectedMenu.path)
      break
  }
}
</script>

<style scoped></style>

<template>
  <router-link
    v-click-outside="contextMenuRef?.close"
    :class="{ 'common-tab': true, active }"
    :to="to[VIEW_DIFF_PROP]"
    @contextmenu.prevent="handleContextMenu"
  >
    <slot v-if="active" name="active-icon">
      <el-icon size="16"><postcard /></el-icon>
    </slot>
    <span :id="contextMenuTeleportTo" class="common-tab__label">{{
      to.meta?.title ?? 'title 未定义'
    }}</span>
    <el-icon
      v-if="closeable"
      size="16"
      class="common-tab__close-icon"
      @click.prevent.stop="handleClose"
    >
      <close />
    </el-icon>
  </router-link>
  <context-menu
    ref="contextMenu"
    :teleport-to="`#${contextMenuTeleportTo}`"
    :disabled-keys="contextMenuDisabledKeys"
    @item-click="handleContextMenuItemClick"
  />
</template>

<script setup lang="ts">
import { ClickOutside as vClickOutside } from 'element-plus'
import { VIEW_DIFF_PROP } from '@/constants'
import type { ZiMuRoute } from '@/typings/route'
import type { ContextMenuItem } from '../types'
import ContextMenu from './context-menu.vue'

type ContextMenuType = InstanceType<typeof ContextMenu>

defineOptions({
  name: 'CommonTab'
})

type Props = {
  to: ZiMuRoute.RouteLocationNormalized
  active: boolean
}

const { to, active } = defineProps<Props>()

const emit = defineEmits([
  'close',
  'refresh',
  'closeLeft',
  'closeRight',
  'closeOthers',
  'closeAll'
])

const handleClose = () => {
  emit('close')
}

const closeable = computed(() => !to.meta?.affix)

const contextMenuDisabledKeys = computed(() => [
  closeable.value ? null : 'close',
  active ? null : 'refresh'
])

const contextMenuTeleportTo = computed(() => `${String(to.name)}_${useId()}`)

const contextMenuRef = useTemplateRef<ContextMenuType>('contextMenu')

const handleContextMenu = () => {
  contextMenuRef.value?.open?.()
}

const handleContextMenuItemClick = (item: ContextMenuItem) => {
  emit(item.key)
}
</script>

<style lang="scss" scoped>
.common-tab {
  --zm-tab-font-size: 14px;
  --zm-tab-padding: 8px;
  --zm-tab-margin: 4px;
  --zm-tab-bg-color: var(--el-color-info-light-8);

  display: inline-flex;
  align-items: center;
  flex-wrap: nowrap;
  cursor: pointer;
  height: var(--zm-layout-tab-height);
  line-height: var(--zm-layout-tab-height);
  color: var(--el-text-color-primary);
  background: var(--el-bg-color-page);
  padding: 0 var(--zm-tab-padding);
  font-size: var(--zm-tab-font-size);
  border-radius: 10px 10px 0 0;

  &:not(:last-child) {
    margin-right: var(--zm-tab-margin);
  }

  &.active {
    background-color: var(--el-bg-color);
    color: var(--el-color-primary);
  }

  &__label {
    padding: 0 var(--zm-common-padding);
  }

  &__close-icon {
    line-height: var(--zm-common-font-size);
    border-radius: 50%;
    text-align: center;
    transition: all 0.3s;
    &:hover {
      background-color: var(--el-bg-color-page);
      color: var(--el-color-white);
    }
  }
}
</style>

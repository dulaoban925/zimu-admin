<!--
 右键菜单：关闭；关闭其他；关闭左侧；关闭右侧；关闭全部
-->
<template>
  <Teleport :disabled="!teleported" :to="to">
    <Transition name="zoom-in-top">
      <div v-show="visible" class="context-menu">
        <div
          v-for="m in menuList"
          :key="m.key"
          :class="{ 'context-menu-item': true, 'is-disabled': m.disabled }"
          @click.prevent.stop="handleItemClick(m)"
        >
          <el-icon><component :is="m.icon" /></el-icon>
          <span class="context-menu-item__label">{{ m.label }}</span>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { Close } from '@zimu/icons'
import type { ContextMenuItem } from '../types'

type Props = {
  teleported?: boolean
  teleportTo: string
  disabledKeys?: string[]
}

const {
  teleported = true,
  teleportTo: to,
  disabledKeys = []
} = defineProps<Props>()
const emit = defineEmits<{
  itemClick: [item: ContextMenuItem]
}>()

const menuList = computed<ContextMenuItem[]>(() => [
  {
    key: 'close',
    label: '关闭',
    icon: Close,
    disabled: disabledKeys.includes('close')
  },
  {
    key: 'closeLeft',
    label: '关闭左侧',
    icon: Close,
    disabled: disabledKeys.includes('closeLeft')
  },
  {
    key: 'closeRight',
    label: '关闭右侧',
    icon: Close,
    disabled: disabledKeys.includes('closeRight')
  },
  {
    key: 'closeOthers',
    label: '关闭其他',
    icon: Close,
    disabled: disabledKeys.includes('closeOthers')
  },
  {
    key: 'closeAll',
    label: '关闭全部',
    icon: Close,
    disabled: disabledKeys.includes('closeAll')
  }
])

const visible = ref(false)
const handleItemClick = (item: ContextMenuItem) => {
  if (item.disabled) return
  emit('itemClick', item)
  close()
}

const open = () => (visible.value = true)
const close = () => (visible.value = false)

defineExpose({
  open,
  close
})
</script>

<style scoped lang="scss">
$transition-duration: 0.3s;
$transition-function-fast-bezier: cubic-bezier(0.23, 1, 0.32, 1);

.zoom-in-top-enter-active,
.zoom-in-top-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: (
    transform $transition-duration $transition-function-fast-bezier,
    opacity $transition-duration $transition-function-fast-bezier
  );
  transform-origin: center top;
}
.zoom-in-top-enter-from,
.zoom-in-top-leave-active {
  opacity: 0;
  transform: scaleY(0);
}

.context-menu {
  position: absolute;
  z-index: 2037;
  padding: 5px 0;
  background-color: var(--el-bg-color-overlay);
  border-radius: var(--el-border-radius-base);
  box-shadow: var(--el-box-shadow-light);
  border: 1px solid var(--el-border-color-light);

  &-item {
    display: flex;
    align-items: center;
    white-space: nowrap;
    list-style: none;
    line-height: 22px;
    padding: 5px 10px;
    margin: 0;
    font-size: var(--el-font-size-base);
    color: var(--el-text-color-regular);
    cursor: pointer;
    outline: none;

    &.is-disabled {
      cursor: not-allowed;
      color: var(--el-text-color-disabled);
    }

    &:not(.is-disabled):hover,
    &:not(.is-disabled):focus {
      background-color: var(--el-color-primary-light-9);
      color: var(--el-color-primary);
    }

    &__label {
      margin-left: 5px;
    }
  }
}
</style>

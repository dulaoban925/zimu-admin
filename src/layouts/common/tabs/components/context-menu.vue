<!--
 右键菜单：关闭；关闭其他；关闭左侧；关闭右侧；关闭全部
-->
<template>
  <Teleport :to="to">
    <Transition>
      <div v-show="visible" class="context-menu">
        <div
          v-for="m in menuList"
          :key="m.key"
          :class="{ 'context-menu-item': true, 'is-disabled': m.disabled }"
          @click="handleItemClick(m)"
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

type Props = {
  teleportTo: string
}

type MenuItem = {
  key: string
  label: string
  icon: Component
  disabled: boolean
}

const { teleportTo: to } = defineProps<Props>()
const emit = defineEmits<{
  itemClick: [item: MenuItem]
}>()

const menuList = ref<MenuItem[]>([
  {
    key: 'closeSelf',
    label: '关闭',
    icon: Close,
    disabled: true
  },
  {
    key: 'closeLeft',
    label: '关闭左侧',
    icon: Close,
    disabled: false
  },
  {
    key: 'closeRight',
    label: '关闭右侧',
    icon: Close,
    disabled: false
  },
  {
    key: 'closeOthers',
    label: '关闭其他',
    icon: Close,
    disabled: false
  },
  {
    key: 'closeAll',
    label: '关闭全部',
    icon: Close,
    disabled: false
  }
])

const visible = ref(false)
const handleItemClick = (item: MenuItem) => {
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

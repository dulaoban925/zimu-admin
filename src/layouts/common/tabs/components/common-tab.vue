<template>
  <router-link
    v-click-outside="contextMenuRef?.close"
    :class="{ 'common-tab': true, active }"
    :to="to[VIEW_DIFF_PROP]"
    @contextmenu="handleContextMenu"
  >
    <slot v-if="active" name="active-icon">
      <el-icon size="16"><postcard /></el-icon>
    </slot>
    <span :id="contextMenuTeleportTo" class="common-tab__label">{{
      label
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
  <context-menu ref="contextMenu" :teleport-to="`#${contextMenuTeleportTo}`" />
</template>

<script setup lang="ts">
import { ClickOutside as vClickOutside } from 'element-plus'
import { VIEW_DIFF_PROP } from '@/constants'
import type { ZiMuRoute } from '@/typings/route'
import ContextMenu from './context-menu.vue'

type ContextMenuType = InstanceType<typeof ContextMenu>

defineOptions({
  name: 'CommonTab'
})

const props = defineProps({
  to: {
    type: Object as PropType<ZiMuRoute.RouteLocationNormalized>,
    required: true
  },
  label: String,
  closeable: Boolean,
  active: Boolean
})

const emit = defineEmits(['close'])

const handleClose = () => {
  emit('close', props.to)
}

const contextMenuTeleportTo = computed(
  () => `${String(props.to.name)}_${useId()}`
)

const contextMenuRef = useTemplateRef<ContextMenuType>('contextMenu')

const handleContextMenu = (e: MouseEvent) => {
  e.preventDefault()
  console.log(
    '🚀 ~ handleContextMenu ~ contextMenuRef.value:',
    contextMenuRef.value
  )
  contextMenuRef.value?.open?.()
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

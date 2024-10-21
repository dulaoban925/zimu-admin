<template>
  <router-link :class="{ 'common-tab': true, active }" :to="to">
    <slot v-if="active" name="active-icon">
      <el-icon size="16"><postcard /></el-icon>
    </slot>
    <span class="common-tab__label">{{ label }}</span>
    <el-icon
      v-if="closeable"
      size="16"
      class="common-tab__close-icon"
      @click.prevent.stop="handleClose"
    >
      <close />
    </el-icon>
  </router-link>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

defineOptions({
  name: 'CommonTab'
})

const props = defineProps({
  to: {
    type: Object as PropType<RouteLocationRaw>,
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

<template>
  <router-link :class="{ 'common-tab': true, active }" :to="to">
    <slot name="active-icon">
      <el-icon><postcard /></el-icon>
    </slot>
    <span class="common-tab__label">{{ label }}</span>
    <el-icon
      v-if="closeable"
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
  --zm-tab-height: 40px;
  --zm-tab-font-size: 14px;
  --zm-tab-padding: 8px;
  --zm-tab-margin: 4px;
  --zm-tab-bg-color: var(--el-color-info-light-8);

  display: inline-block;
  cursor: pointer;
  height: var(--zm-tab-height);
  line-height: var(--zm-tab-height);
  color: var(--el-text-color-primary);
  background: var(--zm-tab-bg-color);
  padding: 0 var(--zm-tab-padding);
  font-size: var(--zm-tab-font-size);
  position: relative;

  &:not(:last-child) {
    margin-right: var(--zm-tab-margin);
  }

  &.active {
    background-color: var(--el-color-white);
    color: var(--el-color-primary);
  }

  &__label {
    padding: 0 var(--zm-common-padding);
  }

  &__close-icon {
    width: var(--zm-common-font-size);
    height: var(--zm-common-font-size);
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

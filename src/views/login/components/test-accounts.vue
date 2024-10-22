<template>
  <div class="test-accounts">
    <span>测试账号：</span>
    <el-button
      type="primary"
      plain
      size="small"
      @click="handleAccountClick('admin')"
      >admin</el-button
    >
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['clickAccount'])
/**
 * 点击测试账号
 */
const handleAccountClick = (account: string) => {
  emit('clickAccount', account)
}
</script>

<style lang="scss" scoped>
.test-accounts {
  font-size: var(--zm-font-size-base);
  padding-top: var(--zm-common-padding);
  display: flex;
  align-items: center;
  span {
    color: var(--el-text-color-regular);
  }
}
</style>

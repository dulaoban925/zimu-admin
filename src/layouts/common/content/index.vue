<template>
  <router-view v-slot="{ Component, route }">
    <transition mode="out-in" appear>
      <keep-alive :include="[]">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
</template>
<script setup lang="ts">
defineOptions({
  name: 'LayoutCommonContent'
})
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <zm-transition :mode="TRANSITION_MODE.OUT_IN">
      <keep-alive :include="[]">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </zm-transition>
  </router-view>
</template>
<script setup lang="ts">
import { TRANSITION_MODE } from '@components/zm-transition'

defineOptions({
  name: 'LayoutCommonContent'
})
</script>

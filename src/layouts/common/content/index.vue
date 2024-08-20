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
import { useRoute } from 'vue-router'
import { VIEW_DIFF_PROP } from '@/constants'
import { useMenuStore } from '@/store'

defineOptions({
  name: 'CommonContent'
})

const _route = useRoute()
const menuStore = useMenuStore()

watch(
  () => _route[VIEW_DIFF_PROP],
  () => {
    menuStore.setActiveMenu(_route.name as string)
  },
  {
    immediate: true
  }
)
</script>

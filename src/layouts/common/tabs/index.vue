<!--
  系统页签
 -->
<template>
  <div class="common-tabs">
    <zm-scroll :options="scrollOptions">
      <div class="common-tabs__content">
        <common-tab
          v-for="tab in tabs"
          :key="tab.fullPath"
          :to="tab"
          :label="tab.meta?.title"
          :closeable="!tab.meta?.affix"
          :active="tab[VIEW_DIFF_PROP] === activeTab"
          @close="handleTabClose"
        />
      </div>
    </zm-scroll>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { VIEW_DIFF_PROP } from '@/constants'
import { useViewStore } from '@/store'
import type { ZiMuRoute } from '@/typings/route'
import CommonTab from './components/common-tab.vue'

const _route = useRoute()

const viewStore = useViewStore()

defineOptions({
  name: 'CommonTabs'
})

const tabs = computed<ZiMuRoute.RouteLocationNormalized[]>(
  () => viewStore.visitedViews
)

const activeTab = computed(() => viewStore.activeView)

const scrollOptions = {
  scrollX: true,
  scrollY: false
}

const handleTabClose = (tab: ZiMuRoute.RouteLocationNormalized) => {
  viewStore.delView(tab)
}

watch(
  () => _route[VIEW_DIFF_PROP],
  () => {
    viewStore.addView(_route)
    viewStore.setActiveView(_route)
  }
)

onMounted(() => {
  viewStore.initViews(_route)
})
</script>

<style lang="scss" scoped>
.common-tabs {
  &__content {
    display: inline-flex;
  }
}
</style>

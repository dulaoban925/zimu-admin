<!--
  系统页签
 -->
<template>
  <div class="common-tabs">
    <zm-scroll :options="scrollOptions">
      <div class="common-tabs__content">
        <common-tab
          v-for="tab in tabs"
          :key="tab[VIEW_DIFF_PROP]"
          :to="tab"
          :active="tab[VIEW_DIFF_PROP] === activeTab"
          @close="handleTabClose(tab)"
          @refresh="handleTabRefresh()"
          @close-left="handleCloseTabs(tab, 'left')"
          @close-right="handleCloseTabs(tab, 'right')"
          @close-others="handleCloseTabs(tab, 'others')"
          @close-all="handleCloseTabs(tab, 'all')"
        />
      </div>
    </zm-scroll>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { VIEW_DIFF_PROP } from '@/constants'
import { useAppStore, useViewStore } from '@/store'
import type { ZiMuRoute } from '@/typings/route'
import CommonTab from './components/common-tab.vue'

const scrollOptions = {
  scrollX: true,
  scrollY: false
}
const _route = useRoute()
const _router = useRouter()
const viewStore = useViewStore()
const appStore = useAppStore()

defineOptions({
  name: 'CommonTabs'
})

// 所有展示的页签
const tabs = computed<ZiMuRoute.RouteLocationNormalized[]>(
  () => viewStore.visitedViews
)
// 当前激活的页签
const activeTab = computed(() => viewStore.activeView)

// 判断 tab 是否激活
const isActive = (tab: ZiMuRoute.RouteLocationNormalized) => {
  return activeTab.value === tab[VIEW_DIFF_PROP]
}

// 关闭页签
const handleTabClose = (tab: ZiMuRoute.RouteLocationNormalized) => {
  // 若当前关闭的页签是激活状态，则将切换激活的页签；
  if (isActive(tab)) {
    switchActivatedTab(tab)
  }
  // 清除 tab
  viewStore.delView(tab)
}

/**
 * 刷新
 */
const handleTabRefresh = () => {
  appStore.reloadPage(500)
}

// 批量关闭页签
const handleCloseTabs = (
  tab: ZiMuRoute.RouteLocationNormalized,
  type: 'left' | 'right' | 'others' | 'all'
) => {
  viewStore.delViews(tab, type)
  const visitedViews = viewStore.visitedViews
  const activeView = viewStore.activeView
  const activeIndex = visitedViews.findIndex(
    v => v[VIEW_DIFF_PROP] === activeView
  )
  if (activeIndex > -1) return
  console.log('🚀 ~ activeIndex:', activeIndex)
  _router.push(visitedViews.at(-1)?.fullPath ?? '/')
}

// 切换激活的页签
const switchActivatedTab = (tab: ZiMuRoute.RouteLocationNormalized) => {
  // 1. 判断当前 tab 后面是否还有 tab，若存在，则激活
  const curTabIndex = tabs.value.findIndex(
    item => item[VIEW_DIFF_PROP] === tab[VIEW_DIFF_PROP]
  )
  const nextTab = tabs.value[curTabIndex + 1]
  if (nextTab) {
    _router.push(nextTab.fullPath)
    return
  }
  // 2. 若不存在，则激活当前 tab 前面的 tab
  const prevTab = tabs.value[curTabIndex - 1]
  if (prevTab) {
    _router.push(prevTab.fullPath)
    return
  }
  // 3. 若不存在，则激活首页
  _router.push('/')
}

watch(
  () => _route[VIEW_DIFF_PROP],
  () => {
    viewStore.addView(_route)
    viewStore.setActiveView(_route)
    console.log('🚀 ~ viewStore:', viewStore)
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

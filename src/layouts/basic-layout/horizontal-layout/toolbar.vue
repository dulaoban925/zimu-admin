<!--
  水平布局顶部操作栏
-->
<template>
  <common-header>
    <template #operation>
      <el-icon>
        <component
          :is="fullScreen ? ExitFullscreen : FullScreen"
          @click="handleFullScreen"
        />
      </el-icon>
      <el-icon>
        <component :is="dark ? Sunny : Moon" @click="toggleDark()" />
      </el-icon>
      <el-icon><avatar-line /></el-icon>
    </template>
  </common-header>
</template>

<script setup lang="ts">
import CommonHeader from '@/layouts/common/header/index.vue'
import { FullScreen, Sunny, Moon } from '@element-plus/icons'
import { ExitFullscreen } from '@zimu/icons'
import { toggleFullScreen } from '@/utils'
import { useDark } from '@vueuse/core'
import { useToggle } from '@vueuse/shared'

defineOptions({
  name: 'HorizontalLayoutToolbar'
})

// TODO:后续走配置，存 pinia
const fullScreen = ref(false)

function handleFullScreen() {
  fullScreen.value = toggleFullScreen()
}

const dark = useDark({
  storageKey: 'zm-theme-appearance'
})
const toggleDark = useToggle(dark)
</script>

<style scoped></style>

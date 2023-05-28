<!--
  水平布局顶部操作栏
-->
<template>
  <toolbar>
    <template #operation>
      <el-icon color="#fff" size="1.7rem">
        <component
          :is="fullScreen ? ExitFullscreen : FullScreen"
          @click="handleFullScreen"
        />
      </el-icon>
      <el-icon color="#fff" size="1.7rem">
        <component :is="dark ? Sunny : Moon" @click="toggleDark()" />
      </el-icon>
      <el-icon color="#fff" size="1.7rem"><Avatar /></el-icon>
    </template>
  </toolbar>
</template>

<script setup lang="ts">
import Toolbar from '../common/toolbar.vue'
import { FullScreen, Sunny, Moon } from '@element-plus/icons'
import { ExitFullscreen } from '@components/zm-icons'
import { toggleFullScreen } from '@/utils'
import { useDark } from '@vueuse/core'
import { useToggle } from '@vueuse/shared'

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

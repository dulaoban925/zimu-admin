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
        <component :is="isDark ? Sunny : Moon" @click="toggleThemeMode()" />
      </el-icon>
      <el-icon><avatar-line /></el-icon>
    </template>
  </common-header>
</template>

<script setup lang="ts">
import { FullScreen, Moon, Sunny } from '@element-plus/icons'
import { ExitFullscreen } from '@zimu/icons'
import { useTheme } from '@/hooks'
import CommonHeader from '@/layouts/common/header/index.vue'
import { toggleFullScreen } from '@/utils'

defineOptions({
  name: 'HorizontalLayoutToolbar'
})

const { mode, toggleThemeMode } = useTheme()

const isDark = computed(() => mode.value === 'dark')

// TODO:后续走配置，存 pinia
const fullScreen = ref(false)

function handleFullScreen() {
  fullScreen.value = toggleFullScreen()
}
</script>

<style scoped></style>

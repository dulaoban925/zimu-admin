<template>
  <div class="header-operation-buttons">
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
  </div>
</template>

<script setup lang="ts">
import { ExitFullscreen, FullScreen, Moon, Sunny } from '@zimu/icons'
import { useTheme } from '@/hooks'
import { toggleFullScreen } from '@/utils'

defineOptions({
  name: 'HeaderOperationButtons'
})

const { mode, toggleThemeMode } = useTheme()

const isDark = computed(() => mode.value === 'dark')

// TODO:后续走配置，存 pinia
const fullScreen = ref(false)

function handleFullScreen() {
  fullScreen.value = toggleFullScreen()
}
</script>

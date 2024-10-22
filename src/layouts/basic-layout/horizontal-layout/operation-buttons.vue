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
    <el-dropdown trigger="click" @command="handleUserDropdownCommand">
      <el-icon><avatar-line /></el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ExitFullscreen, FullScreen, Moon, Sunny } from '@zimu/icons'
import { logout } from '@/apis'
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

/**
 * 用户下拉菜单点击事件
 */
function handleUserDropdownCommand(command: string) {
  switch (command) {
    case 'logout':
      logout()
      break
  }
}
</script>

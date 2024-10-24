<template>
  <div class="header-operation-buttons">
    <el-icon>
      <component
        :is="fullScreen ? ExitFullscreen : FullScreen"
        @click="handleFullScreen"
      />
    </el-icon>
    <el-icon>
      <component
        :is="THEME_ICON_MAP[themeStore.themeScheme]"
        @click="
          themeStore.setThemeScheme(
            themeStore.darkMode ? THEME_SCHEMES.LIGHT : THEME_SCHEMES.DARK
          )
        "
      />
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
import { ExitFullscreen, FullScreen, Moon, Sunny, Sunrise } from '@zimu/icons'
import { logout } from '@/apis'
import { THEME_SCHEMES } from '@/constants'
import { useThemeStore } from '@/store'
import { toggleFullScreen } from '@/utils'

const THEME_ICON_MAP = {
  dark: Moon,
  light: Sunny,
  auto: Sunrise
}

defineOptions({
  name: 'HeaderOperationButtons'
})

const themeStore = useThemeStore()

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

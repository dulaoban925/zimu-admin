<template>
  <div class="header-operation-buttons">
    <el-icon>
      <component
        :is="fullScreen ? ExitFullscreen : FullScreen"
        @click="handleFullScreen"
      />
    </el-icon>
    <zm-theme-toggler />
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
import { ExitFullscreen, FullScreen } from '@zimu/icons'
import { logout } from '@/apis'
import { THEME_SCHEMES } from '@/constants'
import { useThemeStore } from '@/store'
import { toggleFullScreen } from '@/utils'

defineOptions({
  name: 'HeaderOperationButtons'
})

// const themeStore = useThemeStore()

const fullScreen = ref(false)

const handleFullScreen = () => {
  fullScreen.value = toggleFullScreen()
}

// 切换主题
// const handleThemeToggled = isDark => {
//   themeStore.setThemeScheme(isDark ? THEME_SCHEMES.DARK : THEME_SCHEMES.LIGHT)
// }

/**
 * 用户下拉菜单点击事件
 */
const handleUserDropdownCommand = (command: string) => {
  switch (command) {
    case 'logout':
      logout()
      break
  }
}
</script>

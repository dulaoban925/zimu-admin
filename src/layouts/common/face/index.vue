<template>
  <div class="common-face">
    <zm-face-recognition
      class="zm-face-recognition"
      @theme-change="handleThemeChange"
    />
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/hooks'
defineOptions({
  name: 'CommonFace'
})

const { toggleThemeMode } = useTheme()
const handleThemeChange = (theme: string) => {
  console.error('theme', theme)
  toggleThemeMode(theme)
}
</script>

<style scoped>
.common-face {
  position: fixed;
  top: 50px;
  right: 0;
}
</style>

<template>
  <div class="common-face">
    <zm-face-recognition :visible="false" @theme-change="handleThemeChange" />
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/hooks'
defineOptions({
  name: 'CommonFace'
})

const { toggleThemeMode } = useTheme()
const handleThemeChange = (theme: string) => {
  toggleThemeMode(theme)
}
</script>

<template>
  <div v-if="enable" class="common-face">
    <zm-face-recognition :visible="false" @theme-change="handleThemeChange" />
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/hooks'
import { useSettingStore } from '@/store'

defineOptions({
  name: 'CommonFace'
})

const settingStore = useSettingStore()

const enable = computed(() => settingStore.enableFaceRecognition)

const { toggleThemeMode } = useTheme()
const handleThemeChange = (theme: string) => {
  toggleThemeMode(theme)
}
</script>

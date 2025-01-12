<template>
  <h1>我是粉色小熊：</h1>
  <pink-bear />
  <h1>我是所有图标：</h1>
  <component :is="icon" v-for="icon in icons" :key="icon.name" />
</template>

<script setup>
import { icons } from '@zimu/icons'
</script>

<style scoped></style>

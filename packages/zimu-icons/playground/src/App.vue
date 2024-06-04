<template>
  <h1>我是粉色小熊：</h1>
  <pink-bear />
  <h1>我是所有图标：</h1>
  <component v-for="icon in icons" :key="icon.name" :is="icon"></component>
</template>

<script setup>
import { icons } from '@zimu/icons'
</script>

<style scoped></style>

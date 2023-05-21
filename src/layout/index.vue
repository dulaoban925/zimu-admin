<template>
  <component :is="Wrapper">
    <router-view />
  </component>
</template>
<script setup lang="ts">
import Wrapper from './wrappers/horizontal/index.vue'
</script>

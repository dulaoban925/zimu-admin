<template>
  <router-view v-slot="{ Component, route }">
    <transition mode="out-in" :appear="true">
      <keep-alive :include="[]">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
</template>

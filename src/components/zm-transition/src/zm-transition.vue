<!-- TODO:
    1.支持更多的默认动销
    2.支持自定义动效钩子设置
  -->
<template>
  <Transition :name="name" :mode="mode" :appear="appear">
    <slot />
  </Transition>
</template>

<script setup lang="ts">
import type { ValueOf } from '@/utils'
import { TRANSITION_MODE, TRANSITION_NAME } from './constants'

defineOptions({
  name: 'ZmTransition'
})

interface Props {
  name?: ValueOf<typeof TRANSITION_NAME>
  mode?: ValueOf<typeof TRANSITION_MODE>
  appear?: boolean
}

withDefaults(defineProps<Props>(), {
  name: TRANSITION_NAME.FADE,
  mode: TRANSITION_MODE.DEFAULT,
  appear: true
})
</script>

<style lang="scss" scoped>
@import '../style/zm-transition.scss';
</style>

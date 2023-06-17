<template>
  <div class="dashboard">
    <el-button @click="handleClick">{{ text }}</el-button>
  </div>
</template>
<script setup lang="ts">
const text = ref('我是主页')

const _router = useRouter()

const handleClick = () => {
  _router.push('/system-setting/user-manage')
}
</script>

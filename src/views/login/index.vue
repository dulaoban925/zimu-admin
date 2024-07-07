<!--
  登录页面
-->
<template>
  <div class="login">
    <div class="login-content">
      <H2>登录</H2>
      <div class="login-info-wrapper">
        <el-input
          v-model="loginInfo.username"
          class="login-info-item"
          placeholder="用户名"
        />
        <el-input
          v-model="loginInfo.password"
          class="login-info-item"
          placeholder="密码"
        />
        <div class="login-error-message">{{ errorMessage }}</div>
      </div>
      <el-button class="login-button" type="primary" @click="handleLogin"
        >登录</el-button
      >
      <div class="login-extra-buttons">
        <el-button type="primary" link @click="handleRegister">注册</el-button>
        <el-button type="primary" link @click="handleForgetPassword"
          >忘记密码?</el-button
        >
      </div>
    </div>
    <!-- 雷达效果 -->
    <div class="radar-ripples">
      <div class="rr0"></div>
      <div class="rr1"></div>
      <div class="rr2"></div>
      <div class="rr3"></div>
      <div class="rr4"></div>
      <div class="rr5"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { login } from '@/apis/login'

// 登录信息
const loginInfo = reactive({
  username: '',
  password: ''
})

// 登录错误信息
const errorMessage = ref('')

/**
 * 登录
 */
const handleLogin = async () => {
  if (!loginInfo.username || !loginInfo.password) {
    errorMessage.value = '用户名或密码不能为空'
  }
  const res = await login(loginInfo)

  console.log(res)
}

/**
 * 注册
 */
const handleRegister = () => {
  console.log('注册')
}

/**
 * 忘记密码
 */
const handleForgetPassword = () => {
  console.log('忘记密码')
}
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  position: relative;
  background: url('./imgs/background.png') center/100% no-repeat;

  &-content {
    width: 250px;
    height: fit-content;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 1;
    padding: 20px var(--zm-common-padding);
    border-radius: var(--zm-border-radius-common);
    background-color: var(--el-color-white);

    h2 {
      margin: auto;
      color: var(--el-text-color-regular);
      text-align: center;
    }
  }

  &-info-item {
    padding-top: var(--zm-common-padding);
  }

  &-button {
    width: 100%;
  }

  &-error-message {
    height: 20px;
    font-size: 12px;
    color: var(--el-color-danger);
  }

  &-extra-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .radar-ripples {
    div {
      width: 150px;
      height: 150px;
      position: absolute;
      top: calc((100% - 150px) / 2);
      left: calc((100% - 150px) / 2);
      border-radius: 50%;
      background: var(--el-color-primary-light-8);
      animation: rr 1.8s linear infinite;
    }

    .rr0 {
      animation-delay: 0.3s;
    }
    .rr1 {
      animation-delay: 0.6s;
    }
    .rr2 {
      animation-delay: 0.9s;
    }
    .rr3 {
      animation-delay: 1.2s;
    }
    .rr4 {
      animation-delay: 1.5s;
    }
    .rr5 {
      animation-delay: 1.8s;
    }
  }

  @keyframes rr {
    0% {
      transform: scale(1);
      opacity: 0.85;
    }
    25% {
      transform: scale(2);
      opacity: 0.65;
    }
    50% {
      transform: scale(3);
      opacity: 0.45;
    }
    75% {
      transform: scale(4);
      opacity: 0.25;
    }
    100% {
      transform: scale(5);
      opacity: 0.05;
    }
  }
}
</style>

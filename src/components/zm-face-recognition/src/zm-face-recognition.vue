<!--
  人脸识别组件
-->
<template>
  <div
    :class="[
      'zm-face-recognition',
      `${visible ? '' : 'zm-face-recognition--hide'}`
    ]"
  >
    <video
      ref="videoRef"
      :width="videoWidth"
      :height="videoHeight"
      autoplay
      @loadedmetadata="play"
    />
  </div>
</template>

<script setup lang="ts">
import * as FaceApi from 'face-api.js'
import { EXPRESSION_THEME_MAP, EXPRESSIONS } from './constants'

interface Expression {
  angry: number // 生气
  disgusted: number // 厌恶
  fearful: number // 害怕
  happy: number // 开心
  neutral: number // 无表情
  sad: number // 悲伤
  surprised: number // 惊讶
  [key: string]: number
}

interface Props {
  visible: boolean
  videoWidth: number | string
  videoHeight: number | string
}

defineOptions({
  name: 'ZmFaceRecognition'
})

withDefaults(defineProps<Props>(), {
  visible: true,
  videoWidth: '100',
  videoHeight: '100'
})

const emit = defineEmits(['theme-change'])

const videoRef = ref<HTMLVideoElement>()

// 初始化媒体
function initMedia() {
  const constraints = { audio: false, video: true }
  return window.navigator.mediaDevices
    .getUserMedia(constraints)
    .then(mediaStream => {
      videoRef.value!.srcObject = mediaStream
    })
    .catch(e => {
      console.error(e.message)
    })
}

// 初始化人脸识别
async function initFaceRecognition() {
  await FaceApi.loadSsdMobilenetv1Model('/face-models/')
  await FaceApi.loadFaceLandmarkModel('/face-models/')
  await FaceApi.loadFaceExpressionModel('/face-models/')
}

// 设置人脸识别表情
function setFaceExpression(expressions?: Expression) {
  if (!expressions) return
  const expression = Object.values(EXPRESSIONS).reduce((pre, cur) => {
    if (!pre) return cur
    else return expressions[cur] > expressions[pre] ? cur : pre
  }, '')

  if (expression) {
    const theme = EXPRESSION_THEME_MAP[expression]
    emit('theme-change', theme)
  }
}

// 定时器对象
let timer: NodeJS.Timeout

// 开始执行人脸识别
async function play() {
  if (timer) clearTimeout(timer)
  if (!videoRef.value) return

  const recognition = await FaceApi.detectSingleFace(
    videoRef.value
  ).withFaceExpressions()
  setFaceExpression(recognition?.expressions as unknown as Expression)

  timer = setTimeout(play)
}

// 组件初始化
async function init() {
  await initFaceRecognition()
  await initMedia()
}

onMounted(() => {
  init()
})
</script>
<style lang="scss" scoped>
@import '../style/zm-face-recognition.scss';
</style>

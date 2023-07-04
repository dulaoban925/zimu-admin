// 人脸表情集合
export const EXPRESSIONS = {
  ANGRY: 'angry', // 生气
  DISGUSTED: 'disgusted', // 厌恶
  FEARFUL: 'fearful', // 害怕
  HAPPY: 'happy', // 开心
  NEUTRAL: 'neutral', // 无表情
  SAD: 'sad', // 悲伤
  SURPRISED: 'surprised' // 惊讶
}

// TODO: 表情与系统主题映射
export const EXPRESSION_THEME_MAP = {
  [EXPRESSIONS.ANGRY]: 'dark',
  [EXPRESSIONS.DISGUSTED]: 'dark',
  [EXPRESSIONS.FEARFUL]: 'dark',
  [EXPRESSIONS.HAPPY]: 'light',
  [EXPRESSIONS.NEUTRAL]: 'light',
  [EXPRESSIONS.SAD]: 'dark',
  [EXPRESSIONS.SURPRISED]: 'light'
}

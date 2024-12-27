import { preset } from '@zimu/eslint-config'

export default preset({
  files: ['src/**/*.vue'],
  rules: {
    'vue/no-unused-refs': 'off'
  }
})

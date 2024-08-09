import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import type { Linter } from 'eslint'

export const prettierConfigs: Linter.Config[] = [
  eslintPluginPrettierRecommended,
  eslintConfigPrettier
]

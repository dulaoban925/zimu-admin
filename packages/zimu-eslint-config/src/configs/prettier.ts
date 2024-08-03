import type { Linter } from "eslint"
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export const prettierConfigs: Linter.Config[] = [
  eslintPluginPrettierRecommended
]
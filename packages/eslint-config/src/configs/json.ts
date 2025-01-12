/**
 * json config
 */
import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from '../globs'
import { ParserJsonc, PluginJsonc } from '../plugins'
import type { Linter } from 'eslint'

export const jsonConfigs: Linter.Config[] = [
  {
    name: 'zimu/json',
    files: [GLOB_JSON, GLOB_JSON5, GLOB_JSONC],
    languageOptions: {
      parser: ParserJsonc
    },
    plugins: {
      jsonc: PluginJsonc as any
    },
    rules: {
      ...(PluginJsonc.configs['recommended-with-jsonc']
        .rules as Linter.RulesRecord),
      'jsonc/quote-props': 'off',
      'jsonc/quotes': 'off'
    }
  }
]

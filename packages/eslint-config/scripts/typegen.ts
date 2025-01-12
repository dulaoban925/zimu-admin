/**
 * 生成规则 ts 类型
 */
import fs from 'node:fs/promises'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { builtinRules } from 'eslint/use-at-your-own-risk'
import { preset } from '../src'
import type { Linter } from 'eslint'

const configs: Linter.Config[] = preset(
  {
    plugins: {
      '': {
        rules: Object.fromEntries(builtinRules.entries())
      }
    }
  },
  {
    vue: true
  }
)

const configNames: string[] = configs
  .map(c => c.name)
  .filter(Boolean) as string[]

let dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false
})

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map(i => `'${i}'`).join(' | ')}
`

await fs.writeFile('src/typegen.d.ts', dts)

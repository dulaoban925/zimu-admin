/**
 * typescript config
 */
import { GLOB_JS, GLOB_TS, GLOB_TSX } from '../globs'
import { tsEslint } from '../plugins'
import { restrictedSyntaxJs } from './javascript'
import type { Linter } from 'eslint'

export const typescriptCoreConfigs = tsEslint.config({
  extends: [...tsEslint.configs.recommended],
  files: [GLOB_TS, GLOB_TSX],
  name: 'zimu/ts',
  languageOptions: {
    parser: tsEslint.parser,
    parserOptions: {
      sourceType: 'module'
    }
  },
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'allow-as-parameter'
      }
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { disallowTypeAnnotations: false, fixStyle: 'inline-type-imports' }
    ],
    '@typescript-eslint/method-signature-style': ['error', 'property'],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-import-type-side-effects': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/prefer-as-const': 'warn',
    '@typescript-eslint/prefer-literal-enum-member': [
      'error',
      { allowBitwiseExpressions: true }
    ],
    'no-restricted-syntax': [
      'error',
      ...restrictedSyntaxJs,
      'TSEnumDeclaration[const=true]'
    ]
  }
}) as Linter.Config[]

// typescript 配置
export const typescriptConfigs: Linter.Config[] = [
  ...typescriptCoreConfigs,
  {
    files: ['**/*.d.ts'],
    rules: {
      'eslint-comments/no-unlimited-disable': 'off',
      'import/no-duplicates': 'off',
      'unused-imports/no-unused-vars': 'off'
    }
  },
  {
    files: ['**/*.{test,spec}.ts?(x)'],
    rules: {
      'no-unused-expressions': 'off'
    }
  },
  {
    files: [GLOB_JS, '**/*.cjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off'
    }
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      'no-restricted-syntax': ['error', ...restrictedSyntaxJs]
    }
  }
]

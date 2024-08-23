/**
 * 排序类规则
 */
import { PluginPerfectionist } from '../plugins'
import type { Linter } from 'eslint'

// 导入语句排序配置
export const importsSortConfigs: Linter.Config[] = [
  {
    name: 'zimu/sort/imports',
    plugins: {
      perfectionist: PluginPerfectionist
    },
    rules: {
      'perfectionist/sort-imports': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'internal-type',
            'parent',
            'parent-type',
            'sibling',
            'sibling-type',
            'index',
            'index-type',
            'object',
            'type',
            'side-effect',
            'side-effect-style'
          ],
          internalPattern: ['@/**', '~/**', '#**'],
          newlinesBetween: 'ignore'
        }
      ],
      'perfectionist/sort-named-exports': [
        'warn',
        { groupKind: 'values-first' }
      ],
      'perfectionist/sort-named-imports': [
        'warn',
        { groupKind: 'values-first' }
      ]
    }
  }
]

// package.json 属性排序
export const packageJsonSortConfigs: Linter.Config[] = [
  {
    files: ['**/package.json'],
    name: 'zimu/sort/package',
    rules: {
      'jsonc/sort-array-values': [
        'error',
        {
          order: { type: 'asc' },
          pathPattern: '^files$'
        }
      ],
      'jsonc/sort-keys': [
        'error',
        {
          order: [
            'name',
            'version',
            'private',
            'packageManager',
            'description',
            'type',
            'keywords',
            'license',
            'homepage',
            'bugs',
            'repository',
            'author',
            'contributors',
            'funding',
            'files',
            'main',
            'module',
            'types',
            'exports',
            'typesVersions',
            'sideEffects',
            'unpkg',
            'jsdelivr',
            'browser',
            'bin',
            'man',
            'directories',
            'publishConfig',
            'scripts',
            'peerDependencies',
            'peerDependenciesMeta',
            'optionalDependencies',
            'dependencies',
            'devDependencies',
            'engines',
            'config',
            'overrides',
            'pnpm',
            'husky',
            'lint-staged',
            'eslintConfig',
            'prettier'
          ],
          pathPattern: '^$'
        },
        {
          order: { type: 'asc' },
          pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$'
        },
        {
          order: ['types', 'require', 'import', 'default'],
          pathPattern: '^exports.*$'
        },
        {
          order: { type: 'asc' },
          pathPattern: '^(?:resolutions|overrides|pnpm.overrides)$'
        }
      ]
    }
  }
]

// tsconfig.json 属性排序
export const tsconfigSortConfigs: Linter.Config[] = [
  {
    files: ['**/tsconfig.json', '**/tsconfig.*.json'],
    name: 'zimu/sort/tsconfig',
    rules: {
      'jsonc/sort-keys': [
        'error',
        {
          order: [
            'extends',
            'compilerOptions',
            'references',
            'files',
            'include',
            'exclude'
          ],
          pathPattern: '^$'
        },
        {
          order: [
            /* Projects */
            'incremental',
            'composite',
            'tsBuildInfoFile',
            'disableSourceOfProjectReferenceRedirect',
            'disableSolutionSearching',
            'disableReferencedProjectLoad',
            /* Language and Environment */
            'target',
            'jsx',
            'jsxFactory',
            'jsxFragmentFactory',
            'jsxImportSource',
            'lib',
            'moduleDetection',
            'noLib',
            'reactNamespace',
            'useDefineForClassFields',
            'emitDecoratorMetadata',
            'experimentalDecorators',
            /* Modules */
            'baseUrl',
            'rootDir',
            'rootDirs',
            'customConditions',
            'module',
            'moduleResolution',
            'moduleSuffixes',
            'noResolve',
            'paths',
            'resolveJsonModule',
            'resolvePackageJsonExports',
            'resolvePackageJsonImports',
            'typeRoots',
            'types',
            'allowArbitraryExtensions',
            'allowImportingTsExtensions',
            'allowUmdGlobalAccess',
            /* JavaScript Support */
            'allowJs',
            'checkJs',
            'maxNodeModuleJsDepth',
            /* Type Checking */
            'strict',
            'strictBindCallApply',
            'strictFunctionTypes',
            'strictNullChecks',
            'strictPropertyInitialization',
            'allowUnreachableCode',
            'allowUnusedLabels',
            'alwaysStrict',
            'exactOptionalPropertyTypes',
            'noFallthroughCasesInSwitch',
            'noImplicitAny',
            'noImplicitOverride',
            'noImplicitReturns',
            'noImplicitThis',
            'noPropertyAccessFromIndexSignature',
            'noUncheckedIndexedAccess',
            'noUnusedLocals',
            'noUnusedParameters',
            'useUnknownInCatchVariables',
            /* Emit */
            'declaration',
            'declarationDir',
            'declarationMap',
            'downlevelIteration',
            'emitBOM',
            'emitDeclarationOnly',
            'importHelpers',
            'importsNotUsedAsValues',
            'inlineSourceMap',
            'inlineSources',
            'isolatedDeclarations',
            'mapRoot',
            'newLine',
            'noEmit',
            'noEmitHelpers',
            'noEmitOnError',
            'outDir',
            'outFile',
            'preserveConstEnums',
            'preserveValueImports',
            'removeComments',
            'sourceMap',
            'sourceRoot',
            'stripInternal',
            /* Interop Constraints */
            'allowSyntheticDefaultImports',
            'esModuleInterop',
            'forceConsistentCasingInFileNames',
            'isolatedModules',
            'preserveSymlinks',
            'verbatimModuleSyntax',
            /* Completeness */
            'skipDefaultLibCheck',
            'skipLibCheck'
          ],
          pathPattern: '^compilerOptions$'
        }
      ]
    }
  }
]

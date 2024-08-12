/**
 * 文件检索路径
 */
// js/jsx
export const GLOB_JS = '**/*.?([cm])js'
export const GLOB_JSX = '**/*.?([cm])jsx'

// ts/tsx
export const GLOB_TS = '**/*.?([cm])ts'
export const GLOB_TSX = '**/*.?([cm])tsx'

// vue
export const GLOB_VUE = '**/*.vue'

// node_modules
export const GLOB_NODE_MODULES = '**/node_modules'

// 打包目录 dist
export const GLOB_DIST = '**/dist'

// 包管理 lock 文件
export const GLOB_LOCKFILE = [
  '**/package-lock.json',
  '**/yarn.lock',
  '**/pnpm-lock.yaml',
  '**/bun.lockb'
]

// eslint ignore 路径
export const GLOB_IGNORE = [
  GLOB_NODE_MODULES,
  GLOB_DIST,
  ...GLOB_LOCKFILE,

  '**/output',
  '**/coverage',
  '**/temp',
  '**/fixtures',
  '**/.vitepress/cache',
  '**/.nuxt',
  '**/.vercel',
  '**/.changeset',
  '**/.idea',
  '**/.output',
  '**/.vite-inspect',
  '**/.nitro',

  '**/CHANGELOG*.md',
  '**/*.min.*',
  '**/LICENSE*',
  '**/__snapshots__',
  '**/auto-import?(s).d.ts',
  '**/components.d.ts'
]

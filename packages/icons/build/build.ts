import path from 'node:path'
import chalk from 'chalk'
import consola from 'consola'
import { build, type BuildOptions, type Format } from 'esbuild'
import GlobalsPlugin from 'esbuild-plugin-globals'
import { emptyDir } from 'fs-extra'
import vue from 'unplugin-vue/esbuild'
import { version } from '../package.json'
import { pathOutput, pathSrc } from './paths'

/**
 * 获取 esbuild 构建配置项
 * @param format 打包格式，分为 esm，iife，cjs
 */
const getBuildOptions = (format: Format) => {
  const options: BuildOptions = {
    entryPoints: [path.resolve(pathSrc, 'index.ts')],
    target: 'es2018',
    platform: 'neutral',
    plugins: [
      vue({
        isProduction: true,
        sourceMap: false,
        template: { compilerOptions: { hoistStatic: false } }
      })
    ],
    bundle: true,
    format,
    minifySyntax: true,
    banner: {
      js: `/*! ZIMU Icons v${version} */\n`
    },
    outdir: pathOutput
  }
  if (format === 'iife') {
    options.plugins!.push(
      GlobalsPlugin({
        vue: 'Vue'
      })
    )
    options.globalName = 'ZIMUIcons'
  } else {
    options.external = ['vue']
  }

  return options
}

/**
 * 执行构建
 * @param minify 是否需要压缩
 */
const doBuild = async (minify: boolean = true) => {
  await Promise.all([
    build({
      ...getBuildOptions('esm'),
      entryNames: `[name]${minify ? '.min' : ''}`,
      minify
    }),
    build({
      ...getBuildOptions('iife'),
      entryNames: `[name].iife${minify ? '.min' : ''}`,
      minify
    }),
    build({
      ...getBuildOptions('cjs'),
      entryNames: `[name]${minify ? '.min' : ''}`,
      outExtension: { '.js': '.cjs' },
      minify
    })
  ])
}

/**
 * 开始构建入口，同时输出 压缩和未压缩 两个版本的结果
 */
const buildBundle = () => {
  return Promise.all([doBuild(), doBuild(false)])
}

consola.log(chalk.blue('开始编译................................'))
consola.log(chalk.blue('清空 dist 目录................................'))
await emptyDir(pathOutput)
consola.log(chalk.blue('构建中................................'))
await buildBundle()
consola.log(chalk.green('构建完成。'))

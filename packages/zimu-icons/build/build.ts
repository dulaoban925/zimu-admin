import path from 'node:path'
// @ts-ignore
import vue from 'unplugin-vue/esbuild'
import { emptyDir } from 'fs-extra'
import chalk from 'chalk'
import { build } from 'esbuild'
import GlobalsPlugin from 'esbuild-plugin-globals'
import { version } from '../package.json'
import { pathSrc, pathOutput } from './paths'
import type { BuildOptions, Format } from 'esbuild'

const buildBundle = () => {
  const getBuildOptions = (format: Format) => {
    const options: BuildOptions = {
      entryPoints: [path.resolve(pathSrc, 'index.ts')],
      target: 'es2018',
      platform: 'neutral',
      plugins: [
        vue({
          isProduction: true,
          sourceMap: false
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
  const doBuild = async (minify: boolean) => {
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

  return Promise.all([doBuild(true), doBuild(false)])
}

console.log(chalk.blue('开始编译................................'))
console.log(chalk.blue('清空 dist 目录................................'))
await emptyDir(pathOutput)
console.log(chalk.blue('构建中................................'))
await buildBundle()
console.log(chalk.green('构建完成。'))

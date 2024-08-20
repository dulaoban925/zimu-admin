import path from 'node:path'
import chalk from 'chalk'
import { build } from 'esbuild'
import { emptyDir } from 'fs-extra'
import { version } from '../package.json'
import { pathOutput, pathSrc } from './paths'
// eslint-disable-next-line no-duplicate-imports
import type { BuildOptions, Format } from 'esbuild'

const buildBundle = () => {
  const getBuildOptions = (format: Format): BuildOptions => {
    const options: BuildOptions = {
      entryPoints: [path.resolve(pathSrc, 'index.ts')],
      target: 'es2018',
      bundle: true,
      format,
      minifySyntax: true,
      banner: {
        js: `/*! @zimu/utils v${version} */`
      },
      outdir: pathOutput
    }

    if (format === 'iife') {
      options.globalName = 'ZiMuUtils'
    }
    return options
  }

  const doBuild = (minify: boolean) => {
    return Promise.all([
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

console.log(chalk.blue('cleaning dist...'))
await emptyDir(pathOutput)
console.log(chalk.blue('building...'))
await buildBundle()
console.log(chalk.blue('build finished...'))

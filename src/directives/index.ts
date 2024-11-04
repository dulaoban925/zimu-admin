import type { App, DirectiveHook, ObjectDirective } from 'vue'

export type DirectiveModule = Record<
  string,
  { default: DirectiveHook | ObjectDirective }
>

// 安装自定义指令
export function setup(app: App) {
  const directives = import.meta.glob('./v-*.ts', {
    eager: true
  }) as DirectiveModule

  for (const key of Object.keys(directives)) {
    const directive = directives[key].default
    const directiveKey = key.replaceAll(/^\.\/v-|.ts$/g, '')
    directive && app.directive(directiveKey, directive)
  }
}

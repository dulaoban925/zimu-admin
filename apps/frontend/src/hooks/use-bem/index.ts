/**
 * bem 规范
 */
/**
 * 生成 class 类名
 *
 * 规则：[block]-[blockSuffix]__[element]--[modifier]
 * @param block 块名称
 * @param blockSuffix 块名称后缀
 * @param element 元素名称
 * @param modifier 变更标志名称
 * @returns
 */
function genBemClass(
  block: string,
  blockSuffix?: string,
  element?: string,
  modifier?: string
) {
  let clsName = block
  if (blockSuffix) clsName += `-${blockSuffix}`
  if (element) clsName += `__${element}`
  if (modifier) clsName += `--${modifier}`
  return clsName
}

export function useBem(block: string) {
  const b = (blockSuffix?: string) => {
    return genBemClass(block, blockSuffix)
  }

  const e = (element: string) => {
    return genBemClass(block, '', element)
  }

  const m = (modifier: string) => {
    return genBemClass(block, '', modifier)
  }

  const be = (blockSuffix: string, element: string) => {
    return genBemClass(block, blockSuffix, element)
  }

  const bm = (blockSuffix: string, modifier: string) => {
    return genBemClass(block, blockSuffix, '', modifier)
  }

  const em = (element: string, modifier: string) => {
    return genBemClass(block, '', element, modifier)
  }

  const bem = (blockSuffix: string, element: string, modifier: string) => {
    return genBemClass(block, blockSuffix, element, modifier)
  }

  return {
    b,
    e,
    m,
    be,
    bm,
    em,
    bem
  }
}

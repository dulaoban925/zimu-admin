/**
 * 对象转 QueryString
 *
 * {page: 1, pageSize: 10} => page=1&pageSize=10
 * @param obj 对象
 */
export function objectToQueryString(obj: Record<string, any>) {
  return new URLSearchParams(obj).toString()
}

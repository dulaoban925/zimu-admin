/**
 * 获取视图
 */
import type { ZiMuRoute } from '@/typings/route.d.ts'

export function getViews(
  views: ZiMuRoute.RouteLocationNormalized[],
  view: ZiMuRoute.RouteLocationNormalized,
  type: 'left' | 'right' | 'others' | 'all'
) {
  const viewIndex = views.findIndex(v => v.name === view.name)
  switch (type) {
    case 'left':
      if (viewIndex < -1) return []
      return views.slice(0, viewIndex)
    case 'right':
      if (viewIndex < -1) return []
      return views.slice(viewIndex + 1)
    case 'others':
      return views.filter(v => v.name !== view.name)
    case 'all':
      return [...views]
  }
}

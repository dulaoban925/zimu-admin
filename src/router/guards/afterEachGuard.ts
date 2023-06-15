import type {
  RouteLocationNormalized,
  NavigationHookAfter,
  NavigationFailure
} from 'vue-router'

export default function createAfterEachGuard(): NavigationHookAfter {
  return (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    failure?: NavigationFailure | void
  ) => {}
}

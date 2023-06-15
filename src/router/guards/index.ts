import { Router } from 'vue-router'
import createBeforeEachGuard from './beforeEachGuard'
import createAfterEachGuard from './afterEachGuard'

export function setupRouterGuards(router: Router) {
  const beforeEachGuard = createBeforeEachGuard()
  router.beforeEach(beforeEachGuard)

  const afterEachGuard = createAfterEachGuard()
  router.afterEach(afterEachGuard)
}

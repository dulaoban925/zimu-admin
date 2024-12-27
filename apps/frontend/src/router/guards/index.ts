import createAfterEachGuard from './after-each'
import createBeforeEachGuard from './before-each'
import type { Router } from 'vue-router'

export async function setupRouterGuards(router: Router) {
  const beforeEachGuard = await createBeforeEachGuard()
  router.beforeEach(beforeEachGuard)

  const afterEachGuard = await createAfterEachGuard()
  router.afterEach(afterEachGuard)
}

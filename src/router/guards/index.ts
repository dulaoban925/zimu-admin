import { Router } from 'vue-router'
import createBeforeEachGuard from './before-each'
import createAfterEachGuard from './after-each'

export async function setupRouterGuards(router: Router) {
  const beforeEachGuard = await createBeforeEachGuard()
  router.beforeEach(beforeEachGuard)

  const afterEachGuard = await createAfterEachGuard()
  router.afterEach(afterEachGuard)
}

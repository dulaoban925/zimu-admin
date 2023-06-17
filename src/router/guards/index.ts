import { Router } from 'vue-router'
import createBeforeEachGuard from './beforeEachGuard'
import createAfterEachGuard from './afterEachGuard'

export async function setupRouterGuards(router: Router) {
  const beforeEachGuard = await createBeforeEachGuard()
  router.beforeEach(beforeEachGuard)

  const afterEachGuard = await createAfterEachGuard()
  router.afterEach(afterEachGuard)
}

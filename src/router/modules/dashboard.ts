// import Layout from '@/layouts/index.vue'
const Dashboard = () => import('@views/dashboard/index.vue')

const dashboardModule = {
  name: 'dashboard',
  path: '/dashboard',
  component: 'Layout',
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
}

export default dashboardModule

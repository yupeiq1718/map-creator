import { createRouter, createWebHistory, createWebHashHistory, RouterOptions, Router, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue')
  },
  {
    path: '/contract',
    name: 'Contract',
    component: () => import('@/views/ContractPage.vue')
  }
]

const options: RouterOptions = {
  history: createWebHashHistory(process.env.VUE_APP_BASE_URL),
  routes
}

const router: Router = createRouter(options)

export default router

import { createRouter, createWebHashHistory, RouterOptions, Router, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue')
  }
]

const options: RouterOptions = {
  history: createWebHashHistory(import.meta.env.VITE_APP_BASE_URL),
  routes
}

const router: Router = createRouter(options)

export default router

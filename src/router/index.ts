import { createRouter, createWebHistory, RouterOptions, Router, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue')
  }
]

const options: RouterOptions = {
  history: createWebHistory('/'),
  routes
}

const router: Router = createRouter(options)

export default router

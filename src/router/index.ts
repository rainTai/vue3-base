import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('../views/home/index.vue'),
    },
    {
      path: '/shan',
      name: 'Shan',
      component: () => import('../views/shan/index.vue'),
    },
  ],
})

export default router

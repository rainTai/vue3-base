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
    {
      path: '/yi',
      name: 'Yi',
      component: () => import('../views/yi/index.vue'),
    },
    {
      path: '/ming',
      name: 'Ming',
      component: () => import('../views/ming/index.vue'),
    },
    {
      path: '/xiang',
      name: 'Xiang',
      component: () => import('../views/xiang/index.vue'),
    },
    {
      path: '/bu',
      name: 'Bu',
      component: () => import('../views/bu/index.vue'),
    },
    {
      path: '/xiu',
      name: 'Xiu',
      component: () => import('../views/xiu/index.vue'),
    },
  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/Layout.vue';

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/components/Home.vue')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/components/Login.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/components/Profile.vue')
      },
      {
        path: '/redirect',
        name: 'redirect',
        component: () => import('@/components/Redirect.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

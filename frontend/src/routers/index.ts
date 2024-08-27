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
        component: () => import('@/views/pages/Home.vue')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/pages/authentication/Login.vue')
      },
      {
        path: '/forgot-password',
        name: 'forgot-password',
        component: () => import('@/views/pages/authentication/ForgotPassword.vue')
      },
      {
        path: '/reset-password',
        name: 'reset-password',
        component: () => import('@/views/pages/authentication/ResetPassword.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/pages/Profile.vue')
      },
      {
        path: '/redirect',
        name: 'redirect',
        component: () => import('@/views/pages/authentication/Redirect.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

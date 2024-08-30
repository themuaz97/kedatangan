import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/Layout.vue';
import AuthLayout from '../layout/AuthLayout.vue';
import { useAuthStore } from '../stores/auth.store';

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
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/pages/Profile.vue')
      },
      {
        path: '/configuration',
        name: 'configuration',
        component: () => import('@/views/pages/configurations/ConfigTab.vue')
      }
    ]
  },
  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: 'login',
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
        path: '/redirect',
        name: 'redirect',
        component: () => import('@/views/pages/authentication/Redirect.vue')
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router;

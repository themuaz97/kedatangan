import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
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
        component: () => import('@/views/pages/configurations/ConfigTab.vue'),
        beforeEnter: async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
          const authStore = useAuthStore();

          // Check if the user data has been fetched, if not, fetch it.
          if (!authStore.user) {
            await authStore.fetchUser(); // Make sure user data is loaded
          }

          // Proceed based on role
          if (authStore.user && authStore.user.role_id === 1) {
            console.log("Access granted to Configuration");
            next(); // Allow access for admin users (role_id === 1)
          } else {
            next('/'); // Redirect non-admin users to home or another page
          }
        },
      },
      {
        path: '/log',
        name: 'log',
        component: () => import('@/views/pages/logs/LogTab.vue'),
      },
      {
        path: '/components',
        name: 'components',
        children: [
          {
            path: 'button',
            name: 'button',
            component: () => import('@/documentation/Button.vue')
          }
        ]
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

export default router;

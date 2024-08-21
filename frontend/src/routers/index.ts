import { createRouter, createWebHistory } from 'vue-router';
import RedirectHandler from '../components/Redirect.vue';
import Profile from '../components/Profile.vue';
import UserInfo from '../components/UserInfo.vue';
import Login from '../components/Login.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/redirect', component: RedirectHandler },
  { path: '/user-info', component: UserInfo },
  { path: '/profile', component: Profile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
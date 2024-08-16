import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import RedirectHandler from '../components/Redirect.vue';
import Profile from '../components/Profile.vue';
import UserInfo from '../components/UserInfo.vue';

const routes = [
  { path: '/', component: App },
  { path: '/auth/redirect', component: RedirectHandler },
  { path: '/user-info', component: UserInfo },
  { path: '/profile', component: Profile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
import { defineStore } from 'pinia';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  displayName: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as User | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('auth_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    async fetchUserInfo() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`);
        this.user = response.data;
      } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
      }
    },
  },
});
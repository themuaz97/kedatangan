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
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    async fetchUserInfo() {
      try {
        const response = await axios.get('/api/auth/me');
        this.user = response.data;
      } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
      }
    },
    async validateToken(token: string) {
      try {
        // Make a request to your backend to validate the token
        const response = await axios.get('/api/auth/validate', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.valid) {
          this.setToken(token);
          this.user = response.data.user;
        } else {
          this.logout();
        }
      } catch (error) {
        console.error('Error validating token:', error);
        this.logout();
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      delete axios.defaults.headers.common['Authorization'];
    },
  },
});
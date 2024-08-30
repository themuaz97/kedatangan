import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { email: string; username: string; }, // Define your user object structure here
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    async login(email: string, password: string): Promise<boolean> {
      try {
        const response = await fetch('http://localhost:3003/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          this.user = data.user; // Update the user state with the returned user data
          return true;
        } else {
          throw new Error(data.message);
        }
      } catch (error: any) {
        console.error('Login error:', error);
        return false;
      }
    },

    async fetchUser(): Promise<void> {
      try {
        const response = await fetch('http://localhost:3003/api/auth/me', {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }

        const data = await response.json();
        this.user = data; // Update the user state with the fetched user data
      } catch (error: any) {
        console.error('Error fetching user info:', error);
        this.user = null; // Clear user state if fetching failed
      }
    },
  },
});

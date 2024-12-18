import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { email: string; username: string; role_id: number },
    accessToken: null as string | null, // Store the access token
  }),
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    isAdmin: (state) => state.user?.role_id === 1,
  },
  actions: {
    async login(email: string, password: string): Promise<boolean> {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          this.user = data.user; // Update the user state
          this.accessToken = data.accessToken; // Store the access token
          console.log("Logged in user:", this.user);
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
      if (!this.accessToken) {
        console.error('No access token available');
        this.user = null;
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`, // Include the Bearer token in the header
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            console.error('Unauthorized. Token might be invalid or expired.');
          }
          throw new Error('Failed to fetch user info');
        }

        const data = await response.json();
        this.user = data; // Update the user state with the fetched user data
        console.log("Fetched user data:", this.user);
      } catch (error: any) {
        console.error('Error fetching user info:', error);
        this.user = null; // Clear user state if fetching failed
      }
    },
  },
});

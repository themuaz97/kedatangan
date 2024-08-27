<template>
  <div>Authenticating...</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../../stores/auth.store'; // Assuming you're using Pinia for state management

export default defineComponent({
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    onMounted(async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (token) {
        // Store the token
        authStore.setToken(token);

        try {
          // Fetch user info
          await authStore.fetchUserInfo();
          // Redirect to profile or dashboard
          router.push('/profile');
        } catch (error) {
          console.error('Error fetching user info:', error);
          router.push('/login');
        }
      } else {
        console.error('No token received');
        router.push('/login');
      }
    });

    return {};
  },
});
</script>
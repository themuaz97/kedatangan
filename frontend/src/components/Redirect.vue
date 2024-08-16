<script setup lang="ts">
import { onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  
  if (code) {
    try {
      const response = await axios.get(`http://localhost:3003/api/auth/redirect?code=${code}`);
      
      // Store the access token securely
      localStorage.setItem('accessToken', response.data.accessToken);
      
      // Redirect to the /api/auth/me endpoint
      const userInfoResponse = await axios.get('http://localhost:3003/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${response.data.accessToken}`
        }
      });
      
      // Store user info if needed
      localStorage.setItem('userInfo', JSON.stringify(userInfoResponse.data));
      
      // Redirect to a component that displays user info
      router.push('/user-info');
    } catch (error) {
      console.error('Login failed', error);
      router.push('/login-error');
    }
  }
});
</script>
<template>
  <div>Processing login...</div>
</template>
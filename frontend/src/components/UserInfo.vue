<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface User {
  displayName: string;
  email: string;
}

const user = ref<User | null>(null);

const getAccessToken = (): string => {
  return localStorage.getItem('accessToken') || '';
};

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3003/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`
      }
    });
    user.value = response.data;
  } catch (error) {
    console.error('Failed to fetch user info', error);
  }
});
</script>
<template>
  <div v-if="user">
    <h2>Welcome, {{ user.displayName }}</h2>
    <p>Email: {{ user.email }}</p>
  </div>
  <div v-else>Loading user info...</div>
</template>
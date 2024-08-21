<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface User {
  displayName: string;
  email: string;
}

const userInfo = ref<User | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

const fetchUser = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {withCredentials: true});
    userInfo.value = res.data;
    console.log('user info', userInfo.value);
    
  } catch (error: any) {
    console.error('Error fetching user info:', error);
    error.value = 'Failed to fetch user info';
  } finally {
    loading.value = false;
  }
}

const logout = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, { withCredentials: true });
    const { logoutUrl } = response.data;
    
    // Redirect to Microsoft's logout URL
    window.location.href = logoutUrl;
  } catch (err) {
    console.error('Error logging out:', err);
    error.value = 'Failed to log out';
  } finally {
    router.push('/login');
  }
};

onMounted(() => {
  fetchUser();
})
</script>

<template>
  <div><h1>Profile</h1>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="userInfo">
      <p>User Info: {{ userInfo.displayName }}</p>
      <p>Email: {{ userInfo.email }}</p>
    </div>
    <div>
      <button @click="logout" style="margin-top: 10px;">Logout</button>
    </div>
  </div>
</template>
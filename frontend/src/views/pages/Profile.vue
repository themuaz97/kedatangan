<script setup lang="ts">
import { ref, onMounted } from 'vue';
import router from '../../routers';

interface User {
  email: string;
  username: string;
}

const userInfo = ref<User | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

const fetchUser = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
      method: 'GET',
      credentials: 'include', // Include cookies in the request
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }

    const data = await response.json();
    userInfo.value = data;
    console.log('user info', userInfo.value);

  } catch (err: any) {
    console.error('Error fetching user info:', err);
    error.value = 'Failed to fetch user info';
  } finally {
    loading.value = false;
  }
};

const logout = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include', // Include cookies in the request
    });

    if (!response.ok) {
      throw new Error('Failed to logout');
    } else {
      router.push('/login');
    }
  } catch (error: any) {
    console.log('error in logout', error.message);
  }
};

onMounted(() => {
  fetchUser();
});
</script>

<template>
  <div class="flex justify-center flex-col items-center">
    <h1>Profile</h1>
    <div class="flex justify-center items-center" v-if="loading">
      Loading...
    </div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="userInfo">
      <p>Email: {{ userInfo.email }}</p>
      <p>Username: {{ userInfo.username }}</p>
    </div>
    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="logout()" style="margin-top: 10px;">Logout</button>
    <div>
    </div>
  </div>
</template>

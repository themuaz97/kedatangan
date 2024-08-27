<script lang="ts" setup>
import {  onMounted, ref } from 'vue';

export interface User {
  id: string;
  username: string;
  email: string;
}

  const user = ref<User | null>(null);

  const fetchUser = async () => {
    try {
     const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
        method: 'GET',
        credentials: 'include', // Include cookies in the request
     })

      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      } else {
        const data = await response.json();
        user.value = data;
      }
    } catch (error: any) {
      console.error('Error fetching user info:', error);
    }
  }

  onMounted(fetchUser);
</script>
<template>
  <div class="topbar">
    <div>
        <span class="material-symbols-rounded"> menu </span>
    </div>
    <div class="flex justify-end w-screen gap-3">
      <button>
        <span class="material-symbols-rounded"> notifications </span>
      </button>
      <span>{{ user?.username }}</span>
      <button>
        <span class="material-symbols-rounded"> logout </span>
      </button>
    </div>
  </div>
</template>



<style scoped></style>

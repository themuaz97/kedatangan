<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface User {
  displayName: string;
  email: string;
}

const user = ref<User | null>(null);

onMounted(() => {
  const userInfoString = localStorage.getItem('userInfo');
  if (userInfoString) {
    user.value = JSON.parse(userInfoString);
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

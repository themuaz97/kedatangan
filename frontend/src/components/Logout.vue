<template>
  <button @click="logout">Logout</button>
</template>

<script setup lang="ts">
const logout = () => {
  // Clear stored access token
  localStorage.removeItem('accessToken');
  window.location.href = 'http://localhost:3003/api/auth/logout';
};
</script>
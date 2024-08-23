<template>
  <div class="flex items-center justify-center h-screen">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="login">Login with Microsoft</button>
  </div>
</template>

<script setup lang="ts">
const login = () => {
  window.location.href = 'http://localhost:3003/api/auth/login';
};
</script>

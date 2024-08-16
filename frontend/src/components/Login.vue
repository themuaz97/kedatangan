<template>
  <button @click="login">Login with Microsoft</button>
</template>

<script setup lang="ts">
const login = () => {
  window.location.href = 'http://localhost:3003/api/auth/login';
};
</script>
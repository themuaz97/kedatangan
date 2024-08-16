<script setup lang="ts">
import { computed } from 'vue';
import Login from './components/Login.vue';
import UserInfo from './components/UserInfo.vue';
import Logout from './components/Logout.vue';

const isAuthenticated = computed(() => {
  return !!localStorage.getItem('accessToken');
});
</script>

<template>
  <div>
    <h1>My App</h1>
    <template v-if="isAuthenticated">
      <UserInfo />
      <Logout />
    </template>
    <Login v-else />
  </div>
</template>

<style scoped>

</style>

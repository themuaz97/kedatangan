<template>
  <aside :class="['sidebar', { 'sidebar-open': isOpen }]">
    <ul>
      <li><router-link to="/">Dashboard</router-link></li>
      <li><router-link to="/login">Login</router-link></li>
      <li><router-link to="/forgot-password">Forgot Password</router-link></li>
      <li><router-link to="/reset-password">Reset Password</router-link></li>
      <li><router-link to="/profile">Profile</router-link></li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
defineProps<{ isOpen: boolean }>();
</script>

<style scoped>

</style>

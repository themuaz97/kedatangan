<template>
  <div class="auth-layout">
    <main class="auth-content">
      <router-view />
    </main>
    <div class="auth-footer">
      <Footer />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Footer from './Footer.vue';
</script>

<style scoped>
.auth-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.auth-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-footer {
  /* Add any specific styling for the footer in the auth layout */
}
</style>
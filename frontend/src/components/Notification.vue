<template>
  <div v-if="notification" class="notification">
    {{ notification.message }}
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import socket from '../services/socket'; // Import the initialized socket

const notification = ref<{ roleId: number, message: string } | null>(null);

onMounted(() => {
  // Listen for the notification event
  socket.on('notification', (data) => {
    notification.value = data;
  });
});

onUnmounted(() => {
  socket.off('notification'); // Clean up listeners when component is unmounted
});
</script>

<style scoped>
.notification {
  background-color: #f39c12;
  padding: 10px;
  border-radius: 5px;
}
</style>

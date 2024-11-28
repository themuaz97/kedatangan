<!-- TODO nested dropdown sidebar, refer primevue docs. sidebar -> components -> nested link of each components -->
<template>
  <aside :class="['sidebar', { 'sidebar-open': isOpen }]">
    <ul>
      <li><router-link to="/"><span class="pi pi-home mr-2" />Dashboard</router-link></li>
      <li v-if="isAdmin"><router-link to="/configuration"><span class="pi pi-cog mr-2" />Configuration</router-link></li>
      <li><router-link to="/log"><span class="pi pi-cog mr-2" />Logs</router-link></li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useAuthStore } from '../stores/auth.store';

defineProps<{ isOpen: boolean }>();

const authStore = useAuthStore();
const isAdmin = computed(() => authStore.isAdmin);
</script>

<style scoped>

</style>

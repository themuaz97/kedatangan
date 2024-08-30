<template>
  <aside :class="['sidebar', { 'sidebar-open': isOpen }]">
    <ul>
      <li><router-link to="/"><span class="pi pi-home mr-2" />Dashboard</router-link></li>
      <li><router-link to="/configuration"><span class="pi pi-cog mr-2" />Configuration</router-link></li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
defineProps<{ isOpen: boolean }>();
</script>

<style scoped>

</style>

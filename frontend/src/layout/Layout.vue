<template>
  <div class="layout">
    <Topbar @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />
    <div :class="['content', { 'content-shifted': isSidebarOpen }]">
      <Sidebar :isOpen="isSidebarOpen" />
      <main class="main-content">
        <router-view />
      </main>
    </div>
    <div :class="['footer', { 'footer-shifted': isSidebarOpen }]">
      <Footer />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Topbar from './Topbar.vue';
import Sidebar from './Sidebar.vue';
import Footer from './Footer.vue';
import { ref } from 'vue';

const isSidebarOpen = ref(false);
</script>

<style scoped>

</style>

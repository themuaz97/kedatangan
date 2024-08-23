<template>
  <div class="layout">
    <Topbar />
    <div class="content">
      <Sidebar />
      <main class="main-content">
        <router-view />
      </main>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import Topbar from './Topbar.vue';
import Sidebar from './Sidebar.vue';
import Footer from './Footer.vue';
</script>

<style scoped>

</style>

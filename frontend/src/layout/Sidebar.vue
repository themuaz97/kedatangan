<template>
  <aside :class="['sidebar', { 'sidebar-open': isOpen }]">
    <ul>
      <li :class="{ active: isRouteActive('/') }">
        <router-link to="/">
          <span class="pi pi-home mr-2" />Dashboard
        </router-link>
      </li>
      <li v-if="isAdmin" :class="{ active: isRouteActive('/configuration') }">
        <router-link to="/configuration">
          <span class="pi pi-cog mr-2" />Configuration
        </router-link>
      </li>
      <li :class="{ active: isRouteActive('/log') }">
        <router-link to="/log">
          <span class="pi pi-cog mr-2" />Logs
        </router-link>
      </li>
      <!-- Dropdown for nested menu -->
      <li>
        <div class="menu-header" @click="toggleComponentsMenu">
          <span class="pi pi-compass mr-2" />Components
          <span
            :class="[isComponentsMenuOpen ? 'pi pi-chevron-down' : 'pi pi-chevron-up', 'ml-auto']"
          ></span>
        </div>
        <ul v-if="isComponentsMenuOpen" class="nested-menu">
          <li :class="{ active: isRouteActive('/components/button') }">
            <router-link to="/components/button">
              <span />Button
            </router-link>
          </li>
          <li :class="{ active: isRouteActive('/components/checkbox') }">
            <router-link to="/components/checkbox">
              <span />Checkbox
            </router-link>
          </li>
          <li :class="{ active: isRouteActive('/components/radio') }">
            <router-link to="/components/radio">
              <span />Radio
            </router-link>
          </li>
          <li :class="{ active: isRouteActive('/components/switch') }">
            <router-link to="/components/switch">
              <span />Switch
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';

// Props
defineProps<{ isOpen: boolean }>();

// Store
const authStore = useAuthStore();
const isAdmin = computed(() => authStore.isAdmin);

// Local state for nested dropdown
const isComponentsMenuOpen = ref(false);

// Methods
const toggleComponentsMenu = () => {
  isComponentsMenuOpen.value = !isComponentsMenuOpen.value;
};

// Use Vue Router to determine active route
const route = useRoute();
const isRouteActive = (path: string) => route.path === path;
</script>

<style scoped>
/* Highlight active sidebar item */
li.active {
  background-color: #6b21a8; /* Highlight active item */
  color: white;
}
li.active a {
  color: white; /* Keep text white for active item */
}
</style>

<template>
  <aside :class="['sidebar', { 'sidebar-open': isOpen }]">
    <ul>
      <li>
        <router-link to="/">
          <span class="pi pi-home mr-2" />Dashboard
        </router-link>
      </li>
      <li v-if="isAdmin">
        <router-link to="/configuration">
          <span class="pi pi-cog mr-2" />Configuration
        </router-link>
      </li>
      <li>
        <router-link to="/log">
          <span class="pi pi-cog mr-2" />Logs
        </router-link>
      </li>
      <!-- Dropdown for nested menu -->
       <!-- TODO if have sidebar parent, parent shouldn't be hovered only child -->
      <li>
        <div class="menu-header" @click="toggleComponentsMenu">
          <span class="pi pi-compass mr-2" />Components
          <span
            :class="[
              'pi pi-compass',
              isComponentsMenuOpen ? 'pi-chevron-down' : 'pi-chevron-up',
              'ml-auto',
            ]"
          ></span>
        </div>
        <ul v-if="isComponentsMenuOpen" class="nested-menu">
          <li>
            <router-link to="/components/button">
              <span />Button
            </router-link>
          </li>
          <li>
            <router-link to="/components/dropdown">
              <span />Dropdown
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
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
</script>

<style scoped>

</style>

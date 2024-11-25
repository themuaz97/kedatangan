<template>
  <div
    class="card shadow-md overflow-hidden"
    :class="{
      'hover-effect': hoverEffect,
    }"
  >
    <!-- Header -->
    <div v-if="title || subtitle">
      <h3 v-if="title" class="text-lg font-semibold">{{ title }}</h3>
      <p v-if="subtitle" class="text-sm mt-1">{{ subtitle }}</p>
    </div>

    <!-- Slot Content -->
    <div class="py-3">
      <slot />
    </div>

    <!-- Footer -->
    <div v-if="$slots.footer" class="border-t">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  title?: string;
  subtitle?: string;
  hoverEffect?: boolean;
}>();
</script>

<style scoped>

</style>

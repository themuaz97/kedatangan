<template>
  <div>
    <Dropdown
      v-model="selectedOption"
      :options="companies"
      labelKey="name"
      valueKey="id"
      placeholder="Select a company"
    />
    <p>Selected Company: {{ selectedOption }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const companies = ref([
  { id: 1, name: "Company A" },
  { id: 2, name: "Company B" },
  { id: 3, name: "Company C" },
]);

const selectedOption = ref(null);
</script>

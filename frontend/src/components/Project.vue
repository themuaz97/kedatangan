<template>
  <div>
    <button
      v-for="country in countries"
      :key="country.id"
      @click="handleClick(country)"
    >
      {{ country.id === 1 || country.id === 2 ? country.country_name : 'Others' }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const countries = ref([
  { id: 1, country_name: 'Malaysia' },
  { id: 2, country_name: 'Australia' },
  { id: 3, country_name: 'Japan' }, // Example of other country
  { id: 4, country_name: 'Brazil' }  // Example of other country
]);

const handleClick = (country) => {
  console.log(`Clicked on: ${country.country_name}`);
};
</script>

<style>
/* Add styles here if needed */
</style>

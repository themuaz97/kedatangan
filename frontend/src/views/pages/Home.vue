<template>
  <div class="flex justify-center flex-col items-center h-screen datepicker-wrapper">
    <h1>Home</h1>
    <div class="flex flex-row">
      <Button label="button" icon="pi pi-cog" size="small" variant="primary" />
    </div>
    <div>
    <Switch v-model="isChecked" label="Accept Terms and Conditions" />
    <p class="mt-4">Accepted: {{ isChecked }}</p>
    <Radio label="test" name="test" value="test" />
    <div class="p-4">
    <h1 class="mb-4 text-xl font-bold">Reusable Datepicker Example</h1>
    <Datepicker v-model="selectedDate" icon="pi pi-calendar" selectionMode="range" placeholder="Pick a date" />
  </div>
  </div>
  <div class="card flex flex-wrap justify-center gap-4">
    <div class="flex items-center gap-2">
      <Checkbox v-model="pizza" value="Cheese" label="Cheese" />
    </div>
    <div class="flex items-center gap-2">
      <Checkbox v-model="pizza" value="Mushroom" label="Mushroom" />
    </div>
    <div class="flex items-center gap-2">
      <Checkbox v-model="pizza" value="Pepper" label="Pepper" />
    </div>
    <div class="flex items-center gap-2">
      <Checkbox v-model="pizza" value="Onion" label="Onion" />
    </div>
  </div>

  <p class="mt-4">Selected Ingredients: {{ pizza }}</p>
  </div>
  <div>
    <pre>
      <code>
        testing 1 2 3
      </code>
    </pre>
  </div>
</template>
<script setup lang="ts">
import DatePicker from 'primevue/datepicker';
import { ref } from 'vue';

const pizza = ref<string[]>([]);
const isChecked = ref(false);
const selectedDate = ref<Date | null>(null);
</script>

<style scoped></style>
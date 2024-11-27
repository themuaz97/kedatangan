<template>
  <div class="flex justify-center flex-col items-center h-screen datepicker-wrapper">
    <h1>Home</h1>
    <div class="flex flex-row">
      <Button label="button" icon="pi pi-cog" size="small" variant="primary" />
    </div>
    <div>
    <Checkbox v-model="isChecked" label="Accept Terms and Conditions" />
    <p v-if="isChecked">You have accepted the terms.</p>
    <Radio>test</Radio>
    <div class="p-4">
    <h1 class="mb-4 text-xl font-bold">Reusable Datepicker Example</h1>
    <Datepicker v-model="selectedDate" placeholder="Pick a date" />
    <p class="mt-4">{{ selectedDate }}</p>
  </div>
  </div>
  </div>
</template>
<script setup lang="ts">
import DatePicker from 'primevue/datepicker';
import { ref } from 'vue';

const isChecked = ref(false);
const selectedDate = ref<Date | null>(null);
</script>

<style scoped></style>
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

  <div class="p-6">
    <h1 class="text-lg font-bold mb-4">Global Checkbox Component</h1>

    <Checkbox v-model="isChecked" label="Agree to Terms" class="mr-2" />
    <Checkbox v-model="isChecked" label="Agree to Terms" />
    <p class="mt-2">Checkbox is: {{ isChecked ? 'Checked' : 'Unchecked' }}</p>
  </div>

  <div class="p-6">
    <h1 class="text-lg font-bold mb-4">Global Radio Button Component</h1>

    <Radio
      v-model="selectedOptions"
      name="options"
      label="Option 1"
      value="option1"
      class="mr-2 focus:ring-violet-400 text-violet-300"
    />
    <Radio
      v-model="selectedOptions"
      name="options"
      label="Option 2"
      value="option2"
    />
    <Radio
      v-model="selectedOptions"
      name="options"
      label="Option 3"
      value="option3"
    />
    
    <p class="mt-4">Selected Option: {{ selectedOptions }}</p>
  </div>

  <div>
    <Switch v-model="isActive" label="Activate"></Switch>
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

const isChecked = ref(false)

const selectedOptions = ref('option1')

const isActive = ref(false);
</script>

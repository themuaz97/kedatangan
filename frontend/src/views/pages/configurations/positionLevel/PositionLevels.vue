<template>
  <div class="w-full max-w-xs mx-auto">
    <label for="position-level" class="block text-sm font-medium text-gray-300 mb-2">Position Level</label>
    <div class="relative">
      <select 
        id="position-level"
        v-model="selectedPositionLevel"
        class="block appearance-none w-full bg-gray-800 border border-gray-600 text-gray-300 py-2 px-3 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option disabled value="">Select Position Level</option>
        <option value="Junior">Junior</option>
        <option value="Mid">Mid</option>
        <option value="Senior">Senior</option>
        <option value="Lead">Lead</option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.5 8l4 4 4-4h-8z"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedPositionLevel = ref<string>("")
</script>

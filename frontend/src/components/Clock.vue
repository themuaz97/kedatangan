<template>
  <div class="relative inline-block w-full">
    <!-- Input -->
    <input
      type="text"
      readonly
      class="border rounded bg-gray-700 px-3 py-2 cursor-pointer w-full"
      :value="formattedTime"
      @click="toggleDropdown"
    />

    <!-- Dropdown -->
    <div
      v-if="isDropdownOpen"
      class="absolute mt-2 w-full p-4 bg-gray-700 border rounded shadow-lg"
    >
      <!-- Time Picker Row -->
      <div class="flex items-center justify-between space-x-2 mb-4">
        <!-- Hours -->
        <div class="flex flex-col items-center flex-grow">
          <label for="hours" class="font-semibold text-sm mb-1">Hours</label>
          <select
            id="hours"
            class="border rounded bg-gray-800 text-center p-2 w-full"
            v-model="selectedHour"
          >
            <option v-for="hour in 12" :key="hour" :value="hour">
              {{ hour.toString().padStart(2, "0") }}
            </option>
          </select>
        </div>

        <!-- Separator -->
        <span class="text-white text-lg font-bold">:</span>

        <!-- Minutes -->
        <div class="flex flex-col items-center flex-grow">
          <label for="minutes" class="font-semibold text-sm mb-1">Minutes</label>
          <select
            id="minutes"
            class="border rounded bg-gray-800 text-center p-2 w-full"
            v-model="selectedMinute"
          >
            <option v-for="minute in 60" :key="minute" :value="minute - 1">
              {{ (minute - 1).toString().padStart(2, "0") }}
            </option>
          </select>
        </div>

        <!-- Separator -->
        <span class="text-white text-lg font-bold"> </span>

        <!-- AM/PM -->
        <div class="flex flex-col items-center flex-grow">
          <label for="ampm" class="font-semibold text-sm mb-1">AM/PM</label>
          <select
            id="ampm"
            class="border rounded bg-gray-800 text-center p-2 w-full"
            v-model="selectedPeriod"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-between">
        <button
          type="button"
          class="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          @click="resetToCurrentTime"
        >
          Reset
        </button>
        <button
          type="button"
          class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          @click="confirmTime"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ref } from "vue";

// State variables
const isDropdownOpen = ref(false);
const now = new Date();

// Initialize with current time
const selectedHour = ref<number>((now.getHours() % 12) || 12); // 12-hour format
const selectedMinute = ref<number>(now.getMinutes());
const selectedPeriod = ref<string>(now.getHours() >= 12 ? "PM" : "AM");

// Toggle dropdown visibility
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Reset to the current time
const resetToCurrentTime = () => {
  const currentTime = new Date();
  selectedHour.value = (currentTime.getHours() % 12) || 12;
  selectedMinute.value = currentTime.getMinutes();
  selectedPeriod.value = currentTime.getHours() >= 12 ? "PM" : "AM";
};

// Confirm time selection
const confirmTime = () => {
  isDropdownOpen.value = false;
  console.log("Selected Time:", formattedTime.value);
};

// Format time as HH:MM AM/PM
const formattedTime = computed(() => {
  const hour = selectedHour.value.toString().padStart(2, "0");
  const minute = selectedMinute.value.toString().padStart(2, "0");
  return `${hour}:${minute} ${selectedPeriod.value}`;
});
</script>

<style scoped>
/* Optional: Custom styles for responsive design */
</style>

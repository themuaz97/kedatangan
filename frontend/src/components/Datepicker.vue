<template>
  <!-- TODO click outside dropdown, input, can input date, date range  -->
  <div class="relative w-full" ref="datepickerWrapper">
    <input
      type="text"
      class="w-full min-w-[280px] max-w-[480px] px-4 py-2 border bg-gray-700 rounded-lg shadow-sm focus:outline-none focus:border-purple-600 text-ellipsis overflow-hidden whitespace-nowrap"
      :placeholder="placeholder"
      v-model="formattedDate"
      @focus="toggleDatepicker"
      readonly
    />

    <!-- Datepicker dropdown -->
    <div
      v-if="isOpen"
      class="datepicker-dropdown absolute z-10 w-full min-w-[280px] max-w-[480px] p-4 mt-2 bg-gray-700 border rounded-lg shadow-lg"
    >
      <!-- Month navigation -->
      <div class="flex justify-between items-center mb-4">
        <button
          class="text-white hover:text-purple-400"
          @click="changeMonth(-1)"
        >
          &lt;
        </button>
        <span class="text-white font-medium">
          {{ months[currentMonth] }} {{ currentYear }}
        </span>
        <button
          class="text-white hover:text-purple-400"
          @click="changeMonth(1)"
        >
          &gt;
        </button>
      </div>

      <!-- Days of the week -->
      <div class="grid grid-cols-7 gap-2 text-center">
        <div
          v-for="(day, index) in daysOfWeek"
          :key="'day-' + index"
          class="font-medium text-gray-400"
        >
          {{ day }}
        </div>

        <!-- Days -->
        <div
          v-for="(day, index) in daysInMonth"
          :key="'day-' + index"
          :class="[ 
            'p-2 text-sm cursor-pointer rounded',
            day.isCurrentMonth ? 'text-white' : 'text-gray-400 hover:text-white',
            day.isSelected ? 'bg-purple-600 text-white' : 'hover:bg-purple-400'
          ]"
          @click="selectDate(day.date)"
        >
          {{ day.date.getDate() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';

// Props
interface Props {
  modelValue: Date | null;
  placeholder?: string;
}
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

// State
const isOpen = ref(false);
const selectedDate = ref<Date | null>(props.modelValue || null);

// Computed properties
const formattedDate = computed(() =>
  selectedDate.value
    ? selectedDate.value.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : ''
);

// Calendar logic
const today = new Date();
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());
const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const daysInMonth = computed(() => {
  const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1);
  const lastDayOfMonth = new Date(currentYear.value, currentMonth.value + 1, 0);

  const days = [];
  for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
    // Add previous month's trailing days
    days.push({
      date: new Date(currentYear.value, currentMonth.value - 1, -i),
      isCurrentMonth: false,
      isSelected: false,
    });
  }

  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const date = new Date(currentYear.value, currentMonth.value, i);
    days.push({
      date,
      isCurrentMonth: true,
      isSelected: selectedDate.value?.toDateString() === date.toDateString(),
    });
  }

  return days;
});

// Methods
function toggleDatepicker() {
  isOpen.value = !isOpen.value;
}

function selectDate(date: Date) {
  selectedDate.value = date;
  emit('update:modelValue', date);
  isOpen.value = false;
}

function changeMonth(offset: number) {
  currentMonth.value += offset;
  if (currentMonth.value < 0) {
    currentMonth.value = 11;
    currentYear.value -= 1;
  } else if (currentMonth.value > 11) {
    currentMonth.value = 0;
    currentYear.value += 1;
  }
}

// Close datepicker when clicking outside
function handleClickOutside(event: MouseEvent) {
  const wrapper = document.querySelector('.datepicker-wrapper') as HTMLElement;
  const datepicker = document.querySelector('.datepicker-dropdown') as HTMLElement;

  if (wrapper && !wrapper.contains(event.target as Node)) {
    isOpen.value = false;
  }
}

// Watch for external modelValue changes
watch(
  () => props.modelValue,
  (newVal) => {
    selectedDate.value = newVal;
  }
);

// Mount and unmount event listener
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* Add class to identify datepicker wrapper for outside click */
.datepicker-wrapper {
  position: relative;
}
</style>

<template>
  <div class="relative w-full" ref="datepickerWrapper">
    <input
      type="text"
      :class="[
        'px-4 py-2 border bg-gray-700 rounded-lg shadow-sm focus:outline-none focus:border-purple-600 text-ellipsis overflow-hidden whitespace-nowrap',
        inputWidthClass
      ]"
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
            day.isSelected ? 'bg-purple-600 text-white' : '',
            day.isInRange ? 'bg-purple-600 text-white' : 'hover:bg-purple-500'
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

// TODO :add icon, icon positions. Props
interface Props {
  modelValue: Date | { start: Date | null; end: Date | null } | null;
  placeholder?: string;
  selectionMode?: 'single' | 'range';
  icon?: string; // The icon class name (e.g., from FontAwesome, Material Icons, etc.)
  iconPosition?: 'start' | 'end';
}
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

// State
const isOpen = ref(false);
const startDate = ref<Date | null>(null);
const endDate = ref<Date | null>(null);
const selectedDate = ref<Date | null>(null);
const datepickerWrapper = ref<HTMLDivElement | null>(null);

// Default mode
const mode = computed(() => props.selectionMode || 'single');

// Dynamically adjust input width
const inputWidthClass = computed(() =>
  mode.value === 'range'
    ? 'min-w-[310px] max-w-[600px]'
    : 'min-w-[280px] max-w-[480px]'
);

// Computed properties
const formattedDate = computed(() => {
  if (mode.value === 'range') {
    if (startDate.value && endDate.value) {
      return `${startDate.value.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} - ${endDate.value.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
    } else if (startDate.value) {
      return `${startDate.value.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
    }
  } else if (mode.value === 'single' && selectedDate.value) {
    return selectedDate.value.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  return '';
});

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
    days.push({
      date: new Date(currentYear.value, currentMonth.value - 1, -i),
      isCurrentMonth: false,
      isSelected: false,
      isInRange: false,
    });
  }

  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const date = new Date(currentYear.value, currentMonth.value, i);
    const isInRange =
      startDate.value &&
      endDate.value &&
      date >= startDate.value &&
      date <= endDate.value;

    days.push({
      date,
      isCurrentMonth: true,
      isSelected: mode.value === 'range'
        ? date.toDateString() === startDate.value?.toDateString() || date.toDateString() === endDate.value?.toDateString()
        : date.toDateString() === selectedDate.value?.toDateString(),
      isInRange,
    });
  }

  return days;
});

// Methods
function toggleDatepicker() {
  isOpen.value = !isOpen.value;
}

function selectDate(date: Date) {
  if (mode.value === 'single') {
    selectedDate.value = date;
    emit('update:modelValue', date);
    isOpen.value = false;
  } else if (mode.value === 'range') {
    if (!startDate.value || (startDate.value && endDate.value)) {
      startDate.value = date;
      endDate.value = null;
    } else if (date < startDate.value) {
      startDate.value = date;
    } else {
      endDate.value = date;
      emit('update:modelValue', { start: startDate.value, end: endDate.value });
      isOpen.value = false;
    }
  }
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
  const wrapper = datepickerWrapper.value as HTMLElement;
  if (wrapper && !wrapper.contains(event.target as Node)) {
    isOpen.value = false;
  }
}

// Watch for external modelValue changes
watch(
  () => props.modelValue,
  (newVal) => {
    if (mode.value === 'single') {
      selectedDate.value = newVal as Date | null;
    } else if (mode.value === 'range') {
      startDate.value = (newVal as { start: Date | null; end: Date | null })?.start || null;
      endDate.value = (newVal as { start: Date | null; end: Date | null })?.end || null;
    }
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
</style>

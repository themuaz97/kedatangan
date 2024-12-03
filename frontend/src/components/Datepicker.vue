<!-- TODO hourFormat, monthpicker, yearpicker -->
<template>
  <div class="relative w-full" ref="datepickerWrapper">
    <div class="flex items-center relative">
      <!-- Icon (conditionally rendered) -->
      <span
        v-if="icon"
        :class="[
          'absolute text-gray-400 cursor-pointer',
          iconPosition === 'start' ? 'left-3' : 'right-3',
        ]"
        @click="toggleDatepicker"
      >
        <i :class="icon"></i>
      </span>

      <!-- Input field -->
      <input
        type="text"
        :class="[ 
          'px-4 py-2 border bg-gray-700 rounded-lg shadow-sm focus:outline-none focus:border-purple-600 text-ellipsis overflow-hidden whitespace-nowrap',
          inputPaddingClass,
          inputWidthClass
        ]"
        :placeholder="placeholder"
        v-model="formattedDate"
        @focus="toggleDatepicker"
        readonly
      />
    </div>

    <!-- Datepicker dropdown -->
    <div
      v-if="isOpen"
      class="datepicker-dropdown absolute z-10 w-full min-w-[280px] max-w-[480px] p-4 mt-2 bg-gray-700 border rounded-lg shadow-lg"
    >
      <!-- Render Time Picker Only -->
      <div v-if="props.timeOnly" class="time-picker">
        <div class="flex items-center justify-center space-x-4">
          <!-- Hours -->
          <div class="flex flex-col items-center">
            <button
              class="text-gray-400 hover:text-white"
              @click="incrementTime('hours')"
            >
              <i class="pi pi-angle-up" />
            </button>
            <span class="font-medium text-lg">{{ formatNumber(hours) }}</span>
            <button
              class="text-gray-400 hover:text-white"
              @click="decrementTime('hours')"
            >
              <i class="pi pi-angle-down" />
            </button>
          </div>
          <div>:</div>

          <!-- Minutes -->
          <div class="flex flex-col items-center">
            <button
              class="text-gray-400 hover:text-white"
              @click="incrementTime('minutes')"
            >
              <i class="pi pi-angle-up" />
            </button>
            <span class="font-medium text-lg">{{ formatNumber(minutes) }}</span>
            <button
              class="text-gray-400 hover:text-white"
              @click="decrementTime('minutes')"
            >
              <i class="pi pi-angle-down" />
            </button>
          </div>
          <div>:</div>

          <!-- am/pm -->
          <div class="flex flex-col items-center">
            <button
              class="text-gray-400 hover:text-white"
              @click="toggleAmPm"
            >
              <i class="pi pi-angle-up" />
            </button>
            <span class="font-medium text-lg">{{ amPm }}</span>
            <button
              class="text-gray-400 hover:text-white"
              @click="toggleAmPm"
            >
              <i class="pi pi-angle-down" />
            </button>
          </div>
        </div>
      </div>

      <!-- Full Date Picker -->
      <div v-else>
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
              'py-2 text-sm cursor-pointer rounded',
              day.isCurrentMonth ? 'text-white' : 'text-gray-400 hover:text-white',
              day.isSelected ? 'bg-purple-600 text-white' : '',
              day.isInRange ? 'bg-purple-600 text-white' : 'hover:bg-purple-500',
              day.isToday ? 'bg-purple-300 font-bold' : ''
            ]"
            @click="selectDate(day.date)"
          >
            {{ day.date.getDate() }}
          </div>
        </div>

        <!-- Time Picker -->
        <div v-if="props.showTime && !props.timeOnly" class="time-picker mt-4">
          <hr>
          <div class="flex items-center justify-center space-x-4 mt-2">
            <!-- Hours -->
            <div class="flex flex-col items-center">
              <button
                class="text-gray-400 hover:text-white"
                @click="incrementTime('hours')"
              >
                <i class="pi pi-angle-up" />
              </button>
              <span class="font-medium text-lg">{{ formatNumber(hours) }}</span>
              <button
                class="text-gray-400 hover:text-white"
                @click="decrementTime('hours')"
              >
                <i class="pi pi-angle-down" />
              </button>
            </div>
            <div>:</div>

            <!-- Minutes -->
            <div class="flex flex-col items-center">
              <button
                class="text-gray-400 hover:text-white"
                @click="incrementTime('minutes')"
              >
                <i class="pi pi-angle-up" />
              </button>
              <span class="font-medium text-lg">{{ formatNumber(minutes) }}</span>
              <button
                class="text-gray-400 hover:text-white"
                @click="decrementTime('minutes')"
              >
                <i class="pi pi-angle-down" />
              </button>
            </div>
            <div>:</div>

            <!-- am/pm -->
            <div class="flex flex-col items-center">
              <button
                class="text-gray-400 hover:text-white"
                @click="toggleAmPm"
              >
                <i class="pi pi-angle-up" />
              </button>
              <span class="font-medium text-lg">{{ amPm }}</span>
              <button
                class="text-gray-400 hover:text-white"
                @click="toggleAmPm"
              >
                <i class="pi pi-angle-down" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';

// Props
interface Props {
  modelValue: Date | { start: Date | null; end: Date | null } | null;
  placeholder?: string;
  selectionMode?: 'single' | 'range';
  icon?: string; // The icon class name (e.g., from FontAwesome, Material Icons, etc.)
  iconPosition?: 'start' | 'end';
  showTime?: boolean; // enable/disable time picker
  hourFormat?: 12 | 24; // time format (default: 12-hour)
  timeOnly?: boolean; // show only time picker
}
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

// State
const isOpen = ref(false);
const startDate = ref<Date | null>(null);
const endDate = ref<Date | null>(null);
const selectedDate = ref<Date | null>(null);
const datepickerWrapper = ref<HTMLDivElement | null>(null);
const hours = ref(12);
const minutes = ref(0);
const amPm = ref('am');

// Default mode
const mode = computed(() => props.selectionMode || 'single');

// Time formatting
function formatNumber(num: number) {
  return num.toString().padStart(2, '0');
}

// Increment and decrement time
function incrementTime(type: 'hours' | 'minutes') {
  if (type === 'hours') {
    hours.value = hours.value === 12 ? 1 : hours.value + 1;
  } else if (type === 'minutes') {
    minutes.value = (minutes.value + 1) % 60;
  }
}

function decrementTime(type: 'hours' | 'minutes') {
  if (type === 'hours') {
    hours.value = hours.value === 1 ? 12 : hours.value - 1;
  } else if (type === 'minutes') {
    minutes.value = (minutes.value - 1 + 60) % 60;
  }
}

function toggleAmPm() {
  amPm.value = amPm.value === 'am' ? 'pm' : 'am';
}

// Time selection logic
function updateTime() {
  if (selectedDate.value) {
    const hours24 = amPm.value === 'am' ? hours.value % 12 : (hours.value % 12) + 12;
    selectedDate.value.setHours(hours24, minutes.value);
    emit('update:modelValue', selectedDate.value);
  }
}

// Hook into date selection to include time
watch(
  () => selectedDate.value,
  (newDate) => {
    if (newDate && props.showTime) {
      hours.value = newDate.getHours() % 12 || 12;
      minutes.value = newDate.getMinutes();
      amPm.value = newDate.getHours() >= 12 ? 'pm' : 'am';
    }
  }
);

// Dynamically adjust input padding based on icon position
const inputPaddingClass = computed(() => {
  if (!props.icon) return '';
  return props.iconPosition === 'start' ? 'pl-10 pr-4' : 'pl-4 pr-10';
});

// Dynamically adjust input width
const inputWidthClass = computed(() =>
  mode.value === 'range'
    ? 'min-w-[340px] max-w-[600px]'
    : 'min-w-[280px] max-w-[480px]'
);

const formattedDate = computed(() => {
  if (props.timeOnly) {
    // If timeOnly mode is enabled, format and return only the time
    const timeStr = `${formatNumber(hours.value)}:${formatNumber(minutes.value)} ${amPm.value}`;
    return timeStr;
  }

  if (mode.value === 'range') {
    if (startDate.value && endDate.value) {
      return `${startDate.value.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} - ${endDate.value.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
    } else if (startDate.value) {
      return `${startDate.value.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
    }
  } else if (mode.value === 'single' && selectedDate.value) {
    let dateStr = selectedDate.value.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    if (props.showTime) {
      const timeStr = `${formatNumber(hours.value)}:${formatNumber(minutes.value)} ${amPm.value}`;
      dateStr = `${dateStr} ${timeStr}`;
    }
    return dateStr;
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

today.setHours(0, 0, 0, 0); // Normalize today's date for comparison

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
      isToday: false,
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
      isToday: date.getTime() === today.getTime(),
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
    if (props.showTime) {
      // Update the selected time
      updateTime();
    }
    emit('update:modelValue', selectedDate.value);
    // isOpen.value = false;
  } else if (mode.value === 'range') {
    if (!startDate.value || (startDate.value && endDate.value)) {
      startDate.value = date;
      endDate.value = null;
    } else if (date < startDate.value) {
      startDate.value = date;
    } else {
      endDate.value = date;
      if (props.showTime) {
        // Update the time for range end
        updateTime();
      }
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

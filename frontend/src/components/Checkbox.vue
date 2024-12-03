<!-- TODO size, group -->
<template>
  <label
    class="inline-flex items-center space-x-2"
    :class="{ 'opacity-50 cursor-default': disabled }"
  >
    <div class="relative flex items-center">
      <input
        type="checkbox"
        :checked="internalChecked"
        @change="updateValue"
        class="appearance-none w-5 h-5 rounded-sm border-2 border-gray-300 checked:border-purple-600 checked:bg-purple-600 transition-colors duration-300 ease-linear cursor-pointer"
        :class="{ 'opacity-50 cursor-default': disabled, 'border-red-500': invalid }"
        :disabled="disabled"
        :aria-invalid="invalid"
      />
      
      <!-- Custom checkmark icon, visible when checked -->
      <span
        v-if="internalChecked"
        class="absolute inset-0 flex items-center justify-center text-white transition-opacity duration-300 ease-in-out"
      >
        <!-- SVG Checkmark Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </span>
    </div>
    <span class="ml-2">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps<{
  modelValue?: boolean;
  label: string;
  disabled?: boolean;
  invalid?: boolean;
}>();

const emits = defineEmits(['update:modelValue']);

// Internal reactive variable to control checkbox state
const internalChecked = ref(props.modelValue ?? false);

// Watch for external changes to modelValue and sync with internalChecked
watch(() => props.modelValue, (newValue) => {
  if (newValue !== internalChecked.value) {
    internalChecked.value = newValue;
  }
});

// Update the internal state and emit the change
const updateValue = (event: Event) => {
  if (!props.disabled) {
    const checked = (event.target as HTMLInputElement).checked;
    internalChecked.value = checked;
    emits('update:modelValue', checked);
  }
};
</script>

<style scoped>
/* Tailwind CSS will handle the styles */
</style>

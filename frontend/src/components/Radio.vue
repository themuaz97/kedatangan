<template>
  <div
    class="inline-flex items-center space-x-2"
    :class="{ 'opacity-50 cursor-default': disabled }"
  >
    <div class="relative flex items-center">
      <input
        type="radio"
        :name="name"
        :id="inputId"
        :value="value"
        :checked="modelValue === value"
        @change="updateValue"
        class="appearance-none rounded-full border-2 border-gray-300 checked:border-purple-600 checked:bg-purple-600 focus:outline-none transition-colors duration-300 ease-linear cursor-pointer"
        :class="[sizeClass, { 'opacity-50 cursor-default': disabled, 'border-red-500': invalid }]"
        :disabled="disabled"
        :aria-invalid="invalid"
      />
      
      <!-- Custom radio button dot, visible when selected -->
      <span
        v-if="modelValue === value"
        class="absolute bg-purple-600 rounded-full transition-opacity duration-300 ease-in-out"
        :class="dotSizeClass"
      ></span>
    </div>
    <!-- Label -->
    <span :for="inputId">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps<{
  modelValue: string | number | null; // Selected value in the radio group
  value: string | number;            // Value of this radio button
  name: string;                      // Name for the radio group
  inputId: string;                   // Unique ID for the radio button
  label: string;                     // Label text
  disabled?: boolean;                // Disable the radio button
  invalid?: boolean;                 // Mark as invalid (for validation state)
  size?: 'small' | 'medium' | 'large'; // Size of the radio button
}>();

const emits = defineEmits(['update:modelValue']);

// Compute size classes for input and dot based on the size prop
const sizeClass = computed(() => {
  switch (props.size) {
    case 'small':
      return 'w-4 h-4';
    case 'large':
      return 'w-7 h-7';
    default:
      return 'w-5 h-5'; // Default to medium
  }
});

const dotSizeClass = computed(() => {
  switch (props.size) {
    case 'small':
      return 'inset-0.5 w-2 h-2';
    case 'large':
      return 'inset-1 w-5 h-5';
    default:
      return 'inset-1 w-3 h-3'; // Default to medium
  }
});

// Emit the selected value when the radio button is changed
const updateValue = () => {
  if (!props.disabled) {
    emits('update:modelValue', props.value);
  }
};
</script>

<style scoped>
/* Tailwind CSS will handle the styles */
</style>

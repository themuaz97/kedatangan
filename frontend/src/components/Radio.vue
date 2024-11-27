<template>
  <label
    class="inline-flex items-center space-x-2"
    :class="{ 'opacity-50 cursor-default': disabled }"
  >
    <div class="relative flex items-center">
      <input
        type="radio"
        :name="name"
        :value="value"
        :checked="internalChecked"
        @change="updateValue"
        class="appearance-none w-5 h-5 rounded-full border-2 border-gray-300 checked:border-purple-600 checked:bg-purple-600 focus:outline-none transition-colors duration-300 ease-linear cursor-pointer"
        :class="{ 'opacity-50 cursor-default': disabled, 'border-red-500': invalid }"
        :disabled="disabled"
        :aria-invalid="invalid"
      />
      
      <!-- Custom radio button dot, visible when selected -->
      <span
        v-if="internalChecked"
        class="absolute inset-1 flex items-center justify-center bg-purple-600 rounded-full w-3 h-3 transition-opacity duration-300 ease-in-out"
      ></span>
    </div>
    <span class="ml-2">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps<{
  modelValue?: boolean;
  label: string;
  value: string | number; // The value passed to the radio group
  name: string;           // The name attribute of the radio button group
  disabled?: boolean;
  invalid?: boolean;
}>();

const emits = defineEmits(['update:modelValue']);

// Internal reactive variable to control radio button state
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
    emits('update:modelValue', checked ? props.value : null); // Emit value or null to deselect
  }
};
</script>

<style scoped>
/* Tailwind CSS will handle the styles */
</style>

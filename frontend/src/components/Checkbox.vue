<template>
  <label
    class="inline-flex items-center space-x-2"
    :class="{ 'opacity-50 cursor-default': disabled }"
  >
    <div class="relative flex items-center">
      <input
        type="checkbox"
        :checked="isChecked"
        @change="updateValue"
        class="appearance-none rounded-sm border-2 border-gray-300 transition-colors duration-300 ease-linear cursor-pointer"
        :class="[
          sizeClass,
          {
            'opacity-50 cursor-default': disabled,
            'border-red-500': invalid,
            'checked:border-purple-600 checked:bg-purple-600': !disabled,
          },
        ]"
        :disabled="disabled"
        :aria-invalid="invalid"
      />
      
      <!-- Custom checkmark icon, visible when checked -->
      <span
        v-if="isChecked"
        class="absolute inset-0 flex items-center justify-center text-white transition-opacity duration-300 ease-in-out"
      >
        <!-- SVG Checkmark Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          :class="iconSizeClass"
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
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps<{
  modelValue?: string[] | string | boolean;
  value?: string; // Value for individual checkbox in group
  label: string;
  disabled?: boolean;
  invalid?: boolean;
  size?: "small" | "medium" | "large"; // New size prop
}>();

const emits = defineEmits(["update:modelValue"]);

// Default size is "medium"
const sizeClass = computed(() => {
  switch (props.size || "medium") {
    case "small":
      return "w-4 h-4";
    case "large":
      return "w-6 h-6";
    default:
      return "w-5 h-5"; // Medium size
  }
});

const iconSizeClass = computed(() => {
  switch (props.size || "medium") {
    case "small":
      return "w-3 h-3";
    case "large":
      return "w-5 h-5";
    default:
      return "w-4 h-4"; // Medium size
  }
});

// Computed to check if the checkbox is selected in a group or single value
const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.value as string);
  }
  return props.modelValue === true || props.modelValue === props.value;
});

// Emit value changes when the checkbox is toggled
const updateValue = (event: Event) => {
  if (props.disabled) return;

  const checked = (event.target as HTMLInputElement).checked;

  if (Array.isArray(props.modelValue)) {
    // Update array for group of checkboxes
    const updatedValue = checked
      ? [...props.modelValue, props.value]
      : props.modelValue.filter((v) => v !== props.value);

    emits("update:modelValue", updatedValue);
  } else {
    // Update single checkbox state
    emits("update:modelValue", checked ? props.value : false);
  }
};
</script>

<style scoped>
/* Tailwind CSS will handle the styles */
</style>

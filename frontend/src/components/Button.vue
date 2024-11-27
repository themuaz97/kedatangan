<script setup lang="ts">
import { computed, useSlots } from 'vue';

// Define allowed sizes
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonVariant = 'primary' | 'secondary';

// Define props for the button
const props = defineProps({
  label: { type: String, default: '' }, // Button text
  icon: { type: String, default: '' }, // Icon class (e.g., FontAwesome or Heroicons)
  loading: { type: Boolean, default: false }, // Loading state
  disabled: { type: Boolean, default: false }, // Disabled state
  rounded: { type: Boolean, default: false }, // Rounded style
  variant: { type: String as () => ButtonVariant, default: 'primary' }, // Variant
  size: { type: String as () => ButtonSize, default: 'md' }, // Size
});

// Access default slot content
const slots = useSlots();

// Computed class names for button styling
const buttonClass = computed(() => {
  const baseClass = 'inline-flex items-center justify-center font-medium transition focus:outline-none';
  const sizeClass: Record<ButtonSize, string> = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-5 py-3 text-lg',
  };
  const variantClass: Record<ButtonVariant, string> = {
    primary: 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-600 disabled:bg-blue-300',
    secondary: 'bg-gray-500 text-white hover:bg-gray-700 focus:ring-gray-500 disabled:bg-gray-300',
  };
  const roundedClass = props.rounded ? 'rounded-full' : 'rounded-md';
  const stateClass = props.disabled || props.loading ? 'opacity-50 cursor-not-allowed' : '';

  return `${baseClass} ${sizeClass[props.size]} ${variantClass[props.variant]} ${roundedClass} ${stateClass}`;
});
</script>

<template>
  <button :class="buttonClass" :disabled="props.disabled || props.loading">
    <!-- Loading spinner -->
    <template v-if="props.loading">
      <svg
        class="animate-spin h-5 w-5 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
    </template>

    <!-- Icon -->
    <template v-if="props.icon && !slots.default">
      <i :class="props.icon" class="text-xl"></i>
    </template>

    <!-- Icon with slot or label -->
    <template v-else-if="props.icon">
      <i :class="props.icon" class="text-xl mr-2"></i>
      <slot>{{ props.label }}</slot>
    </template>

    <!-- Label or slot content -->
    <template v-else>
      <slot>{{ props.label }}</slot>
    </template>
  </button>
</template>

<style scoped>
/* Add custom styles if needed */
</style>

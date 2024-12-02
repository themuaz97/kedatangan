<script setup lang="ts">
import { computed, useSlots } from 'vue';

// Define allowed sizes and variants
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info';
type IconPosition = 'left' | 'right';

// Define props for the button
const props = defineProps({
  label: { type: String, default: '' }, // Button text
  icon: { type: String, default: '' }, // Icon class (e.g., FontAwesome or Heroicons)
  iconPosition: { type: String as () => IconPosition, default: 'left' }, // Icon position
  loading: { type: Boolean, default: false }, // Loading state
  disabled: { type: Boolean, default: false }, // Disabled state
  rounded: { type: Boolean, default: false }, // Rounded style
  variant: { type: String as () => ButtonVariant, default: 'primary' }, // Variant
  size: { type: String as () => ButtonSize, default: 'medium' }, // Size
  outlined: { type: Boolean, default: false }, // outlined style
  badge: { type: [Number, String], default: '' }, // Badge count
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
    primary: props.outlined
      ? 'border border-purple-600 text-purple-600 hover:bg-purple-50 focus:ring-purple-600 disabled:border-purple-300 disabled:text-purple-300'
      : 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-600 disabled:bg-purple-300',
    secondary: props.outlined
      ? 'border border-gray-500 text-gray-500 hover:bg-gray-50 focus:ring-gray-500 disabled:border-gray-300 disabled:text-gray-300'
      : 'bg-gray-500 text-white hover:bg-gray-700 focus:ring-gray-500 disabled:bg-gray-300',
    danger: props.outlined
      ? 'border border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-600 disabled:border-red-300 disabled:text-red-300'
      : 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 disabled:bg-red-300',
    success: props.outlined
      ? 'border border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-600 disabled:border-green-300 disabled:text-green-300'
      : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-600 disabled:bg-green-300',
    warning: props.outlined
      ? 'border border-yellow-500 text-yellow-500 hover:bg-yellow-50 focus:ring-yellow-500 disabled:border-yellow-300 disabled:text-yellow-300'
      : 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500 disabled:bg-yellow-300',
    info: props.outlined
      ? 'border border-blue-500 text-blue-500 hover:bg-blue-50 focus:ring-blue-500 disabled:border-blue-300 disabled:text-blue-300'
      : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 disabled:bg-blue-300',
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

    <!-- Icon at the left -->
    <template v-if="props.icon && props.iconPosition === 'left'">
      <i :class="[props.icon, 'text-lg',props.label ? 'mr-2' : '']"></i>
    </template>

    <!-- Label or slot content -->
    <slot>{{ props.label }}</slot>

    <!-- Icon at the right -->
    <template v-if="props.icon && props.iconPosition === 'right'">
      <i :class="props.icon" class="text-xl ml-2"></i>
    </template>

    <!-- Badge -->
    <template v-if="props.badge">
      <span
        class="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-black rounded-full"
      >
        {{ props.badge }}
      </span>
    </template>
  </button>
</template>

<style scoped>
button > span {
  position: relative;
  top: 1.5px;
}
</style>

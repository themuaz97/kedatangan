<template>
  <label
    class="inline-flex items-center cursor-pointer"
    :class="{ 'opacity-50 cursor-default': disabled }"
  >
    <span class="mr-2">{{ label }}</span>
    <div class="relative">
      <input
        type="checkbox"
        :checked="modelValue"
        @change="toggle"
        class="sr-only peer"
        :disabled="disabled"
        :invalid="invalid"
      />
      <div
        :class="[
          'w-10 h-6 rounded-full transition-all bg-gray-500 hover:bg-gray-600',
          disabled
            ? 'bg-gray-200 peer-focus:ring-0 cursor-default'
            : 'bg-gray-300 peer-focus:ring-2 peer-focus:ring-purple-500 peer-checked:bg-purple-500',
          invalid ? 'bg-red-500 hover:bg-red-600' : ''
        ]"
      ></div>
      <div
        :class="[
          'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full border transition-all',
          disabled
            ? 'border-gray-400 cursor-default'
            : 'peer-checked:translate-x-4 peer-checked:border-purple-500 border-gray-300',
          invalid ? 'border-red-500' : ''
        ]"
      ></div>
    </div>
  </label>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  modelValue: boolean;
  label?: string;
  disabled?: boolean;
  invalid?: boolean;
}>();

const emits = defineEmits(['update:modelValue']);

const toggle = (event: Event) => {
  if (!props.disabled) {
    const checked = (event.target as HTMLInputElement).checked;
    emits('update:modelValue', checked);
  }
};
</script>

<style scoped>
/* Custom styles, Tailwind handles most */
</style>

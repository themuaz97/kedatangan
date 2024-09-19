<template>
  <label class="inline-flex items-center space-x-2">
    <div class="relative flex items-center">
      <input
        type="checkbox"
        :checked="modelValue"
        @change="updateValue"
        class="appearance-none w-5 h-5 rounded-sm border-2 border-gray-300 checked:border-purple-500 checked:bg-purple-500 focus:outline-none transition-colors duration-300 ease-linear cursor-pointer"
      />
      <span
        v-if="modelValue"
        class="absolute inset-0 flex items-center justify-center text-white transition-opacity duration-300 ease-in-out"
      >
        &#10003;
      </span>
    </div>
    <span class="ml-2">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modelValue: boolean
  label: string
}>()

const emits = defineEmits(['update:modelValue'])

const updateValue = (event: Event) => {
  const checked = (event.target as HTMLInputElement).checked
  emits('update:modelValue', checked)
}
</script>

<style scoped>
/* Tailwind CSS will handle the styles */
</style>

<template>
  <label class="inline-flex items-center space-x-2">
    <input
      type="radio"
      :name="name"
      :value="value"
      :checked="modelValue === value"
      @change="updateValue"
      class="appearance-none w-5 h-5 rounded-full border-2 border-gray-300 checked:border-purple-500 checked:bg-purple-500 focus:outline-none cursor-pointer transition-colors duration-200 ease-linear"
    />
    <span>{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modelValue: string | number
  label: string
  name: string
  value: string | number
}>()

const emits = defineEmits(['update:modelValue'])

const updateValue = () => {
  emits('update:modelValue', props.value)
}
</script>

<style scoped>
/* Tailwind CSS will handle the styles */
</style>

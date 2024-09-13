<template>
  <!-- Modal background -->
  <transition name="fade" appear>
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
      @click.self="closeModal"
    >
      <!-- Modal content -->
      <transition name="modal" appear>
        <div
          class="bg-gray-800 p-5 rounded-lg shadow-lg max-w-lg w-full"
          v-if="isOpen"
        >
        <div class="flex justify-end">
          
        </div>
          <!-- Header Slot -->
          <div class="flex justify-between items-center mb-4">
            <slot name="header">
              <h3 class="text-xl font-semibold">{{ title }}</h3>
            </slot>
            <button @click="closeModal" class="text-gray-500 hover:bg-gray-700 px-2 rounded-lg">
              X
            </button>
          </div>

          <!-- Body Slot -->
          <div class="modal-body mb-4">
            <slot>
              <p>This is a default modal body.</p>
            </slot>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  isOpen: boolean;
  title: string;
}>();

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>
<style scoped>

</style>
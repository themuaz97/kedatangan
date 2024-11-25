<template>
  <div class="tabs">
    <!-- Tab Headers -->
    <div class="tab-headers flex space-x-4 border-b border-gray-300">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.name"
        class="tab-header px-4 py-2 focus:outline-none transition-all"
        :class="{
          'text-blue-500 border-b-2 border-blue-500': activeTab === index,
          'text-gray-500': activeTab !== index,
        }"
        @click="selectTab(index)"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab Content -->
    <div class="tab-content mt-4">
      <slot :activeTab="activeTab" :tabs="tabs">
        <div v-for="(tab, index) in tabs" :key="tab.name" v-show="activeTab === index">
          <component :is="tab.component" />
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';

type Tab = {
  name: string;
  label: string;
  component: any; // You can specify specific types if you know the components in advance
};

defineProps<{
  tabs: Tab[];
  defaultTab?: number;
}>();

const activeTab = ref(defaultTab ?? 0);

const selectTab = (index: number) => {
  activeTab.value = index;
};
</script>

<style scoped>
.tab-header {
  cursor: pointer;
}
</style>

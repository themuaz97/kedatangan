<template>
  <div class="relative inline-block w-full" ref="dropdown">
    <button
      type="button"
      @click="toggleDropdown"
      :disabled="disabled"
      class="w-full bg-gray-700 p-2 rounded-lg flex justify-between items-center "
    >
      <span>{{ selectedLabel || placeholder }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M5.292 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <transition name="dropdown">
      <div
        v-if="isOpen"
        class="absolute mt-1 w-full bg-gray-800 border border-gray-300 focus:ring-gray-300 rounded-lg shadow-lg z-10"
      >
        <ul>
          <li
            v-for="(option, index) in options"
            :key="index"
            @click="selectOption(option)"
            class="p-2 hover:bg-gray-900 cursor-pointer"
          >
            {{ option[labelKey] }}
          </li>
          <li v-if="!options.length" class="p-2 text-gray-500 text-sm">
            No options available
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: [String, Number, Object],
    default: null,
  },
  labelKey: {
    type: String,
    default: "label",
  },
  valueKey: {
    type: String,
    default: "value",
  },
  placeholder: {
    type: String,
    default: "Select an option",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const selectedLabel = ref("");
const dropdown = ref(null);

const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value;
  }
};

const selectOption = (option) => {
  emit("update:modelValue", option[props.valueKey]);
  selectedLabel.value = option[props.labelKey];
  isOpen.value = false;
};

// Handle clicks outside of the dropdown
const handleClickOutside = (event) => {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    isOpen.value = false;
  }
};

// Watch for clicks outside of the component
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  const selectedOption = props.options.find(
    (option) => option[props.valueKey] === props.modelValue
  );
  if (selectedOption) {
    selectedLabel.value = selectedOption[props.labelKey];
  }
});

// Remove the event listener when the component is unmounted
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

watch(
  () => props.modelValue,
  (newValue) => {
    const selectedOption = props.options.find(
      (option) => option[props.valueKey] === newValue
    );
    if (selectedOption) {
      selectedLabel.value = selectedOption[props.labelKey];
    } else {
      selectedLabel.value = "";
    }
  },
  { immediate: true }
);
</script>

<style scoped>
/* Transition for dropdown effect */
.dropdown-enter-active, .dropdown-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.dropdown-enter, .dropdown-leave-to /* .dropdown-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: scaleY(0.9);
  transform-origin: top;
}
</style>

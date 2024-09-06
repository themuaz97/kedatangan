<template>
  <div class="overflow-x-auto rounded-xl">
    <table
      class="min-w-full divide-y divide-gray-600 table-auto bg-gray-800"
    >
      <thead class="bg-gray-700 rounded-lg">
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-left text-md font-medium text-gray-300 tracking-wider"
          >
            No
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-md font-medium text-gray-300 tracking-wider"
          >
            Name
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-md font-medium text-gray-300 tracking-wider"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody class="bg-gray-800 divide-y divide-gray-600">
        <tr
          v-for="(department, index) in departments"
          :key="department.id"
          class="hover:bg-gray-700"
        >
          <td
            class="px-6 py-4 whitespace-nowrap text-md font-medium text-white w-2"
          >
            {{ index + 1 }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-md text-gray-300 w-18">
            {{ department.name }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-md font-medium w-24">
            <!-- Edit Button -->
            <button
              @click="editDepartment(department)"
              class="bg-indigo-500 hover:bg-indigo-400 p-3 rounded-full transition-colors duration-300 pi pi-pencil"
            ></button>

            <!-- Delete Button -->
            <button
              @click="deleteDepartment(department.id)"
              class="ml-4 bg-red-500 hover:bg-red-400 p-3 rounded-full transition-colors duration-300 pi pi-trash"
            ></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Define the departments data
interface Department {
  id: number;
  name: string;
}

// Sample data for departments
const departments = ref<Department[]>([
  { id: 1, name: "HR" },
  { id: 2, name: "Finance" },
  { id: 3, name: "IT" },
  { id: 4, name: "Marketing" },
]);

// Action handlers
const editDepartment = (department: Department) => {
  alert(`Edit department: ${department.name}`);
};

const deleteDepartment = (id: number) => {
  const confirmation = confirm(
    "Are you sure you want to delete this department?"
  );
  if (confirmation) {
    departments.value = departments.value.filter((d) => d.id !== id);
  }
};
</script>

<style scoped>
/* Optional additional styling */
</style>

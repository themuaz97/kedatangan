<template>
  <div class="flex justify-end p-3 pr-0">
    <button
      @click="openModalAdd"
      class="btn bg-indigo-500 hover:bg-indigo-400 p-2 rounded-xl transition-colors duration-300"
    >
      Add Department
    </button>
  </div>
  <Modal :isOpen="isOpen" title="Add Department" @close="openModalAdd">
    <template #default>
      <form @submit.prevent="BtnAddSaveDepartment">
        <div class="mb-4">
          <label for="departmentName" class="block text-md mb-2"
            >Department Name :</label
          >
          <input
            type="text"
            id="departmentName"
            v-model="departmentName"
            class="bg-gray-700 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            :class="{
              'border-red-500': submitted && !departmentName,
              'border-gray-600': !(submitted && !departmentName),
            }"
            placeholder="Enter Department Name"
          />
          <small
            v-if="submitted && !departmentName"
            class="text-red-500 text-xs italic"
            >Department Name is required.</small
          >
        </div>
        <div class="mb-4">
          <label
            for="companyId"
            class="block text-sm font-bold mb-2 text-gray-200"
          >
            Company
          </label>
          <div>
            <select
              v-model="companyId"
              id="companyId"
              class="bg-gray-700 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              :class="{
                'border-red-500': submitted && !companyId,
                'border-gray-600': !(submitted && !companyId),
              }"
              placeholder="Select a company"
            >
              <option value="" disabled>Select a company</option>
              <option
                v-for="company in companies"
                :key="company.id"
                :value="company.id"
              >
                {{ company.name }}
              </option>
            </select>
          </div>
          <small
            v-if="submitted && !companyId"
            class="text-red-500 text-xs italic mt-1 block"
          >
            Company is required.
          </small>
        </div>
        <div class="flex justify-end gap-2">
          <button type="button" @click="openModalAdd" class="bg-white text-black hover:bg-slate-500 hover:text-white p-2 px-4 rounded-lg transition-colors duration-300">Cancel</button>
          <button 
          type="submit" 
          class="bg-indigo-500 hover:bg-indigo-400 p-2 px-4 rounded-lg transition-colors duration-300"
          >Save</button>
        </div>
      </form>
    </template>
  </Modal>
  <div class="overflow-x-auto rounded-xl">
    <!-- Table -->
    <table class="min-w-full divide-y divide-gray-600 table-auto bg-gray-800">
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
            Company
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
          <td class="px-6 py-4 whitespace-nowrap text-md text-gray-300 w-18">
            {{ department.companies.name }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-md font-medium w-24">
            <!-- Edit Button -->
            <button
              @click="openModalEdit(department)"
              class="bg-indigo-500 hover:bg-indigo-400 p-3 rounded-full transition-colors duration-300 pi pi-pencil"
            ></button>

            <!-- Edit Modal Button -->
            <TransitionRoot appear :show="isOpenEdit" as="template">
              <Dialog
                as="div"
                @close="openModalEdit(department)"
                class="relative z-10"
              >
                <TransitionChild
                  as="template"
                  enter="duration-300 ease-out"
                  enter-from="opacity-0"
                  enter-to="opacity-100"
                  leave="duration-200 ease-in"
                  leave-from="opacity-100"
                  leave-to="opacity-0"
                >
                  <div class="fixed inset-0 bg-black/25" />
                </TransitionChild>

                <div class="fixed inset-0 overflow-y-auto">
                  <div
                    class="flex min-h-full items-center justify-center p-4 text-center"
                  >
                    <TransitionChild
                      as="template"
                      enter="duration-300 ease-out"
                      enter-from="opacity-0 scale-95"
                      enter-to="opacity-100 scale-100"
                      leave="duration-200 ease-in"
                      leave-from="opacity-100 scale-100"
                      leave-to="opacity-0 scale-95"
                    >
                      <DialogPanel
                        class="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-900 p-6 text-left align-middle shadow-xl transition-all"
                      >
                        <DialogTitle
                          as="h3"
                          class="text-lg font-medium leading-6"
                        >
                          Edit Department
                        </DialogTitle>
                        <div class="mt-2 flex flex-col">
                          <form
                            @submit.prevent="BtnEditSaveDepartment(department)"
                          >
                            <div class="mb-4">
                              <label
                                class="block text-sm font-bold mb-2"
                                for="departmentName"
                              >
                                Department Name
                              </label>
                              <input
                                v-model="editDepartmentName"
                                :class="[
                                  'bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
                                  {
                                    'border-red-500':
                                      submitted && !editDepartmentName,
                                    'border-gray-300 dark:border-gray-600': !(
                                      submitted && !editDepartmentName
                                    ),
                                  },
                                ]"
                                id="departmentName"
                                type="text"
                                placeholder="Department Name"
                              />
                              <small
                                v-if="submitted && !editDepartmentName"
                                class="text-red-500 text-xs italic"
                                >Department Name is required.</small
                              >
                            </div>
                            <div class="mb-4">
                              <label
                                for="companyId"
                                class="block text-sm font-bold mb-2 text-gray-200"
                              >
                                Company
                              </label>
                              <div class="">
                                <select
                                  v-model="editCompanyId"
                                  id="companyId"
                                  class="bg-gray-700 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                  :class="{
                                    'border-red-500':
                                      submitted && !editCompanyId,
                                    'border-gray-600': !(
                                      submitted && !editCompanyId
                                    ),
                                  }"
                                >
                                  <option value="" disabled>
                                    Select a company
                                  </option>
                                  <option
                                    v-for="company in companies"
                                    :key="company.id"
                                    :value="company.id"
                                  >
                                    {{ company.name }}
                                  </option>
                                </select>
                              </div>
                              <small
                                v-if="submitted && !editCompanyId"
                                class="text-red-500 text-xs italic mt-1 block"
                              >
                                Company is required.
                              </small>
                            </div>
                            <div class="flex justify-center gap-3">
                              <button
                                type="button"
                                class="py-2 px-4 bg-gray-500 hover:bg-gray-400 transition-colors duration-300 rounded"
                                @click="isOpenEdit = false"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                class="'py-2 px-4 rounded bg-violet-500 hover:bg-violet-400 transition-colors duration-300"
                              >
                                Save
                              </button>
                            </div>
                          </form>
                        </div>
                      </DialogPanel>
                    </TransitionChild>
                  </div>
                </div>
              </Dialog>
            </TransitionRoot>

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
import { useToast } from "primevue/usetoast";
import { computed, onMounted, ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const toast = useToast();
const isOpen = ref(false);
const isOpenEdit = ref(false);
const submitted = ref(false);

const companies = ref<Company[]>([]);
const departments = ref<Department[]>([]);
const dept = ref<Department | null>(null);

const departmentName = ref("");
const companyId = ref();
const editDepartmentName = ref("");
const editCompanyId = ref();

const openModalAdd = () => {
  isOpen.value = !isOpen.value;
};

const isFormChanged = computed(() => {
  return (
    departmentName.value !== dept.value?.name ||
    companyId.value !== dept.value?.companies.id
  );
});

const isFormEditChanged = computed(() => {
  return (
    editDepartmentName.value !== dept.value?.name ||
    editCompanyId.value !== dept.value?.companies.id
  );
});

const fetchDepartments = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/departments`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Failed to fetch departments",
        life: 3000,
      });
    } else {
      const data = await response.json();
      departments.value = data;
      console.log("departments", data);

      departments.value = data.map((company: any, index: number) => ({
        ...company,
        index: index + 1, // Add 1 to index to make it 1-based
      }));
    }
  } catch (error: any) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error,
      life: 3000,
    });
  }
};

const fetchCompanies = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/companies`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Failed to fetch companies",
        life: 3000,
      });
    } else {
      const data = await response.json();
      companies.value = data;
    }
  } catch (error: any) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error,
      life: 3000,
    });
  }
};

const BtnAddSaveDepartment = async () => {
  submitted.value = true;

  if (!departmentName.value || !companyId.value) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Please fill out all required fields",
      life: 3000,
    });
    return;
  }
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/department/add`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: departmentName.value,
          companyId: companyId.value,
        }),
      }
    );

    if (!response.ok) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Failed to add department",
        life: 3000,
      });
    } else {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Department added successfully",
        life: 3000,
      });
      departmentName.value = "";
      companyId.value = "";
      submitted.value = false;
      fetchDepartments();
      isOpen.value = false;
    }
  } catch (error: any) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error,
      life: 3000,
    });
  }
};

const openModalEdit = async (department: Department) => {
  try {
    isOpenEdit.value = !isOpenEdit.value;
    dept.value = department;
    editDepartmentName.value = department.name;
    editCompanyId.value = department.company_id;
    isOpenEdit.value = true;
  } catch (error: any) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error,
      life: 3000,
    });
  }
};

const BtnEditSaveDepartment = async (department: Department) => {
  submitted.value = true;
  console.log("department", department.id);

  if (!editDepartmentName.value || !editCompanyId.value) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Please fill out all required fields",
      life: 3000,
    });
    return;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/department/${department.id}/update`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editDepartmentName.value,
          companyId: editCompanyId.value,
        }),
      }
    );

    if (!response.ok) {
      const { error } = await response.json();
      toast.add({
        severity: "error",
        summary: "Error",
        detail: error,
        life: 3000,
      });
    } else {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Department updated",
        life: 3000,
      });
      // editDepartmentName.value = "";
      // editCompanyId.value = "";
      isOpenEdit.value = false;
      fetchDepartments();
    }
  } catch (error: any) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error,
      life: 3000,
    });
  }
};

const deleteDepartment = (id: number) => {
  const confirmation = confirm(
    "Are you sure you want to delete this department?"
  );
  if (confirmation) {
    departments.value = departments.value.filter((d) => d.id !== id);
  }
};

onMounted(() => {
  fetchDepartments();
  fetchCompanies();
});
</script>

<style scoped>
/* Optional additional styling */
</style>

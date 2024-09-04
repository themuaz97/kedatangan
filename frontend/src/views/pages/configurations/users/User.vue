<template>
  <div class="card">
    <div class="flex justify-end mb-5">
      <Button label="Add Role" icon="pi pi-plus" @click="openAddDialog = true" v-tooltip.top="'add role'" />
    </div>
    <Dialog
        v-model:visible="openAddDialog"
        modal
        header="Add Role"
        class="w-1/4"
      >
        <div class="flex flex-col gap-3 mb-3">
          <label for="RoleAdd" class="font-semibold w-full">Role</label>
          <InputText
            v-model="addRole"
            id="addRole"
            class="flex-auto"
            autocomplete="off"
          />
          <small v-if="addRoleError" class="p-error">Role is required!</small>
        </div>
        <div class="flex justify-end gap-2">
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="openAddDialog = false"
          />
          <Button type="button" label="Save" @click="BtnRoleAdd" />
        </div>
      </Dialog>

    <DataTable :value="roles" tableStyle="min-width: 50rem">
      <Column field="index" header="No" class="w-2"></Column>
      <Column field="role_name" header="Name" class="w-18"></Column>
      <Column field="action" header="Action" class="w-6">
        <template #body="{ data }">
          <div class="flex justify-center">
            <Button
              icon="pi pi-pencil"
              class="mr-2"
              severity="primary"
              v-tooltip.top="'edit'"
              @click="openEditDialog(data)"
              rounded
            />
            <Dialog
              v-model:visible="BtnRoleEdit"
              modal
              header="Edit Role"
              class="w-1/4"
            >
              <div class="flex flex-col gap-3 mb-3">
                <label for="RoleEdit" class="font-semibold w-full">Role</label>
                <InputText
                  v-model="editRole"
                  id="editRole"
                  class="flex-auto"
                  autocomplete="off"
                />
                <small v-if="editRoleError" class="p-error"
                  >Role is required!</small
                >
              </div>
              <div class="flex justify-end gap-2">
                <Button
                  type="button"
                  label="Cancel"
                  severity="secondary"
                  @click="BtnRoleEdit = false"
                ></Button>
                <Button
                  type="button"
                  label="Save"
                  @click="BtnRoleEditSave"
                ></Button>
              </div>
            </Dialog>
            <Button
              @click="BtnRoleDelete($event, data)"
              icon="pi pi-trash"
              severity="danger"
              v-tooltip.top="'delete'"
              rounded
            ></Button>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { ref, onMounted } from "vue";

const toast = useToast();
const confirm = useConfirm();

const roles = ref([]);
const selectedRole = ref<{ id: number }>({ id: 0 });

const openAddDialog = ref(false);
const addRole = ref("");
const addRoleError = ref(false);
const editRole = ref("");
const editRoleError = ref(false);
const BtnRoleEdit = ref(false);

const BtnRoleAdd = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/roles/add`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: addRole.value,
      }),
    });

    if (!response.ok) {
      const { error } = await response.json();
      toast.add({ severity: "error", summary: "Error", detail: error, life: 3000 });
    } else {
      toast.add({ severity: "success", summary: "Success", detail: "Role added", life: 3000 });
      openAddDialog.value = false;
      addRole.value = "";
      fetchRoles();
    }
  } catch (error: any) {
    toast.add({ severity: "error", summary: "Error", detail: error, life: 3000 });
  }
}

const openEditDialog = async (role: { id: number; role_name: string }) => {
  // console.log("role", role.id);
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/roles/${role.id}/view`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to fetch role",
      life: 3000,
    });
  } else {
    selectedRole.value = role;
    editRole.value = role.role_name;
    BtnRoleEdit.value = true;
  }
};

const BtnRoleEditSave = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/roles/${selectedRole.value.id}/update`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roleName: editRole.value,
      }),
    }
  );

  if (!response.ok) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to update role",
      life: 3000,
    });
  } else {
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Role updated successfully",
      life: 3000,
    });
    BtnRoleEdit.value = false;
    fetchRoles();
  }
};

const BtnRoleDelete = async (event: any, role: { id: number }) => {
  confirm.require({
    target: event.currentTarget,
    message: "Do you want to delete this role?",
    icon: "pi pi-info-circle",
    rejectClass: "p-button-secondary p-button-outlined p-button-sm",
    acceptClass: "p-button-danger p-button-sm",
    rejectLabel: "Cancel",
    acceptLabel: "Delete",
    accept: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/roles/${role.id}/delete`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      if (!response.ok) {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Failed to delete role",
          life: 3000,
        });
      } else {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Role deleted successfully",
          life: 3000,
        });
        fetchRoles();
      }
    },
  });
};

const fetchRoles = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/roles`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Failed to fetch roles",
        life: 3000,
      });
    } else {
      const data = await response.json();
      roles.value = data;
      console.log("roles", data);

      roles.value = data.map((role: any, index: number) => ({
        ...role,
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

onMounted(() => {
  fetchRoles();
});
</script>

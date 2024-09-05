<template>
  <div class="card">
    <div class="flex justify-end mb-5">
      <Button label="Add Company" icon="pi pi-plus" @click="openAddDialog = true" v-tooltip.top="'add company'" />
    </div>
    <Dialog
        v-model:visible="openAddDialog"
        modal
        header="Add Company"
        class="w-1/4"
      >
        <div class="flex flex-col gap-3 mb-3">
          <label for="CompanyAdd" class="font-semibold w-full">Name</label>
          <InputText
            v-model="companyName"
            id="companyName"
            class="flex-auto"
            autocomplete="off"
            :invalid="companyName === ''"
          />
          <small v-if="companyNameError" class="text-red-500">Company Name is required!</small>
        </div>
        <div class="flex flex-col gap-3 mb-3">
          <label for="companyEmail" class="font-semibold w-full">Email</label>
          <InputText
            v-model="companyEmail"
            id="companyEmail"
            class="flex-auto"
            autocomplete="off"
          />
          <small v-if="companyEmailError" class="text-red-500">Company Email is required!</small>
        </div>
        <div class="flex flex-col gap-3 mb-3">
          <label for="companyPhone" class="font-semibold w-full">Phone No</label>
          <InputText
            v-model="companyPhone"
            id="companyPhone"
            class="flex-auto"
            autocomplete="off"
          />
          <small v-if="companyPhoneError" class="text-red-500">Company Phone No is required!</small>
        </div>
        <div class="flex flex-col gap-3 mb-3">
          <label for="companyAddress" class="font-semibold w-full">Address</label>
          <Textarea
            v-model="companyAddress"
            id="companyAddress"
            class="flex-auto"
            autocomplete="off"
            rows="4"
            autoResize
          />
        </div>
        <div class="flex justify-end gap-2">
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="openAddDialog = false"
          />
          <Button type="button" label="Save" @click="BtnCompanyAdd" />
        </div>
      </Dialog>

    <DataTable :value="companies" tableStyle="min-width: 50rem">
      <Column field="index" header="No" class="w-2"></Column>
      <Column field="name" header="Name" class="w-18"></Column>
      <Column field="email" header="Email" class="w-18"></Column>
      <Column field="phone" header="Phone No" class="w-18"></Column>
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
              v-model:visible="BtnCompanyEdit"
              modal
              header="Edit Company"
              class="w-1/4"
            >
              <div class="flex flex-col gap-3 mb-3">
                <label for="CompanyName" class="font-semibold w-full">Name</label>
                <InputText
                  v-model="editCompanyName"
                  id="editCompany"
                  class="flex-auto"
                  autocomplete="off"
                />
                <small v-if="editCompanynameError" class="p-error"
                  >Company Name is required!</small
                >
                <label for="CompanyEmail" class="font-semibold w-full">Email</label>
                <InputText
                  v-model="editCompanyEmail"
                  id="editCompanyEmail"
                  class="flex-auto"
                  autocomplete="off"
                />
                <small v-if="editCompanyEmailError" class="p-error"
                  >Company Email is required!</small
                >
                <label for="CompanyPhone" class="font-semibold w-full">Phone No</label>
                <InputText
                  v-model="editCompanyPhone"
                  id="editCompanyPhone"
                  class="flex-auto"
                  autocomplete="off"
                />
                <small v-if="editCompanyPhoneError" class="p-error"
                  >Company Phone No is required!</small
                >
                <label for="CompanyAddress" class="font-semibold w-full">Address</label>
                <Textarea
                  v-model="editCompanyAddress"
                  id="editCompanyAddress"
                  class="flex-auto"
                  autocomplete="off"
                  rows="4"
                  autoResize
                />
              </div>
              <div class="flex justify-end gap-2">
                <Button
                  type="button"
                  label="Cancel"
                  severity="secondary"
                  @click="BtnCompanyEdit = false"
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

const companies = ref([]);
const selectedCompany = ref<{ id: number }>({ id: 0 });

const openAddDialog = ref(false);
const companyName = ref("");
const companyEmail= ref("");
const companyPhone = ref("");
const companyAddress = ref("");
const companyNameError = ref(false);
const companyEmailError = ref(false);
const companyPhoneError = ref(false);
const companyAddressError = ref(false);

const editCompanyName = ref("");
const editCompanyEmail = ref("");
const editCompanyPhone = ref("");
const editCompanyAddress = ref("");
const editCompanyError = ref(false);
const BtnCompanyEdit = ref(false);

const BtnCompanyAdd = async () => {
  companyNameError.value = companyName.value.trim() === "";
  companyEmailError.value = companyEmail.value.trim() === "";
  companyPhoneError.value = companyPhone.value.trim() === "";

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/company/add`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: companyName.value,
        email: companyEmail.value,
        phone: companyPhone.value,
        address: companyAddress.value,
      }),
    });

    if (!response.ok) {
      const { error } = await response.json();
      toast.add({ severity: "error", summary: "Error", detail: error, life: 3000 });
    } else {
      toast.add({ severity: "success", summary: "Success", detail: "Company added", life: 3000 });
      companyName.value = "";
      companyEmail.value = "";
      companyPhone.value = "";
      companyAddress.value = "";
      openAddDialog.value = false;
      fetchRoles();
    }
  } catch (error: any) {
    toast.add({ severity: "error", summary: "Error", detail: error, life: 3000 });
  }
}

const openEditDialog = async (company: { id: number; role_name: string }) => {
  // console.log("company", company.id);
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/company/${company.id}/view`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to fetch company",
      life: 3000,
    });
  } else {
    selectedCompany.value = company;
    editCompanyName.value = company.name;
    editCompanyEmail.value = company.email;
    editCompanyPhone.value = company.phone;
    editCompanyAddress.value = company.address;
    BtnCompanyEdit.value = true;
  }
};

const BtnRoleEditSave = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/company/${selectedCompany.value.id}/update`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editCompanyName.value,
        email: editCompanyEmail.value,
        phone: editCompanyPhone.value,
        address: editCompanyAddress.value,
      }),
    }
  );

  if (!response.ok) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to update company",
      life: 3000,
    });
  } else {
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Company updated successfully",
      life: 3000,
    });
    BtnCompanyEdit.value = false;
    fetchRoles();
  }
};

const BtnRoleDelete = async (event: any, company: { id: number }) => {
  confirm.require({
    target: event.currentTarget,
    message: "Do you want to delete this company?",
    icon: "pi pi-info-circle",
    rejectClass: "p-button-secondary p-button-outlined p-button-sm",
    acceptClass: "p-button-danger p-button-sm",
    rejectLabel: "Cancel",
    acceptLabel: "Delete",
    accept: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/company/${company.id}/delete`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      if (!response.ok) {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Failed to delete company",
          life: 3000,
        });
      } else {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Company deleted successfully",
          life: 3000,
        });
        fetchRoles();
      }
    },
  });
};

const fetchRoles = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/companies`, {
      method: "GET",
      credentials: "include",
    });

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
      console.log("companies", data);

      companies.value = data.map((company: any, index: number) => ({
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

onMounted(() => {
  fetchRoles();
});
</script>

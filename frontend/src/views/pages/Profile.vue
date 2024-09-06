<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import { useRoute } from "vue-router";

const toast = useToast();
const route = useRoute();

const user = ref<User | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);
const submitted = ref(false);

// Store initial user data
const initialUser = ref<User | null>(null);

// Form fields
const firstName = ref("");
const middleName = ref("");
const lastName = ref("");
const username = ref("");
const email = ref("");
const phoneNo = ref("");
const address = ref("");
const gender = ref("");

const fetchUser = async () => {
  isLoading.value = true;
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/me`,
      {
        method: "GET",
        credentials: "include", // Include cookies in the request
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user info");
    } else {
      const data = await response.json();
      user.value = data;

      // Set initial values
      initialUser.value = { ...data };
      firstName.value = data.first_name;
      middleName.value = data.middle_name;
      lastName.value = data.last_name;
      username.value = data.username;
      email.value = data.email;
      phoneNo.value = data.phone_no;
      address.value = data.address;
      gender.value = data.gender;
    }
  } catch (error: any) {
    console.error("Error fetching user info:", error);
  } finally {
    isLoading.value = false;
  }
};

const fetchMicrosoftUser = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/me-microsoft`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const userData = await response.json();
    user.value = userData;
  } catch (err) {
    error.value = "Failed to fetch user data";
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

// Check if any form field is changed
const isFormChanged = computed(() => {
  return (
    firstName.value !== initialUser.value?.first_name ||
    middleName.value !== initialUser.value?.middle_name ||
    lastName.value !== initialUser.value?.last_name ||
    username.value !== initialUser.value?.username ||
    email.value !== initialUser.value?.email ||
    phoneNo.value !== initialUser.value?.phone_no ||
    address.value !== initialUser.value?.address ||
    gender.value !== initialUser.value?.gender
  );
});

const previewImage = (event: Event) => {};

const handleSubmit = async () => {
  submitted.value = true;
  if (!isFormChanged.value) return;

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/account/update`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName.value,
        middle_name: middleName.value,
        username: username.value,
        email: email.value,
        phone_no: phoneNo.value,
        address: address.value,
        gender: gender.value,
      }),
    }
  );

  if (!response.ok) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to update profile",
      life: 3000,
    });
  } else {
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Profile updated successfully",
      life: 3000,
    });
    fetchUser();
  }
};

onMounted(() => {
  fetchUser();
  fetchMicrosoftUser();
});
</script>

<template>
  <div class="grid grid-rows-2 grid-flow-col gap-4">
    <div class="card row-span-2">
      <div class="w-full">
        <form @submit.prevent="handleSubmit">
          <div class="mb-4 flex flex-col items-center justify-center">
            <label
              class="relative flex items-center justify-center w-32 h-32 bg-gray-200 rounded-full cursor-pointer overflow-hidden"
            >
              <input
                type="file"
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*"
                @change="previewImage"
              />
              <!-- Display the profile image if available -->
              <img
                v-if="user?.profile_img"
                :src="user?.profile_img"
                alt="profile"
                class="w-full h-full object-cover rounded-full"
              />
              <!-- Placeholder for upload button if no image is available -->
              <img
                v-else
                :src="user?.profile_img"
                class="w-full h-full object-cover rounded-full"
              />
            </label>
            <span class="font-bold text-xl">{{ user?.username }}</span>
            <span>{{ user?.position }}</span>
          </div>
          <div class="mb-4">
            <label
              class="block text-white text-sm font-bold mb-2"
              for="firstName"
            >
              First Name
            </label>
            <input
              v-model="firstName"
              :class="[
                'bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
                {
                  'border-red-500': submitted && !firstName,
                  'border-gray-300 dark:border-gray-600': !(
                    submitted && !firstName
                  ),
                },
              ]"
              id="firstName"
              type="text"
              placeholder="First Name"
            />
            <small
              v-if="submitted && !firstName"
              class="text-red-500 text-xs italic"
              >First Name is required.</small
            >
          </div>
          <div class="mb-4">
            <label
              class="block text-white text-sm font-bold mb-2"
              for="middleName"
            >
              Middle Name
            </label>
            <input
              v-model="middleName"
              :class="[
                'bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white',
              ]"
              id="middleName"
              type="text"
              placeholder="Middle Name"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-white text-sm font-bold mb-2"
              for="lastName"
            >
              Last Name
            </label>
            <input
              v-model="lastName"
              :class="[
                'bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
                {
                  'border-red-500': submitted && !lastName,
                  'border-gray-300 dark:border-gray-600': !(
                    submitted && !lastName
                  ),
                },
              ]"
              id="lastName"
              type="text"
              placeholder="Last Name"
            />
            <small
              v-if="submitted && !lastName"
              class="text-red-500 text-xs italic"
              >Last Name is required.</small
            >
          </div>
          <div class="mb-4">
            <label
              class="block text-white text-sm font-bold mb-2"
              for="username"
            >
              Username
            </label>
            <input
              v-model="username"
              :class="[
                'bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
                {
                  'border-red-500': submitted && !username,
                  'border-gray-300 dark:border-gray-600': !(
                    submitted && !username
                  ),
                },
              ]"
              id="username"
              type="text"
              placeholder="Username"
            />
            <small
              v-if="submitted && !username"
              class="text-red-500 text-xs italic"
              >Username is required.</small
            >
          </div>
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="email">
              Email
            </label>
            <input
              v-model="email"
              :class="[
                'bg-gray-50 border disabled:opacity-75 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
                {
                  'border-red-500': submitted && !email,
                  'border-gray-300 dark:border-gray-600': !(
                    submitted && !email
                  ),
                },
              ]"
              id="email"
              type="text"
              placeholder="Email"
              disabled
            />
            <small
              v-if="submitted && !email"
              class="text-red-500 text-xs italic"
              >Email is required.</small
            >
          </div>
          <div class="mb-6">
            <label
              class="block text-white text-sm font-bold mb-2"
              for="phoneNo"
            >
              Phone No.
            </label>
            <input
              v-model="phoneNo"
              :class="[
                'bg-gray-50 border border-gray-300 dark:border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
              ]"
              id="phoneNo"
              type="text"
              placeholder="Phone No."
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-white text-sm font-bold mb-2"
              for="address"
            >
              Address
            </label>
            <textarea
              v-model="address"
              :class="[
                'bg-gray-50 border border-gray-300 dark:border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
              ]"
              type="text"
              placeholder="Address"
              style="resize: none; height: 80px"
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-white text-sm font-bold mb-2"
              for="address"
            >
              Gender
            </label>
            <div class="flex items-center space-x-4">
              <!-- Male option -->
              <label class="flex items-center cursor-pointer">
                <input
                  type="radio"
                  v-model="gender"
                  value="male"
                  class="appearance-none w-5 h-5 rounded-full border-2 border-gray-300 checked:border-purple-500 checked:bg-purple-500 focus:outline-none"
                />
                <span
                  class="ml-2 text-white"
                  :class="{ 'text-purple-500': gender === 'male' }"
                  >Male</span
                >
              </label>

              <!-- Female option -->
              <label class="flex items-center cursor-pointer">
                <input
                  type="radio"
                  v-model="gender"
                  value="female"
                  class="appearance-none w-5 h-5 rounded-full border-2 border-gray-300 checked:border-purple-500 checked:bg-purple-500 focus:outline-none"
                />
                <span
                  class="ml-2 text-white"
                  :class="{ 'text-purple-500': gender === 'female' }"
                  >Female</span
                >
              </label>
            </div>
          </div>
          <div class="flex justify-center">
            <button
              type="submit"
              :disabled="!isFormChanged"
              :class="[
                'text-white font-bold py-2 px-4 rounded',
                isFormChanged
                  ? 'bg-purple-500 hover:bg-purple-700'
                  : 'bg-gray-400 cursor-not-allowed',
              ]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="card col-span-3">
      <h1>Employment Details</h1>
    </div>
    <div class="card col-span-3">
      <h1>Account Details</h1>
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else-if="user">
        <p>Name: {{ user.first_name }}</p>
        <p>Email: {{ user.email }}</p>
        <p>Username: {{ user.username }}</p>
      </div>
    </div>
  </div>
</template>

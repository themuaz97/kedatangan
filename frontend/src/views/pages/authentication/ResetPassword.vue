<template>
  <div
    class="w-full flex flex-col items-center justify-center px-6 py-8 lg:py-0"
  >
    <div
      class="w-full p-6 rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8"
    >
      <h2
        class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
      >
        Change Password
      </h2>
      <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" @submit.prevent="resetPassword">
        <div>
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >New Password</label
          >
          <input
            type="password"
            v-model="newPassword"
            id="password"
            placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          <p class="text-red-500 text-xs italic">New password is required.</p>
        </div>
        <div>
          <label
            for="confirm-password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Confirm Password</label
          >
          <input
            type="password"
            v-model="confirmPassword"
            id="confirm-password"
            placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          <p class="text-red-500 text-xs italic">Confirm password is required.</p>
        </div>
        <button
          type="submit"
          class="w-full bg-purple-500 text-white hover:bg-purple-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Reset password
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const newPassword = ref<string>("");
const confirmPassword = ref<string>("");
const token = ref<string>("");

onMounted(() => {
  // Extract token from URL
  token.value = route.query.token as string;
});

const resetPassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    alert("Passwords do not match");
    return;
  }

  try {
    await fetch("http://localhost:3003/api/auth/reset-password", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token.value,
        newPassword: newPassword.value,
      }),
    });
    
    if (token.value) {
      router.push("/login");
    } else {
      alert("Invalid token");
    }
  } catch (error) {
    console.error("Error resetting password:", error);
    alert("Error resetting password");
  }
};

</script>

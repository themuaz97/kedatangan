<script setup lang="ts">
import { ref } from "vue";

const email = ref<string>("");

const forgotPassword = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
        }),
      }
    );

    if (response.ok) {
      alert("Password reset email sent. Please check your inbox.");
    } else {
      const errorData = await response.json();
      console.error("Error resetting password:", errorData.message);
    }
  } catch (error: any) {
    console.error("Error resetting password:", error);
  }
};
</script>

<template>
  <div
    class="w-1/2 mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300"
  >
    <div class="p-4 sm:p-7">
      <div class="flex flex-col items-center">
        <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">
          Forgot password?
        </h1>
        <div class="flex justify-center">
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Remember your password?
            <button
              class="text-sm text-purple-700 dark:text-purple-500"
              @click="$router.push('/login')"
            >
              login here
            </button>
          </p>
        </div>
      </div>

      <div class="mt-5">
        <form @submit.prevent="forgotPassword">
          <div class="grid gap-y-4">
            <div>
              <label
                for="email"
                class="block text-sm font-bold ml-1 mb-2 dark:text-white"
                >Email address</label
              >
              <div class="relative">
                <input
                  v-model="email"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  aria-describedby="email-error"
                />
                <p class="text-red-500 text-xs italic">Email is required.</p>
              </div>
              <p class="hidden text-xs text-red-600 mt-2" id="email-error">
                Please include a valid email address so we can get back to you
              </p>
            </div>
            <button
              type="submit"
              class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-purple-500 text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
            >
              Reset password
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

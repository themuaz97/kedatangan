<template>
  <div class="w-full max-w-xs">
    <form class="w-full p-6 rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8" @submit="login">
      <div class="mb-4">
        <label
          class="block text-white text-sm font-bold mb-2"
          for="email"
        >
          Email
        </label>
        <input
          v-model="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="email"
          type="text"
          placeholder="Email"
        />
        <p class="text-red-500 text-xs italic">Email is required.</p>
      </div>
      <div class="mb-6">
        <label
          class="block text-white text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          v-model="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="password"
          type="password"
          placeholder="Password"
        />
        <p class="text-red-500 text-xs italic">password is required.</p>
      </div>
      <div class="flex flex-col justify-center">
        <button
          class="bg-purple-500 hover:bg-purple-700 text-white font-bold mb-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
          <button
            class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            @click="loginMicrosoft"
          >
            Login with Microsoft
          </button>
        <a
          class="inline-block text-center text-white font-bold mt-2 text-sm hover:text-purple-800"
          href="/forgot-password"
        >
          Forgot Password?
        </a>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Ensure you import useRouter

const email = ref<string>('');
const password = ref<string>('');
const router = useRouter(); // Initialize router

const loginMicrosoft = () => {
  window.location.href = "http://localhost:3003/api/auth/login";
};

const login = async () => {
  try {
    const response = await fetch('http://localhost:3003/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    const data = await response.json();

    if (response.ok) {
      router.push('/profile');
    } else {
      console.error('Login failed:', data.message);
    }
  } catch (error: any) {
    console.error('Network error:', error);
    // Handle the error, maybe show a message to the user
  }
}
</script>

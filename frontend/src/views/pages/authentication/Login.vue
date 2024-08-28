<template>
  <div class="w-full max-w-xs">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit="login">
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="email"
        >
          Email
        </label>
        <input
          v-model="email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="Email"
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          v-model="password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Password"
        />
        <p class="text-red-500 text-xs italic">Please choose a password.</p>
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
          class="inline-block text-center font-bold mt-2 text-sm hover:text-purple-800"
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

    if (response.ok) {
      await router.push('/profile');
    } else {
      const errorData = await response.json();
      console.error('Login failed:', errorData.message);
      // Optionally, show an error message to the user
    }
  } catch (error: any) {
    console.error('Network error:', error);
    // Handle the error, maybe show a message to the user
  }
}
</script>

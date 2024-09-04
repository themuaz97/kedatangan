<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'; 
import { useAuthStore } from '../../../stores/auth.store';
import { useToast } from 'primevue/usetoast';

const email = ref<string | null>(null);
const password = ref<string | null>(null);
const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const submitted = ref(false); // Track if form has been submitted

const loginMicrosoft = () => {
  window.location.href = "http://localhost:3005/api/auth/microsoft-login";
};

const handleSubmit = async () => {
  submitted.value = true; // Set submitted to true when form is submitted

  // Validate the fields
  if (!email.value || !password.value) {
    return; // Don't proceed if fields are invalid
  }

  try {
    const success = await authStore.login(email.value, password.value);
    if (success) {
      toast.add({ severity: 'success', summary: 'Login Successful', detail: 'You have successfully logged in.', life: 3000 });
      router.push('/'); 
    }
  } catch (error: any) {
    toast.add({ severity: 'error', summary: 'Login Failed', detail: error.message, life: 3000 });
  }
};

onMounted(() => {
  if (authStore.isAuthenticated) {
    router.push('/');
  }
});

</script>

<template>
  <div class="w-full max-w-xs">
    <form class="w-full p-6 rounded-lg shadow dark:border md:mt-0 sm:max-w-md bg-gray-800 dark:border-gray-700 sm:p-8" @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label
          class="block text-white text-sm font-bold mb-2"
          for="email"
        >
          Email
        </label>
        <input
          v-model="email"
          :class="[
            'bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
            {'border-red-500': submitted && !email, 'border-gray-300 dark:border-gray-600': !(submitted && !email)}
          ]"
          id="email"
          type="text"
          placeholder="Email"
        />
        <small v-if="submitted && !email" class="text-red-500 text-xs italic">Email is required.</small>
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
          :class="[
            'bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
            {'border-red-500': submitted && !password, 'border-gray-300 dark:border-gray-600': !(submitted && !password)}
          ]"
          id="password"
          type="password"
          placeholder="Password"
        />
        <small v-if="submitted && !password" class="text-red-500 text-xs italic">Password is required.</small>
      </div>
      <div class="flex flex-col justify-center">
        <button
          class="bg-purple-500 hover:bg-purple-700 focus:ring-purple-500 text-white font-bold mb-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import router from '../../routers';

interface User {
  email: string;
  username: string;
}

const userInfo = ref<User | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const selectedCity = ref();
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);
const checked = ref(false);

const fetchUser = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
      method: 'GET',
      credentials: 'include', // Include cookies in the request
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }

    const data = await response.json();
    userInfo.value = data;
    console.log('user info', userInfo.value);

  } catch (err: any) {
    console.error('Error fetching user info:', err);
    error.value = 'Failed to fetch user info';
  } finally {
    loading.value = false;
  }
};


onMounted(() => {
  fetchUser();
});
</script>

<template>
  <div>
    <Checkbox v-model="checked" binary />
    <div class="card">
      <h1>card</h1>
    </div>
    <div class="my-6">
      <Select v-model="selectedCity" :options="cities"  optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />
    </div>
  </div>
</template>

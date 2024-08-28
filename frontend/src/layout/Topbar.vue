<script lang="ts" setup>
import { onMounted, ref } from "vue";

export interface User {
  id: string;
  username: string;
  email: string;
}

const user = ref<User | null>(null);
const emit = defineEmits(["toggle-sidebar"]);

const fetchUser = async () => {
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
    }
  } catch (error: any) {
    console.error("Error fetching user info:", error);
  }
};

onMounted(fetchUser);
</script>
<template>
  <div class="topbar">
    <div>
      <button @click="emit('toggle-sidebar')">
        <span
          class="material-symbols-rounded border border-transparent hover:bg-purple-800 p-2 rounded-full transition-all duration-200"
        >
          menu
        </span>
      </button>
    </div>
    <div class="flex justify-end w-screen gap-3">
      <button>
        <span class="material-symbols-rounded"> notifications </span>
      </button>
      <span>{{ user?.username }}</span>
      <button>
        <span class="material-symbols-rounded"> logout </span>
      </button>
    </div>
  </div>
</template>
<style scoped></style>

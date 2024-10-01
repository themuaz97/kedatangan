<script lang="ts" setup>
import { useToast } from "primevue/usetoast";
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { getRandomColor } from "../utils/profileImg";
import NotificationDropdown from "../components/NotificationDropdown.vue";

const router = useRouter();
const menu = ref();
const emit = defineEmits(["toggle-sidebar"]);
const toast = useToast();

const user = ref<User | null>(null);
const isLoading = ref(false);


// Topbar items
const topbarItems = ref([
  {
    label: "Profile",
    icon: "pi pi-user",
    command: () => {
      router.push({ name: "profile" });
    },
  },
  {
    label: "Logout",
    icon: "pi pi-sign-out",
    command: () => {
      try {
        fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
          method: "POST",
          credentials: "include",
        }).then(() => {
          toast.add({
            severity: "secondary",
            summary: "logged out successfully",
            detail: "",
            life: 3000,
          });
          router.push({ name: "login" });
        });
      } catch (error: any) {
        console.log("error",error);
        
        toast.add({
          severity: "error",
          summary: "error while logging out",
          detail: error,
          life: 3000,
        });
      }
    },
  },
]);

const toggle = (event: Event) => {
  menu.value.toggle(event);
};

// Compute initials from first_name and last_name
const initials = computed(() => {
  if (user.value) {
    const firstInitial = user.value.first_name
      ? user.value.first_name.charAt(0).toUpperCase()
      : "";
    const lastInitial = user.value.last_name
      ? user.value.last_name.charAt(0).toUpperCase()
      : "";
    return `${firstInitial}${lastInitial}`;
  }
  return "";
});

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
    }
  } catch (error: any) {
    console.error("Error fetching user info:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchUser();
});
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
    <router-link to="/">
      <div class="flex items-center ml-2">
        <span class="logo">Kedatangan</span>
      </div>
    </router-link>
    <div class="flex justify-end w-screen gap-3">
      <div class="flex items-center gap-3">
        <div>
          <NotificationDropdown />
        </div>
        <div class="w-8 h-8 flex cursor-pointer" @click="toggle">
          <div
            v-if="isLoading"
            class="w-8 h-8 flex items-center justify-center"
          >
            <i class="pi pi-spin pi-spinner text-2xl"></i>
          </div>
          <!-- Display the profile image if available -->
          <img
            v-else-if="user?.profile_img"
            :src="user.profile_img"
            alt="profile"
            class="w-8 h-8 rounded-full"
          />
          <!-- Display initials with random background color if profile image is not available -->
          <div
            v-else
            class="w-8 h-8 flex items-center justify-center text-white rounded-full text-sm"
            :style="{ backgroundColor: getRandomColor() }"
          >
            {{ initials }}
          </div>
          <Menu
            ref="menu"
            id="overlay_menu"
            :model="topbarItems"
            :popup="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

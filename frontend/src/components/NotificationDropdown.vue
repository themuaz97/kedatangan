<script lang="ts" setup>
import { useToast } from 'primevue/usetoast';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const toast = useToast();
const isOpen = ref(false);
const notifications = ref<AppNotification[]>([]);

const unreadCount = computed(() => notifications.value.filter(n => !n.seen).length);
const hasViewedNotifications = ref(false);

// Malaysian timezone formatter
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-MY', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Kuala_Lumpur'
  }).format(date);
};

// Function to mark notifications as seen (without marking them as read)
const markNotificationsAsSeen = async () => {
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/api/notifications/seen`, {
      method: 'PUT',
      credentials: 'include',
    });
    
    // Mark all notifications as seen locally
    notifications.value.forEach(notification => {
      notification.seen = true;
    });
  } catch (error: any) {
    toast.add({ severity: "error", summary: "Error", detail: "Failed to mark notifications as seen", life: 3000 });
  }
};

const toggleDropdown = async () => {
  isOpen.value = !isOpen.value;

  if (isOpen.value) {
    hasViewedNotifications.value = true;
    await markNotificationsAsSeen();
    document.addEventListener('click', handleClickOutside);
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
};

// Function to close the dropdown when clicked outside
const handleClickOutside = (event: MouseEvent) => {
  const dropdown = document.querySelector('.notification-dropdown') as HTMLElement;
  const button = document.querySelector('.notification-button') as HTMLElement;

  // If the clicked element is not inside the dropdown or button, close the dropdown
  if (dropdown && !dropdown.contains(event.target as Node) && !button.contains(event.target as Node)) {
    isOpen.value = false;
    document.removeEventListener('click', handleClickOutside);
  }
};

const fetchNotifications = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notifications`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    notifications.value = data;
  } catch (error: any) {
    toast.add({ severity: "error", summary: "Error", detail: error, life: 3000 });
  }
};

const markAsRead = async (notificationId: number, link: string) => {
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/api/notification/${notificationId}/read`, {
      method: 'PUT',
      credentials: 'include',
    });
    const notification = notifications.value.find(n => n.id === notificationId);
    if (notification) {
      notification.read_status = true;
      console.log('noti', notificationId);
      
      router.push(link)
    }

    // Navigate to the link
    // if (link) {
    //   ; // Use router to navigate to the link
    // }
  } catch (error) {
    console.error('Failed to mark notification as read', error);
  }
};

const markAllAsRead = async () => {
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/api/notifications/read_status-all`, {
      method: 'PUT',
      credentials: 'include',
    });
    
    notifications.value.forEach(notification => {
      notification.read_status = true;
    });
  } catch (error) {
    console.error('Failed to mark all notifications as read', error);
  }
};

onMounted(() => {
  fetchNotifications();
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

</script>

<template>
  <div class="relative">
    <!-- Button to open the dropdown -->
    <button @click="toggleDropdown" class="relative mt-2 notification-button">
      <span class="material-symbols-rounded">notifications</span>
      <span v-if="unreadCount > 0 && !hasViewedNotifications" class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
        {{ unreadCount }}
      </span>
    </button>

    <!-- Notification dropdown -->
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-96 bg-gray-800 border border-gray-700 shadow-lg rounded-lg overflow-hidden notification-dropdown"
    >
      <ul class="divide-y divide-gray-700">
        <li v-for="(notification) in notifications" :key="notification.id" class="p-4 hover:bg-gray-700 cursor-pointer flex items-center justify-between"
          @click="markAsRead(notification.id, notification.link as string)"> <!-- Pass the notification link -->
          <span>{{ notification.message }}</span>
          <span class="text-xs text-gray-400 whitespace-nowrap">{{ formatTime(notification.created_at as string) }}</span>
        </li>
      </ul>
      <div class="p-2 text-center border-t border-gray-700">
        <button class="text-blue-600" @click="markAllAsRead">Mark all as read</button>
      </div>
    </div>
  </div>
</template>



<style scoped>
/* Add your custom styling here if needed */
</style>

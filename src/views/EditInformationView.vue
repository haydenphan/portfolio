<template>
  <div>
    <LoginForm v-if="!isLoggedIn" @login-success="handleLoginSuccess" />
    <div v-else class="container mx-auto mt-5">
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="bg-gray-800 p-4">
          <h1 class="text-white text-xl">Edit Profile</h1>
        </div>
        <div class="p-4">
          <form @submit.prevent="updateProfile" v-if="profile">
            <div class="mb-4">
              <label for="name" class="block text-gray-700">Name:</label>
              <input type="text" id="name" v-model="profile.name" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
            </div>
            <div class="mb-4">
              <label for="age" class="block text-gray-700">Age:</label>
              <input type="number" id="age" v-model="profile.age" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
            </div>
            <div class="mb-4">
              <label for="phone" class="block text-gray-700">Phone Number:</label>
              <input type="text" id="phone" v-model="profile.contactInformation.phoneNumber" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
            </div>
            <div class="mb-4">
              <label for="personalEmail" class="block text-gray-700">Personal Email:</label>
              <input type="email" id="personalEmail" v-model="profile.contactInformation.personalEmail" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
            </div>
            <div class="mb-4">
              <label for="universityEmail" class="block text-gray-700">University Email:</label>
              <input type="email" id="universityEmail" v-model="profile.contactInformation.universityEmail" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
            </div>
            <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Save</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useInfoStore } from '../stores/InformationStore';
import { useAuthStore } from '../stores/AuthStore';
import { PersonalInfo } from '../model/PersonalInfo';
import LoginForm from '../components/LoginForm.vue';

const infoStore = useInfoStore();
const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isAuthenticated);

const profile = ref<PersonalInfo>({
  name: '',
  age: 0,
  contactInformation: {
    phoneNumber: '',
    personalEmail: '',
    universityEmail: ''
  }
});

const fetchProfileInfo = async () => {
  try {
    await infoStore.getInfo();
    if (infoStore.info) {
      profile.value = { ...infoStore.info };
    } else {
      console.error('Failed to fetch profile info: infoStore.info is null');
    }
  } catch (error) {
    console.error('Error fetching profile info:', error);
  }
};

onMounted(async () => {
  if (isLoggedIn.value) {
    await fetchProfileInfo();
  }
});

const handleLoginSuccess = async () => {
  await fetchProfileInfo();
};

const updateProfile = async () => {
  try {
    await infoStore.updateInfo(profile.value);
    alert('Profile updated successfully!');
  } catch (error) {
    console.error('Error updating profile:', error);
    alert('Failed to update profile.');
  }
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
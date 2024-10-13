<template>
  <div class="w-70">
    <h2 class="text-3xl font-bold text-gray-900 mb-6">Personal Information</h2>
    <form @submit.prevent="updateProfile" class="bg-white rounded-lg shadow-md p-6">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 text-sm font-bold mb-2 flex">Name</label>
        <input
          type="text"
          id="name"
          v-model="profile.name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Your Name"
          required
        />
      </div>

      <div class="mb-4">
        <label for="age" class="block text-gray-700 text-sm font-bold mb-2 flex">Age</label>
        <input
          type="number"
          id="age"
          v-model="profile.age"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Your Age"
          required
        />
      </div>

      <div class="mb-4">
        <label for="phone" class="block text-gray-700 text-sm font-bold mb-2 flex">Phone Number</label>
        <input
          type="text"
          id="phone"
          v-model="profile.contactInformation.phoneNumber"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Your Phone Number"
          required
        />
      </div>

      <div class="mb-4">
        <label for="personalEmail" class="block text-gray-700 text-sm font-bold mb-2 flex">Personal Email</label>
        <input
          type="email"
          id="personalEmail"
          v-model="profile.contactInformation.personalEmail"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Your Personal Email"
          required
        />
      </div>

      <div class="mb-4">
        <label for="universityEmail" class="block text-gray-700 text-sm font-bold mb-2 flex">University Email</label>
        <input
          type="email"
          id="universityEmail"
          v-model="profile.contactInformation.universityEmail"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Your University Email"
          required
        />
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useInfoStore } from '../../stores/InformationStore';
import { useAuthStore } from '../../stores/AuthStore';
import { PersonalInfo } from '../../model/PersonalInfo';

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
.w-70 {
  width: 70%;
}
</style>
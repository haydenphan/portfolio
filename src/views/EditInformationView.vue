<template>
  <div class="container mt-5">
    <div class="card shadow-sm">
      <div class="card-header">
        <h1 class="card-title mb-0">Edit Profile</h1>
      </div>
      <div class="card-body">
        <form @submit.prevent="updateProfile" v-if="profile">
          <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" id="name" v-model="profile.name" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="age" class="form-label">Age:</label>
            <input type="number" id="age" v-model="profile.age" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label">Phone Number:</label>
            <input type="text" id="phone" v-model="profile.contactInformation.phoneNumber" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="personalEmail" class="form-label">Personal Email:</label>
            <input type="email" id="personalEmail" v-model="profile.contactInformation.personalEmail" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="universityEmail" class="form-label">University Email:</label>
            <input type="email" id="universityEmail" v-model="profile.contactInformation.universityEmail" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Save</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useInfoStore } from '../stores/InformationStore';
import { PersonalInfo } from '../model/PersonalInfo';

const infoStore = useInfoStore();

const profile = ref<PersonalInfo>({
  name: '',
  age: 0,
  contactInformation: {
    phoneNumber: '',
    personalEmail: '',
    universityEmail: ''
  }
});

onMounted(async () => {
  await infoStore.getInfo();
  if (infoStore.info) {
    profile.value = { ...infoStore.info };
  }
});

const updateProfile = async () => {
  await infoStore.updateInfo(profile.value);
  alert('Profile updated successfully!');
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
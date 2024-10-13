<template>
  <body class="bg-gray-100 font-sans">
    <LoginForm v-if="!isLoggedIn" @login-success="handleLoginSuccess" />
    <div v-else class="container mx-auto mt-5">
      <NavBar />

      <main class="container mx-auto mt-8 px-4">
        <section id="projects" class="mb-12">
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Projects</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80"
                alt="Project 1"
                class="w-full h-48 object-cover"
              />
              <div class="p-4">
                <h3 class="font-bold text-xl mb-2 text-gray-800">Project 1</h3>
                <p class="text-gray-600">
                  A brief description of Project 1 goes here.
                </p>
                <div class="mt-4 flex justify-between">
                  <button
                    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <div
              class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <img
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                alt="Project 2"
                class="w-full h-48 object-cover"
              />
              <div class="p-4">
                <h3 class="font-bold text-xl mb-2 text-gray-800">Project 2</h3>
                <p class="text-gray-600">
                  A brief description of Project 2 goes here.
                </p>
                <div class="mt-4 flex justify-between">
                  <button
                    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <div
              class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <img
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                alt="Project 2"
                class="w-full h-48 object-cover"
              />
              <div class="p-4">
                <h3 class="font-bold text-xl mb-2 text-gray-800">Project 2</h3>
                <p class="text-gray-600">
                  A brief description of Project 2 goes here.
                </p>
                <div class="mt-4 flex justify-between">
                  <button
                    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            class="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Add New Project
          </button>
        </section>

        <section id="personal-info" class="mb-12 justify-center flex">
            <UpdatePersonalInfo/>
        </section>
        
      </main>

      <Footer/>
    </div>
  </body>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUpdated } from "vue";
import { useInfoStore } from "../stores/InformationStore";
import { useAuthStore } from "../stores/AuthStore";
import { PersonalInfo } from "../model/PersonalInfo";
import LoginForm from "../components/LoginForm.vue";
import NavBar from "../components/PortfolioManagement/NavBar.vue";
import UpdatePersonalInfo from "../components/PortfolioManagement/UpdatePersonalInfo.vue";
import Footer from "../components/PortfolioManagement/Footer.vue";

const infoStore = useInfoStore();
const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isAuthenticated);

const profile = ref<PersonalInfo>({
  name: "",
  age: 0,
  contactInformation: {
    phoneNumber: "",
    personalEmail: "",
    universityEmail: "",
  },
});

const fetchProfileInfo = async () => {
  try {
    await infoStore.getInfo();
    if (infoStore.info) {
      profile.value = { ...infoStore.info };
    } else {
      console.error("Failed to fetch profile info: infoStore.info is null");
    }
  } catch (error) {
    console.error("Error fetching profile info:", error);
  }
};

onUpdated(async () => {
  if (isLoggedIn.value) {
    await fetchProfileInfo();
  }
});

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
    alert("Profile updated successfully!");
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Failed to update profile.");
  }
};
</script>

<style scoped>
</style>
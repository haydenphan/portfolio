<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4"
  >
    <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">
        Login
      </h2>
      <form method="POST" id="registrationForm" class="space-y-4" @submit.prevent="submit">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 flex"
            >Username</label
          >
          <input
            type="text"
            id="username"
            v-model="username"
            name="username"
            autocomplete="username"
            required
            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            aria-describedby="usernameError"
          />
          <p id="usernameError" class="mt-1 text-sm text-red-600 hidden">
            Please enter your username
          </p>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 flex"
            >Password</label
          >
          <div class="relative">
            <input
              type="password"
              id="password"
              v-model="password"
              name="password"
              autocomplete="current-password"
              required
              minlength="8"
              class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out pr-10"
              aria-describedby="passwordError"
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              <svg
                class="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </div>
          <p id="passwordError" class="mt-1 text-sm text-red-600 hidden">
            Password must be at least 8 characters long
          </p>
        </div>
        <div>
          <button
            type="submit"
            id="loginButton"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            <span id="submitText">Login</span>
            <svg
              id="loadingSpinner"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white hidden"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/AuthStore";

const authStore = useAuthStore();
const username = ref("");
const password = ref("");
const passwordVisible = ref(false);

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
  const passwordInput = document.getElementById("password") as HTMLInputElement;
  passwordInput.setAttribute(
    "type",
    passwordVisible.value ? "text" : "password"
  );
};

const submit = () => {
  const loginButton = document.getElementById("loginButton") as HTMLButtonElement;
  const loadingSpinner = document.getElementById("loadingSpinner") as SVGElement;
  const submitText = document.getElementById("submitText") as HTMLSpanElement;

  loadingSpinner.classList.remove("hidden");
  submitText.classList.add("hidden");
  loginButton.disabled = true;

  setTimeout(() => {
    loadingSpinner.classList.add("hidden");
    submitText.classList.remove("hidden");
    loginButton.disabled = false;

    if (authStore.login(username.value, password.value)) {

    } else {
      alert("Invalid username or password");
    }
  }, 2000);
};
</script>

<style scoped>

</style>
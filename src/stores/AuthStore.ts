import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') as string) as { username: string; password: string } | null,
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  }),

  getters: {
    getUser: (state) => state.user,
    isAuthenticated: (state) => state.isLoggedIn,
  },

  actions: {
    login(username: string, password: string) {
      const account = {
        username: 'testuser',
        password: 'password123',
      };

      if (username === account.username && password === account.password) {
        this.user = account;
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(account));
        localStorage.setItem('isLoggedIn', 'true');
        return true;
      } else {
        return false;
      }
    },

    logout() {
      this.user = null;
      this.isLoggedIn = false;
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
    },
  },
});
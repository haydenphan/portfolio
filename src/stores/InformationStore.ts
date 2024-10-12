import { defineStore } from 'pinia';
import { database } from '../../data/firebaseConfig';
import { ref, get, set } from 'firebase/database';
import { PersonalInfo } from '@/model/PersonalInfo';

export const useInfoStore = defineStore('information', {
  state: () => ({
    info: null as PersonalInfo | null,
    loading: false,
  }),

  getters: {
  },

  actions: {
    async getInfo() {
      this.loading = true;

      try {
        // Get data from Firebase
        const infoRef = ref(database, 'personal-information');
        const snapshot = await get(infoRef);
        if (snapshot.exists()) {
          this.info = snapshot.val() as PersonalInfo;
        } else {
          console.error('No data available');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    },

    async updateInfo(updatedInfo: PersonalInfo) {
      this.loading = true;

      try {
        // Update data in Firebase
        const infoRef = ref(database, 'personal-information');
        await set(infoRef, updatedInfo);
        this.info = updatedInfo;
      } catch (error) {
        console.error('Error updating data:', error);
      } finally {
        this.loading = false;
      }
    }
  }
});
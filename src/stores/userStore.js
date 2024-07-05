import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: null,
    userEmail: null,
  }),
  actions: {
    setUser(userId, userEmail) {
      this.userId = userId;
      this.userEmail = userEmail;
    },
    clearUser() {
      this.userId = null;
      this.userEmail = null;
    }
  }
});

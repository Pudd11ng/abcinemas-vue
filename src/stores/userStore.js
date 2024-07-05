import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: null,
    userEmail: null,
    userRole: null,
  }),
  actions: {
    setUser(userId, userEmail, userRole) {
      this.userId = userId;
      this.userEmail = userEmail;
      this.userRole = userRole;
    },
    clearUser() {
      this.userId = null;
      this.userEmail = null;
    }
  }
});

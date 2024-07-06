import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userId: localStorage.getItem("userId") || null,
    userEmail: localStorage.getItem("userEmail") || null,
    userRole: localStorage.getItem("userRole") || null,
  }),
  actions: {
    setUser(userId, userEmail, userRole) {
      this.userId = userId;
      this.userEmail = userEmail;
      this.userRole = userRole;
      localStorage.setItem("userId", userId);
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("userRole", userRole);
    },
    clearUser() {
      this.userId = null;
      this.userEmail = null;
      this.userRole = null;
      localStorage.removeItem("userId");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userRole");
    },
  },
});

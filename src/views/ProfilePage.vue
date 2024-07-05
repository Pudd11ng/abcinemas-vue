<template>
  <HeaderPage />
  <button @click="logout">Logout</button>
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";
import { useUserStore } from "@/stores/userStore";
import router from "@/router/index.js";
import { computed } from "vue";

export default {
  name: "UserProfile",
  components: {
    HeaderPage,
  },
  setup() {
    const userStore = useUserStore();
    const userId = computed(() => userStore.userId);
    const userEmail = computed(() => userStore.userEmail);

    const logout = () => {
      console.log(userId);
      console.log(userEmail);
      userStore.clearUser();
      router.push({ path: "/" });
    };

    return {
      userId,
      userEmail,
      logout,
    };
  },
};
</script>

<style scoped>
@import "@/assets/css/profile.css";
</style>

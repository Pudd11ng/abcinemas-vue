<template>
  <div id="home-page">
    <HeaderPage />
    <main>
      <!-- Your main content here -->
      <router-link to="/ticket-booking">Book Tickets</router-link>
    </main>
  </div>
</template>

<script>
import HeaderPage from '@/components/HeaderPage.vue';

export default {
  name: 'HomePage',
  components: {
    HeaderPage,
  }
};
</script>

<style scoped>
/* Your styles here */
</style>

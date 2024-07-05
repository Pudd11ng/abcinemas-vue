<template>
  <div id="about-us">
    <HeaderPage />
    <main>
      <!-- About Us content -->
    </main>
    <FooterPage />
  </div>
</template>

<script>
import HeaderPage from '@/components/HeaderPage.vue';
import FooterPage from '@/components/FooterPage.vue';

export default {
  name: 'AboutUs',
  components: {
    HeaderPage,
    FooterPage
  }
};
</script>

<style scoped>
/* If you create about.css later, include the correct path here */
/* src="../assets/css/about.css" */
</style>

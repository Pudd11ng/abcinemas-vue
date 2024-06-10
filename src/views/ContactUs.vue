<template>
  <div id="contact-us">
    <HeaderPage />
    <main>
      <!-- Main content from Contact_Us.html -->
    </main>
    <FooterPage />
  </div>
</template>

<script>
import HeaderPage from '@/components/HeaderPage.vue';
import FooterPage from '@/components/FooterPage.vue';

export default {
  name: 'ContactUs',
  components: {
    HeaderPage,
    FooterPage
  }
};
</script>

<style src="../assets/css/contact_us.css"></style>

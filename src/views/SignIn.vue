<template>
  <div id="sign-in">
    <HeaderPage />
    <main>
      <!-- Sign-In content -->
    </main>
    <FooterPage />
  </div>
</template>

<script>
import HeaderPage from '@/components/HeaderPage.vue';
import FooterPage from '@/components/FooterPage.vue';

export default {
  name: 'SignIn',
  components: {
    HeaderPage,
    FooterPage
  }
};
</script>

<style src="../assets/css/sign-in.css"></style>

<template>
  <div id="home">
    <HeaderPage />
    <main>
      <!-- Main content from movies.html -->
    </main>
    <FooterPage />
  </div>
</template>

<script>
import HeaderPage from '@/components/HeaderPage.vue';
import FooterPage from '@/components/FooterPage.vue';

export default {
  name: 'MoviesList',
  components: {
    HeaderPage,
    FooterPage
  }
};
</script>

<template>
  <div id="about-us">
    <HeaderPage />
    <main>
      <div class="about-content">
        <h1>About ABCinemas</h1>
        <p>
          Welcome to ABCinemas, where the magic of cinema comes to life! Our mission is to provide an exceptional movie-going experience for all our patrons.</p>
          <p>We pride ourselves on offering the latest blockbuster hits, timeless classics, and exclusive screenings in a comfortable and modern setting.
        </p>
      </div>
    </main>
  </div>
</template>

<script>
import HeaderPage from '@/components/HeaderPage.vue';

export default {
  name: 'AboutUs',
  components: {
    HeaderPage
  }
};
</script>

<style scoped>
#about-us {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: top;
  padding: 20px;
  padding-bottom: 80px; /* Ensure there's enough space for fixed footer */
  padding-top: 80px;
}

.about-content {
  max-width: 1000px;
  text-align: center;
}

.about-content h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

.about-content p {
  font-size: 1.2em;
  line-height: 1.6;
  margin-bottom: 20px;
}
</style>

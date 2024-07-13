<template>
  <div id="contact-us">
    <HeaderPage />
    <main>
      <div class="contact-content">
        <h1>Contact Us</h1>
        <p>
          We value your feedback and are here to assist you with any questions or concerns you may have. Please feel free to reach out to us using the following contact information:
        </p>
        <div class="contact-details">
          <div class="contact-item">
            <h3>Customer Service</h3>
            <p>Email: support@abcinemas.com</p>
            <p>Phone: +123-456-7890</p>
          </div>
          <div class="contact-item">
            <h3>Business Inquiries</h3>
            <p>Email: business@abcinemas.com</p>
            <p>Phone: +123-456-7891</p>
          </div>
        </div>
      </div>
    </main>
    <FooterPage />
  </div>
</template>

<script>
import HeaderPage from '@/components/HeaderPage.vue';

export default {
  name: 'ContactUs',
  components: {
    HeaderPage,
  }
};
</script>

<style scoped>
#contact-us {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  padding-bottom: 80px; /* Ensure there's enough space for fixed footer */
}

.contact-content {
  max-width: 800px;
  text-align: center;
  padding-top: 40px;
}

.contact-content h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

.contact-content p {
  font-size: 1.2em;
  line-height: 1.6;
  margin-bottom: 20px;
}

.contact-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.contact-item {
  margin-bottom: 20px;
}

.contact-item h3 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.contact-item p {
  font-size: 1.2em;
}
</style>

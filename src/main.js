import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '@/assets/css/style-starter.css';
import '@/assets/css/progress.css';
import '@/assets/css/ticket-booking.css';
import '@/assets/css/e-ticket.css';
import '@/assets/css/payment.css';
import '@/assets/js/theme-change.js';
import '@/assets/js/ticket-booking.js';

createApp(App).use(router).mount('#app');

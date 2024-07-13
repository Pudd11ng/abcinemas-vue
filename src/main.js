import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import VueTelInput from 'vue-tel-input';
import CanvasJSChart from '@canvasjs/vue-charts';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '@/assets/css/style-starter.css';
import 'vue-tel-input/vue-tel-input.css';

// Uncomment these imports if you need them in your project
// import '@/assets/css/progress.css';
// import '@/assets/css/ticket-booking.css';
// import '@/assets/css/e-ticket.css';
// import '@/assets/css/payment.css';
// import '@/assets/js/theme-change.js';
// import '@/assets/js/ticket-booking.js';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(VueTelInput);
app.use(CanvasJSChart);
app.mount('#app');

import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomePage.vue';
import ContactUs from '../views/ContactUs.vue';
import About from '../views/AboutUs.vue';
import ETicket from '../views/ETicket.vue';
import Movies from '../views/MoviesList.vue';
import SignIn from '../views/SignIn.vue';
import UserProfile from '../views/ProfilePage.vue';
import TicketBooking from '../views/TicketBooking.vue';
import SeatSelection from '../views/SeatSelection.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/contact-us', name: 'ContactUs', component: ContactUs },
  { path: '/about', name: 'About', component: About },
  { path: '/e-ticket', name: 'ETicket', component: ETicket, props: route => route.params },
  { path: '/movies', name: 'Movies', component: Movies },
  { path: '/sign-in', name: 'SignIn', component: SignIn },
  { path: '/profile', name: 'UserProfile', component: UserProfile },
  { path: '/ticket-booking', name: 'TicketBooking', component: TicketBooking },
  { path: '/seat-selection', name: 'SeatSelection', component: SeatSelection },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

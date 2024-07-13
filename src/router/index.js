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
import AdminUser from '../views/AdminUser.vue';
import AdminBooking from '../views/AdminBooking.vue';
import BookingHistory from '../views/BookingHistory.vue';
import { useUserStore } from '../stores/userStore';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/contact-us', name: 'ContactUs', component: ContactUs },
  { path: '/about', name: 'About', component: About },
  { path: '/e-ticket', name: 'ETicket', component: ETicket, props: route => route.params },
  { path: '/movies', name: 'Movies', component: Movies },
  { path: '/sign-in', name: 'SignIn', component: SignIn },
  { path: '/profile', name: 'UserProfile', component: UserProfile, meta: { requiresAuth: true } },
  { path: '/ticket-booking', name: 'TicketBooking', component: TicketBooking, meta: { requiresAuth: true } },
  { path: '/seat-selection', name: 'SeatSelection', component: SeatSelection, meta: { requiresAuth: true } },
  { path: '/admin-user', name: 'AdminUser', component: AdminUser, meta: { requiresAuth: true } },
  { path: '/admin-bookings', name: 'AdminBooking', component: AdminBooking, meta: { requiresAuth: true } },
  { path: '/booking-history', name: 'BookingHistory', component: BookingHistory, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  console.log('User isAuthenticated:', userStore.isAuthenticated);
  if (to.matched.some(record => record.meta.requiresAuth) && !userStore.isAuthenticated) {
    alert("You must Sign In/Register before booking tickets.");
    next({ name: 'SignIn', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;

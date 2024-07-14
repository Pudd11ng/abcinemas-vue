<template>
  <div id="booking-history">
    <HeaderPage />
    <div v-if="loading">Loading...</div>
    <template v-else-if="bookings.length > 0">
      <div class="booking-content">
        <div class="booking-title">
          <h1>BookingHistory</h1>
        </div>
        <div class="table-wrapper">
          <table class="styled-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Movie Title</th>
                <th>Branch</th>
                <th>Hall</th>
                <th>Show Time</th>
                <th>Show Date</th>
                <th class="seats-column">Seats</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="booking in bookings" :key="booking.booking_id">
                <td>{{ booking.booking_id }}</td>
                <td>{{ booking.movie_title }}</td>
                <td>{{ booking.branch }}</td>
                <td>{{ booking.hall }}</td>
                <td>{{ booking.show_time }}</td>
                <td>{{ booking.show_date }}</td>
                <td class="seats-column">{{ booking.seats.join(", ") }}</td>
                <td>{{ booking.price }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="booking-title">
        <h1>BookingHistory</h1>
      </div>
      <p v-if="!loading">No booking history available.</p>
      <p v-if="error">{{ error }}</p>
    </template>
  </div>
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";
import axios from "axios";
import { useUserStore } from "@/stores/userStore";
import { computed, onMounted, ref } from "vue";

export default {
  name: "BookingHistory",
  components: {
    HeaderPage,
  },
  setup() {
    const userStore = useUserStore();
    const userId = computed(() => userStore.userId);
    const bookings = ref([]);
    const loading = ref(false);
    const error = ref("");

    const groupSeatsByBookingId = (data) => {
      const groupedBookings = data.reduce((acc, booking) => {
        const { booking_id, seat_row, seat_number, ...rest } = booking;
        if (!acc[booking_id]) {
          acc[booking_id] = { ...rest, booking_id, seats: [] };
        }
        acc[booking_id].seats.push(`R${seat_row}S${seat_number}`);
        return acc;
      }, {});
      return Object.values(groupedBookings);
    };

    const fetchBookingHistory = async (userId) => {
      loading.value = true;
      try {
        const response = await axios.get(
          `http://localhost:8088/users/bookings/${userId}`
        );
        bookings.value = groupSeatsByBookingId(response.data.bookingDetails);
        error.value = "";
      } catch (error) {
        console.error("Error fetching booking history:", error);
        error.value =
          "Failed to fetch booking history. Please try again later.";
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      if (userId.value) {
        fetchBookingHistory(userId.value);
      }
    });

    return {
      userId,
      bookings,
      loading,
      error,
    };
  },
};
</script>

<style scoped>
.booking-title {
  margin: 20px 0 20px 0;
}

.booking-content {
  position: fixed;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.5s ease;
  padding: 15px;
  width: 80%;
  height: 80%;
  overflow-y: auto;
}

.booking-content::-webkit-scrollbar {
  display: none;
}
.table-wrapper {
  table-layout: fixed;
  margin-top: 0;
  position: relative;
}

.styled-table {
  border-collapse: collapse;
  margin: 0;
  font-size: 0.9em;
  font-family: sans-serif;
  width: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table thead tr {
  background-color: #212529;
  color: #ffffff;
  text-align: left;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
  background-color: white;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #212529;
}

.seats-column {
  max-width: 150px;
  word-wrap: break-word;
  white-space: pre-wrap;
}
</style>

<template>
    <div id="admin-booking">
      <div :class="{ 'shifted-content': isSidebarOpen }">
        <AdminAside @sidebar-toggled="handleSidebarToggle" />
        <div class="content">
          <div class="data-container">
            <div class="card-header">
              <h4>Booking List</h4>
              <div class="filter-container">
                <button @click="toggleFilter" class="filter-button">Filter</button>
                <div v-if="showFilter" class="filter-options">
                  <input
                    type="text"
                    v-model="filterBranch"
                    placeholder="Filter by Branch"
                    class="filter-input"
                  />
                  <input
                    type="text"
                    v-model="filterMovie"
                    placeholder="Filter by Movie"
                    class="filter-input"
                  />
                  <input
                    type="date"
                    v-model="filterDate"
                    class="filter-input"
                  />
                </div>
                <input
                  type="text"
                  v-model="searchTerm"
                  placeholder="Search by Customer Name or Email..."
                  class="search-input"
                />
                <button @click="fetchBookings" class="search-button">Search</button>
              </div>
            </div>
            <div class="table-wrapper">
              <table class="styled-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Branch</th>
                    <th>Customer Name</th>
                    <th>Movie Name</th>
                    <th>Hall</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Seats</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="booking in filteredBookings" :key="booking.booking_id">
                    <td>{{ booking.booking_id }}</td>
                    <td>{{ booking.branch }}</td>
                    <td>{{ booking.customer_name }}</td>
                    <td>{{ booking.movie_title }}</td>
                    <td>{{ booking.hall }}</td>
                    <td>{{ booking.show_date }}</td>
                    <td>{{ booking.show_time }}</td>
                    <td>{{ booking.seats }}</td>
                    <td>
                      <i class="bx bx-edit" @click="openUpdateModal(booking)"></i>
                      <i class="bx bx-trash" @click="confirmDelete(booking.booking_id)"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div v-if="showUpdateModal" class="modal">
          <div class="modal-content">
            <span class="close" @click="closeUpdateModal">&times;</span>
            <h2>Update Booking Seats</h2>
            <form @submit.prevent="updateBooking">
              <label for="seats">Seats (e.g., R1S1, R1S2):</label>
              <input type="text" v-model="newSeats" id="seats" class="update-input" required />
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import AdminAside from "@/components/AdminAside.vue";
  
  export default {
    name: "AdminBooking",
    components: {
      AdminAside,
    },
    data() {
      return {
        bookings: [],
        filterBranch: "",
        filterMovie: "",
        filterDate: "",
        searchTerm: "",
        isSidebarOpen: false,
        showFilter: false,
        showUpdateModal: false,
        selectedBooking: null,
        newSeats: "",
      };
    },
    mounted() {
      this.fetchBookings();
      window.addEventListener("resize", this.adjustSidebar);
    },
    unmounted() {
      window.removeEventListener("resize", this.adjustSidebar);
    },
    computed: {
      filteredBookings() {
        return this.bookings.filter(
          (booking) =>
            (!this.filterBranch ||
              booking.branch.toLowerCase().includes(this.filterBranch.toLowerCase())) &&
            (!this.filterMovie ||
              booking.movie_title.toLowerCase().includes(this.filterMovie.toLowerCase())) &&
            (!this.filterDate || booking.show_date === this.filterDate) &&
            (!this.searchTerm || booking.customer_name.toLowerCase().includes(this.searchTerm.toLowerCase()))
        );
      },
    },
    methods: {
      fetchBookings() {
        const params = new URLSearchParams();
        if (this.filterBranch) params.append("branch", this.filterBranch);
        if (this.filterMovie) params.append("movie", this.filterMovie);
        if (this.filterDate) params.append("date", this.filterDate);
        if (this.searchTerm) params.append("search", this.searchTerm);
  
        axios
          .get(`http://localhost:8088/api/bookings`, { params })
          .then((response) => {
            this.bookings = response.data.bookings.map(booking => ({
              ...booking,
              seats: booking.seats.split(', ').map(seat => seat).join(', ')
            }));
          })
          .catch((error) => {
            console.error("Error fetching bookings:", error);
          });
      },
      handleSidebarToggle(isOpen) {
        this.isSidebarOpen = isOpen;
      },
      adjustSidebar() {
        if (window.innerWidth < 992) {
          this.isSidebarOpen = false;
        } else {
          this.isSidebarOpen = true;
        }
      },
      confirmDelete(bookingId) {
        if (confirm("Are you sure you want to delete this booking?")) {
          this.deleteBooking(bookingId);
        }
      },
      deleteBooking(bookingId) {
        axios
          .delete(`http://localhost:8088/api/bookings/${bookingId}`)
          .then((response) => {
            this.fetchBookings();
            alert("Booking deleted successfully.");
          })
          .catch((error) => {
            console.error("Error deleting booking:", error);
            alert("Failed to delete booking. Error: " + (error.response.data.error || error.message));
          });
      },
      toggleFilter() {
        this.showFilter = !this.showFilter;
      },
      openUpdateModal(booking) {
        this.selectedBooking = booking;
        this.newSeats = booking.seats;
        this.showUpdateModal = true;
      },
      closeUpdateModal() {
        this.showUpdateModal = false;
        this.selectedBooking = null;
        this.newSeats = "";
      },
      updateBooking() {
        const updatedSeats = this.newSeats.split(', ').map(seat => {
          const [row, number] = seat.replace('R', '').split('S');
          return { seat_row: row, seat_number: number };
        });
  
        axios
          .put(`http://localhost:8088/api/bookings/${this.selectedBooking.booking_id}`, { seats: updatedSeats })
          .then((response) => {
            this.fetchBookings();
            this.closeUpdateModal();
            alert("Booking updated successfully.");
          })
          .catch((error) => {
            console.error("Error updating booking:", error);
            alert("Failed to update booking. Error: " + (error.response.data.error || error.message));
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .content {
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
  
  .content::-webkit-scrollbar {
    display: none;
  }
  
  .card-display-container {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
  
  .card {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .card-header {
    background-color: #212529;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
  }
  
  .card-header h4 {
    margin: 0;
  }
  
  .data-container {
    margin-top: 20px;
  }
  
  .filter-container {
    display: flex;
    align-items: center;
  }
  
  .filter-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .filter-button:hover {
    background-color: #0056b3;
  }
  
  .filter-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-left: 10px;
  }
  
  .filter-input {
    color: black;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .search-input {
    color: black;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-left: 8px;
    width: 300px;
  }
  
  .search-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-left: 8px;
  }
  
  .search-button:hover {
    background-color: #0056b3;
  }
  
  .table-wrapper {
    margin-top: 0;
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
  
  button {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #c82333;
  }
  
  .bx {
    font-size: 1.5em;
    cursor: pointer;
    margin: 0 5px;
  }
  
  .bx-edit {
    color: #007bff;
  }
  
  .bx-edit:hover {
    color: #0056b3;
  }
  
  .bx-trash {
    color: #dc3545;
  }
  
  .bx-trash:hover {
    color: #c82333;
  }
  
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 500px;
    max-width: 80%;
  }
  
  .update-input {
    display: block;
    width: 100%;
    padding: 8px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
  }
  </style>
  
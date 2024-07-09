<template>
  <div :class="{ 'shifted-content': isSidebarOpen }">
    <AdminAside @sidebar-toggled="handleSidebarToggle" />
    <div class="content">
      <div class="card-header">
        <h4>User</h4>
        <div class="search-container">
          <input
            type="text"
            v-model="searchTerm"
            placeholder="Search by name or email..."
          />
          <button @click="searchUsers">Search</button>
        </div>
      </div>
      <div class="table-wrapper">
        <table class="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Registration Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.user_id">
              <td>{{ user.user_id }}</td>
              <td>{{ user.full_name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ formatDate(user.date_of_birth) }}</td>
              <td>{{ formatDateTime(user.registration_date) }}</td>
              <td>
                <button @click="confirmDelete(user.user_id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AdminAside from "@/components/AdminAside.vue";

export default {
  name: "AdminUser",
  components: {
    AdminAside,
  },
  data() {
    return {
      users: [],
      searchTerm: "",
      isSidebarOpen: false,
    };
  },
  mounted() {
    this.fetchUsers();
    window.addEventListener("resize", this.adjustSidebar);
  },
  unmounted() {
    window.removeEventListener("resize", this.adjustSidebar);
  },
  computed: {
    filteredUsers() {
      if (!this.searchTerm) {
        return this.users;
      }
      const term = this.searchTerm.toLowerCase();
      return this.users.filter(
        (user) =>
          user.full_name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term)
      );
    },
  },
  methods: {
    fetchUsers() {
      axios
        .get("http://localhost:8088/users")
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    formatDateTime(dateTime) {
      return new Date(dateTime).toLocaleString();
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
    confirmDelete(userId) {
      if (confirm("Are you sure you want to delete this user?")) {
        this.deleteUser(userId);
      }
    },
    deleteUser(userId) {
      axios
        .delete(`http://localhost:8088/users/${userId}`)
        .then((response) => {
          this.fetchUsers();
          alert("User deleted successfully.");
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          alert("Failed to delete user. Error: " + error.response.data.error);
        });
    },
    searchUsers() {
      this.fetchUsers();
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
}

.shifted-content {
  margin-left: 250px;
  transition: all 0.5s ease;
}

.card-header {
  background-color: #212529;
  border-radius: 10px 10px 0 0;
  margin-bottom: 0;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h4 {
  color: #ffffff;
  margin: 0;
}

.search-container {
  display: flex;
  align-items: center;
}

.search-container input[type="text"] {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 8px;
  width: 300px;
}

.search-container button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-container button:hover {
  background-color: #0056b3;
}

.table-wrapper {
  overflow-x: auto;
  min-width: 600px;
}

.styled-table {
  border-collapse: collapse;
  margin: 0;
  font-size: 0.9em;
  font-family: sans-serif;
  width: 100%;
  min-width: 600px;

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

.styled-table tbody tr.active-row {
  font-weight: bold;
  color: #212529;
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
</style>

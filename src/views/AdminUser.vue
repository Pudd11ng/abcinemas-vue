<template>
  <div id="admin-user">
    <div :class="{ 'shifted-content': isSidebarOpen }">
      <AdminAside @sidebar-toggled="handleSidebarToggle" />
      <div class="content">
        <div class="card-display-container">
          <div class="card chart-card">
            <div class="card-header">
              <h4>User Registration Chart</h4>
            </div>
            <div class="chart-container">
              <CanvasJSChart :options="options" />
            </div>
          </div>
          <div class="card total-users-card">
            <div class="card-header">
              <h4>Total Registered Users</h4>
            </div>
            <div class="card-content">
              <p>{{ users.length }}</p>
            </div>
          </div>
        </div>

        <div class="data-container">
          <div class="card-header">
            <h4>User List</h4>
            <div class="search-container">
              <input
                type="text"
                v-model="searchTerm"
                placeholder="Search by name or email..."
                class="search-input"
              />
              <button @click="searchUsers" class="search-button">Search</button>
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
      options: {
        theme: "light2",
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "User Registration Dates Per Month",
        },
        axisX: {
          valueFormatString: "MMMM",
          interval: 1,
          intervalType: "month",
        },
        axisY: {
          title: "Number of Users",
          suffix: "",
        },
        toolTip: {
          shared: true,
        },
        height: 250,
        data: [
          {
            type: "spline",
            xValueFormatString: "MMM",
            yValueFormatString: "#,###",
            name: "Registrations",
            dataPoints: [],
          },
        ],
      },
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
  methods: {    fetchUsers() {
      axios
        .get("http://localhost:8088/api/users")
        .then((response) => {
          if (response.data.success) {
            this.users = response.data.data;
          } else {
            this.users = [];
            console.error("Error in API response:", response.data.error);
          }
          this.updateChart();
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
        .delete(`http://localhost:8088/api/users/${userId}`)
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
    updateChart() {
      const registrationCounts = this.users.reduce((acc, user) => {
        const month = new Date(user.registration_date).getMonth();
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, []);

      const dataPoints = Object.keys(registrationCounts).map((month) => ({
        x: new Date(0, month),
        y: registrationCounts[month],
      }));

      this.options = {
        ...this.options,
        data: [{ ...this.options.data[0], dataPoints }],
      };

      this.$nextTick(() => {
        this.options = { ...this.options };
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

.chart-card {
  flex: 0 0 80%;
}

.total-users-card {
  flex: 0 0 20%;
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

.chart-container {
  padding: 20px;
  height: 280px;
}

.total-users-card .card-content {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-content p {
  font-size: 2rem;
  margin: 0;
}

.data-container {
  margin-top: 20px;
}

.search-container {
  display: flex;
  align-items: center;
}

.search-input {
  color: black;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 8px;
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
</style>

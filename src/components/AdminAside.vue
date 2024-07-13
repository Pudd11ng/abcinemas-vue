<template>
  <div class="sidebar" :class="{ open: isSidebarOpen }">
    <div class="logo-details">
      <i class="bx bx-right-arrow icon"></i>
      <div class="logo_name">ABCinemas</div>
      <i class="bx bx-menu" @click="toggleSidebar" id="btn"></i>
    </div>
    <!-- find your icon here boxicons.com-->
    <ul class="nav-list">
      <li>
        <router-link to="/admin-user" @click="updatePageTitle('User Management')">
          <i class="bx bx-user"></i>
          <span class="links_name">User</span>
        </router-link>
        <span class="tooltip">User</span>
      </li>
      <li>
        <router-link to="/admin-bookings" @click="updatePageTitle('Bookings Management')">
          <i class="bx bx-bookmark"></i>
          <span class="links_name">Bookings</span>
        </router-link>
        <span class="tooltip">Bookings</span>
      </li>
      <li>
        <a @click="logout">
          <i class="bx bx-log-out"></i>
          <span class="links_name">Logout</span>
        </a>
        <span class="tooltip">Logout</span>
      </li>
    </ul>
  </div>
  <div class="blue-flag"></div>
  <div class="title">
    <h1>{{ pageTitle }}</h1>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/userStore";
import router from "@/router/index.js";

export default {
  name: "AdminAside",
  data() {
    return {
      isSidebarOpen: false,
      pageTitle: "User Management",
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
      this.$emit("sidebar-toggled", this.isSidebarOpen);
    },
    updatePageTitle(title) {
      this.pageTitle = title;
    },
    logout() {
      const userStore = useUserStore();
      userStore.clearUser();
      router.push({ path: "/" });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");
@import url("https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css");

.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 78px;
  background: #11101d;
  padding: 6px 14px;
  z-index: 99;
  transition: all 0.5s ease;
}
.sidebar.open {
  width: 250px;
}
.sidebar .logo-details {
  height: 60px;
  display: flex;
  align-items: center;
  position: relative;
}
.sidebar .logo-details .icon {
  opacity: 0;
  transition: all 0.5s ease;
}
.sidebar .logo-details .logo_name {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  opacity: 0;
  transition: all 0.5s ease;
}
.sidebar.open .logo-details .icon,
.sidebar.open .logo-details .logo_name {
  opacity: 1;
}
.sidebar .logo-details #btn {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  font-size: 23px;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s ease;
}
.sidebar.open .logo-details #btn {
  text-align: right;
}
.sidebar i {
  color: #fff;
  height: 60px;
  min-width: 50px;
  font-size: 28px;
  text-align: center;
  line-height: 60px;
}
.sidebar .nav-list {
  margin-top: 20px;
  height: 100%;
}
.sidebar li {
  position: relative;
  margin: 8px 0;
  list-style: none;
}
.sidebar li .tooltip {
  position: absolute;
  top: -20px;
  left: calc(100% + 15px);
  z-index: 3;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 400;
  opacity: 0;
  white-space: nowrap;
  pointer-events: none;
  transition: 0s;
}
.sidebar li:hover .tooltip {
  opacity: 1;
  pointer-events: auto;
  transition: all 0.4s ease;
  top: 50%;
  transform: translateY(-50%);
}
.sidebar.open li .tooltip {
  display: none;
}
.sidebar input {
  font-size: 15px;
  color: #fff;
  font-weight: 400;
  outline: none;
  height: 50px;
  width: 100%;
  width: 50px;
  border: none;
  border-radius: 12px;
  transition: all 0.5s ease;
  background: #1d1b31;
}
.sidebar.open input {
  padding: 0 20px 0 50px;
  width: 100%;
}
.sidebar .bx-search {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  font-size: 22px;
  background: #1d1b31;
  color: #fff;
}
.sidebar.open .bx-search:hover {
  background: #1d1b31;
  color: #fff;
}
.sidebar .bx-search:hover {
  background: #fff;
  color: #11101d;
}
.sidebar li a {
  display: flex;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  align-items: center;
  text-decoration: none;
  transition: all 0.4s ease;
  background: #11101d;
}
.sidebar li a:hover {
  background: #fff;
}
.sidebar li a .links_name {
  color: #fff;
  font-size: 15px;
  font-weight: 400;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: 0.4s;
}
.sidebar.open li a .links_name {
  opacity: 1;
  pointer-events: auto;
}
.sidebar li a:hover .links_name,
.sidebar li a:hover i {
  transition: all 0.5s ease;
  color: #11101d;
}

.blue-flag {
  top: 0;
  left: 0;
  min-height: 300px;
  background-color: #12407053;
  position: absolute;
  width: 100%;
  z-index: -1;
}

.title {
  color: #11101d;
  top: 3%;
  left: 20%;
  position: absolute;
  z-index: 1;
}
</style>

<template> 
  <div id="admin-booking"> 
    <div :class="{ 'shifted-content': isSidebarOpen }"> 
      <AdminAside @sidebar-toggled="handleSidebarToggle" /> 
      <div class="content"> 
        <div class="data-container"> 
          <div class="card-header"> 
            <h4>Movie Lists</h4> 
            <div class="filter-container"> 
              <input 
                type="text" 
                v-model="searchTerm" 
                placeholder="Search by Movie Lists" 
                class="search-input" 
              /> 
              <button @click="fetchMovies" class="search-button">Search</button> 
              <button @click="openAddModal" class="add-button">Add Movie</button> 
            </div> 
          </div> 
          <div class="table-wrapper"> 
            <table class="styled-table"> 
              <thead> 
                <tr> 
                  <th>ID</th> 
                  <th>Title</th> 
                  <th>Description</th> 
                  <th>Genre</th> 
                  <th>Duration</th> 
                  <th>Action</th> 
                </tr> 
              </thead> 
              <tbody> 
                <tr v-for="movie in filteredMovies" :key="movie.id"> 
                  <td>{{ movie.id }}</td> 
                  <td>{{ movie.title }}</td> 
                  <td>{{ movie.description }}</td> 
                  <td>{{ movie.genre }}</td> 
                  <td>{{ movie.duration }}</td> 
                  <td> 
                    <i class="bx bx-edit" @click="openUpdateModal(movie)"></i> 
                    <i class="bx bx-trash" @click="confirmDelete(movie.id)"></i> 
                  </td> 
                </tr> 
              </tbody> 
            </table> 
          </div> 
        </div> 
      </div> 
 
      <!-- Add Movie Modal --> 
      <div v-if="showAddModal" class="modal"> 
        <div class="modal-content"> 
          <span class="close" @click="closeAddModal">&times;</span> 
          <h2>Add Movie</h2> 
          <form @submit.prevent="addMovie"> 
            <label for="title">Title:</label> 
            <input type="text" v-model="newMovie.title" id="title" class="update-input" required /> 
 
            <label for="description">Description:</label> 
            <textarea v-model="newMovie.description" id="description" class="update-input"></textarea> 
 
            <label for="genre">Genre:</label> 
            <input type="text" v-model="newMovie.genre" id="genre" class="update-input" required /> 
 
            <label for="duration">Duration:</label> 
            <input type="number" v-model="newMovie.duration" id="duration" class="update-input" required /> 
 
            <button type="submit">Add</button> 
          </form> 
        </div> 
      </div> 
 
      <!-- Update Movie Modal --> 
      <div v-if="showUpdateModal" class="modal"> 
        <div class="modal-content"> 
          <span class="close" @click="closeUpdateModal">&times;</span> 
          <h2>Update Movie</h2> 
          <form @submit.prevent="updateMovie"> 
            <label for="title">Title:</label> 
            <input type="text" v-model="selectedMovie.title" id="title" class="update-input" required /> 
 
            <label for="description">Description:</label> 
            <textarea v-model="selectedMovie.description" id="description" class="update-input"></textarea> 
 
            <label for="genre">Genre:</label> 
            <input type="text" v-model="selectedMovie.genre" id="genre" class="update-input" required /> 
 
            <label for="duration">Duration:</label> 
            <input type="number" v-model="selectedMovie.duration" id="duration" class="update-input" required /> 
 
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
  name: "AdminMovie", 
  components: { 
    AdminAside, 
  }, 
  data() { 
    return { 
      movies: [], 
      searchTerm: "",
      isSidebarOpen: false,
      showAddModal: false,
      showUpdateModal: false,
      selectedMovie: null,
      newMovie: {
        title: "",
        description: "",
        genre: "",
        duration: null,
      },
    };
  },
  mounted() {
    this.fetchMovies();
    window.addEventListener("resize", this.adjustSidebar);
  },
  unmounted() {
    window.removeEventListener("resize", this.adjustSidebar);
  },
  methods: {
    fetchMovies() {
      const params = new URLSearchParams();
      if (this.searchTerm) params.append("search", this.searchTerm);

      axios
        .get(`http://localhost:8088/movies`, { params })
        .then((response) => {
          console.log("Movies fetched:", response.data.movies); // Add this line
          this.movies = response.data.movies;
          console.log("Movies state:", this.movies); // Add this line
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
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
    confirmDelete(id) {
      if (confirm("Are you sure you want to delete this movie?")) {
        this.deleteMovie(id);
      }
    },
    deleteMovie(id) {
      axios
        .delete(`http://localhost:8088/movies/${id}`)
        .then((response) => {
          this.fetchMovies();
          alert("Movie deleted successfully.");
        })
        .catch((error) => {
          console.error("Error deleting movie:", error);
          alert("Failed to delete movie. Error: " + (error.response.data.error || error.message));
        });
    },
    openAddModal() {
      this.showAddModal = true;
    },
    closeAddModal() {
      this.showAddModal = false;
      this.newMovie = {
        title: "",
        description: "",
        genre: "",
        duration: null,
      };
    },
    addMovie() {
      axios
        .post(`http://localhost:8088/movies`, this.newMovie)
        .then((response) => {
          this.fetchMovies();
          this.closeAddModal();
          alert("Movie added successfully.");
        })
        .catch((error) => {
          console.error("Error adding movie:", error);
          alert("Failed to add movie. Error: " + (error.response.data.error || error.message));
        });
    },
    openUpdateModal(movie) {
      this.selectedMovie = { ...movie };
      this.showUpdateModal = true;
    },
    closeUpdateModal() {
      this.showUpdateModal = false;
      this.selectedMovie = null;
    },
    updateMovie() {
      axios
        .put(`http://localhost:8088/movies/${this.selectedMovie.id}`, this.selectedMovie)
        .then((response) => {
          this.fetchMovies();
          this.closeUpdateModal();
          alert("Movie updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating movie:", error);
          alert("Failed to update movie. Error: " + (error.response.data.error || error.message));
        });
    },
  },
  computed: {
    filteredMovies() {
      console.log("Filtered Movies:", this.movies); // Add this line
      if (!this.searchTerm) {
        return this.movies;
      }
      const term = this.searchTerm.toLowerCase();
      return this.movies.filter(
        (movie) =>
          movie.id.toString().includes(term) ||
          movie.title.toLowerCase().includes(term)
      );
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
  
  .filter-button,
  .add-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-left: 8px;
  }
  
  .filter-button:hover,
  .add-button:hover {
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
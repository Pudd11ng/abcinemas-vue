<template>
  <div id="home-page">
    <HeaderPage />
    <main>
      <h2 class="movies-heading">Movies Currently On Screen</h2>
      <div class="movies-grid">
        <div 
          class="movie-item" 
          v-for="movie in moviesOnScreen" 
          :key="movie.id" 
          @mouseover="hoverMovie = movie.id" 
          @mouseleave="hoverMovie = null"
        >
          <img :src="movie.poster" :alt="movie.title" />
          <div class="movie-info" v-if="hoverMovie === movie.id">
            <h3>{{ movie.title }}</h3>
            <p>{{ movie.description }}</p>
          </div>
        </div>
      </div>
      <div class="movie-list">
        <h3>Movie List:</h3>
        <ul>
          <li v-for="movie in moviesOnScreen" :key="movie.id">
            {{ movie.title }}
            <router-link :to="{ name: 'TicketBooking', params: { movieId: movie.id }}" class="movie-list-item">
              <button class="book-tickets-btn">Book Tickets</button>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="cinema-features">
        <h3>Cinema Features: </h3>
      </div>
    </main>
  </div>
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";

export default {
  name: "SignIn",
  components: {
    HeaderPage,
  },
  data() {
    return {
      hoverMovie: null,
      moviesOnScreen: [
        // Example movies, replace with actual data
        { id: 1, title: 'How to Make Millions Before Grandma Dies', description: 'Description of Movie 1', poster:''  },
        { id: 2, title: 'The Garfield Movie', description: 'Description of Movie 2', poster: 'path/to/poster2.jpg' },
        { id: 3, title: 'Furiosa: A Mad Max Saga', description: 'Description of Movie 3', poster: 'path/to/poster3.jpg' },
        { id: 4, title: 'The Fall Guy', description: 'Description of Movie 4', poster: 'path/to/poster4.jpg' },
        { id: 5, title: 'Kingdom Of The Planet Of The Apes', description: 'Description of Movie 5', poster: 'path/to/poster5.jpg' },
        { id: 6, title: 'Hakiyu!! The Dumpster Battle', description: 'Description of Movie 6', poster: 'path/to/poster6.jpg' }
      ]
    };
  },
  created() {
    this.fetchMoviesOnScreen();
  },
  methods: {
    async fetchMoviesOnScreen() {
      try {
        // Replace with actual API call
        // const response = await axios.get('/api/movies-on-screen');
        // this.moviesOnScreen = response.data;

        // Example static data
        this.moviesOnScreen = [
          { id: 1, title: 'How to Make Million Before Grandma Dies', description: 'Description of Movie 1', poster: 'path/to/poster1.jpg' },
          { id: 2, title: 'The Garfield Movie', description: 'Description of Movie 2', poster: 'path/to/poster2.jpg' },
          { id: 3, title: 'Furiosa: A Mad Max Saga', description: 'Description of Movie 3', poster: 'path/to/poster3.jpg' },
          { id: 4, title: 'The Fall Guy', description: 'Description of Movie 4', poster: 'path/to/poster4.jpg' },
          { id: 5, title: 'Kingdom Of The Planet Of The Apes', description: 'Description of Movie 5', poster: 'path/to/poster5.jpg' },
          { id: 6, title: 'Hakiyu!! The Dumpster Battle', description: 'Description of Movie 6', poster: 'path/to/poster6.jpg' }
        ];
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }
  }
}
</script>

<style scoped>
#home-page {
  padding: 0 20px;
}

.movies-heading {
  margin: 20px 0 0 0;
  font-size: 24px;
  font-weight: bold;
  text-align: left;
}

.main-content {
  padding: 20px 0;
}

.movies-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
}

.movie-item {
  position: relative;
  margin: 10px;
  cursor: pointer;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  width: calc(33.33% - 10px);
}

.movie-item:hover {
  transform: scale(1.05);
}

.movie-item img {
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
}

.movie-info {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  border-radius: 10px;
}

.movie-info h3 {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: bold;
}

.movie-info p {
  margin: 0;
  font-size: 16px;
}

.movie-item:hover .movie-info {
  opacity: 1;
}

.movie-list h3 {
  font-size: 20px;
  font-weight: bold;
}

.movie-list ul {
  list-style: none;
  padding: 0;
}

.movie-list-item {
  width: calc(50% - 10px); /* Two items per row with 10px spacing */
  margin-bottom: 20px;
}

.movie-list li router-link {
  text-decoration: none;
  background-color: #007bff;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  display: inline-block;
}

.book-tickets-btn {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
}

.book-tickets-btn:hover {
  background-color: #0056b3;
}

.movie-list li {
  margin-bottom: 10px;
}
</style>
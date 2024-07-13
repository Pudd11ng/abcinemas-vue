<template>
  <div id="home-page">
    <HeaderPage />
    <main>
      <h2 class="movies-heading">Movies Currently On Screen</h2>
      <div class="movie-carousel">
        <button class="carousel-btn left" @click="scrollLeft">&#9664;</button>
        <div class="carousel-container" ref="carousel">
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
        <button class="carousel-btn right" @click="scrollRight">&#9654;</button>
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
        <div 
          class="features-item" 
          v-for="features in cinemaFeatures" 
          :key="features.id" 
          @mouseover="hoverFeatures = features.id" 
          @mouseleave="hoverFeatures = null"
        >
          <img :src="features.poster" :alt="features.title" />
          <div class="features-info" v-if="hoverFeatures === features.id">
            <h3>{{ features.title }}</h3>
            <p>{{ features.description }}</p>
          </div>
        </div>
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
        { id: 1, title: 'How to Make Millions Before Grandma Dies', description: 'M, a university dropout low on money and luck, volunteers to take care of his terminally ill Amah in the hopes for an inheritance.', poster : require("@/assets/images/HowToMakeMillions.jpeg")},
        { id: 2, title: 'The Garfield Movie', description: 'After an unexpected reunion with his long-lost father, the street cat Vic, Garfield is forced to leave his very comfortable life with Harald behind. Together with Vic and Odie, he plans a crazy robbery.', poster: require("@/assets/images/garfield.jpeg") },
        { id: 3, title: 'Furiosa: A Mad Max Saga', description: 'Snatched from the Green Place of Many Mothers, young Furiosa falls into the hands of a great biker horde led by the warlord Dementus. Sweeping through the Wasteland, they come across the Citadel, presided over by the Immortan Joe. As the two tyrants fight for dominance, Furiosa soon finds herself in a nonstop battle to make her way home.', poster: require("@/assets/images/furiosa.jpeg") },
        { id: 4, title: 'The Fall Guy', description: 'After leaving the business one year earlier, battle-scarred stuntman Colt Seavers springs back into action when the star of a big studio movie suddenly disappears. As the mystery surrounding the missing actor deepens, Colt soon finds himself ensnared in a sinister plot that pushes him to the edge of a fall more dangerous than any stunt.', poster: require("@/assets/images/fall guy.jpeg") },
        { id: 5, title: 'Kingdom Of The Planet Of The Apes', description: 'Many years after the reign of Caesar, a young ape goes on a journey that will lead him to question everything he has been taught about the past and make choices that will define a future for apes and humans alike.', poster: require("@/assets/images/planetoftheapes.jpeg") },
        { id: 6, title: 'Hakiyu!! The Dumpster Battle', description: 'Shoyo Hinata joins Karasuno high school of volleyball team to emulate his idol, the Little Giant ,but he has to team up with Tobio Kageyama, his former rival.', poster: require("@/assets/images/hakiyuu.jpeg") }
      ],
      cinemaFeatures: [
        { title: 'IMAX Screens', description: 'Experience movies like never before.', poster:  require("@/assets/images/imax.jpeg") },
        { title: 'Dolby Atmos Sound', description: 'Crystal clear sound quality for an immersive experience.', poster:  require("@/assets/images/dolbyatmos.jpeg")},
        { title: 'Luxury Seating', description: 'Relax in our comfortable and luxurious seats.', poster:  require("@/assets/images/luxuryseating.jpeg")},
        // Add more features as needed
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
          { id: 1, title: 'How to Make Million Before Grandma Dies', description: 'M, a university dropout low on money and luck, volunteers to take care of his terminally ill Amah in the hopes for an inheritance.', poster: require("@/assets/images/HowToMakeMillions.jpeg") },
          { id: 2, title: 'The Garfield Movie', description: 'After an unexpected reunion with his long-lost father, the street cat Vic, Garfield is forced to leave his very comfortable life with Harald behind. Together with Vic and Odie, he plans a crazy robbery.', poster: require("@/assets/images/garfield.jpeg") },
          { id: 3, title: 'Furiosa: A Mad Max Saga', description: 'Snatched from the Green Place of Many Mothers, young Furiosa falls into the hands of a great biker horde led by the warlord Dementus. Sweeping through the Wasteland, they come across the Citadel, presided over by the Immortan Joe. As the two tyrants fight for dominance, Furiosa soon finds herself in a nonstop battle to make her way home.', poster: require("@/assets/images/furiosa.jpeg") },
          { id: 4, title: 'The Fall Guy', description: 'After leaving the business one year earlier, battle-scarred stuntman Colt Seavers springs back into action when the star of a big studio movie suddenly disappears. As the mystery surrounding the missing actor deepens, Colt soon finds himself ensnared in a sinister plot that pushes him to the edge of a fall more dangerous than any stunt.', poster: require("@/assets/images/fall guy.jpeg") },
          { id: 5, title: 'Kingdom Of The Planet Of The Apes', description: 'Many years after the reign of Caesar, a young ape goes on a journey that will lead him to question everything he has been taught about the past and make choices that will define a future for apes and humans alike.', poster: require("@/assets/images/planetoftheapes.jpeg") },
          { id: 6, title: 'Hakiyu!! The Dumpster Battle', description: 'Shoyo Hinata joins Karasuno high school has volleyball team to emulate his idol, the Little Giant; but he has to team up with Tobio Kageyama, his former rival.', poster: require("@/assets/images/hakiyuu.jpeg")  }
        ];
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }
  },
  async fetchFeaturesonScreen(){
    try {
        this.cinemaFeatures = [
          { id: 1, title: 'IMAX Screens', description: 'Experience movies like never before.', poster: require("@/assets/images/imax.jpeg") },
          { id: 2, title: 'Dolby Atmos Sound', description: 'Crystal clear sound quality for an immersive experience.', poster:  require("@/assets/images/dolbyatmos.jpeg")},
          { id: 3, title: 'Luxury Seating', description: 'Relax in our comfortable and luxurious seats.', image:  require("@/assets/images/luxuryseating.jpeg") }
        ];
      } catch (error) {
        console.error('Error fetching Features:', error);
      }
  },
  scrollLeft() {
      this.$refs.carousel.scrollBy({ left: -200, behavior: 'smooth' });
    },
    scrollRight() {
      this.$refs.carousel.scrollBy({ left: 200, behavior: 'smooth' });
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

.movie-carousel {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  overflow: hidden;
}

.carousel-container {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 20px;
  padding: 20px;
  flex-grow: 1;
  width: calc(200px * 3 + 40px * 2); 
}

.carousel-btn {
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 20px;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

.carousel-btn.left {
  left: 0;
}

.carousel-btn.right {
  right: 0;
}

.movie-item {
  position: relative;
  margin: 10px;
  cursor: pointer;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  width: 200px;
}

.movie-item:hover {
  transform: scale(1.05);
}

.movie-item img {
  width: 100%;
  height: 100%;
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

.cinema-features {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.cinema-features h3 {
  font-size: 2em;
  margin-bottom: 20px;
  color: #333;
}

.features-item {
  display: inline-block;
  margin: 10px;
  position: relative;
  width: 200px;
  height: 300px;
  border: 2px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.features-item:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.features-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-bottom: 2px solid #ddd;
}

.features-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 10px;
  text-align: left;
}

.features-info h3 {
  margin: 0;
  font-size: 1.2em;
}

.features-info p {
  margin: 5px 0 0;
  font-size: 0.9em;
}
</style>
<template>
  <div id="movielist">
    <HeaderPage />
    <nav>
      <ul>
        <li
          v-for="section in sections"
          :key="section.name"
          :class="{ active: currentSection === section.name }"
          @click="currentSection = section.name"
        >
          {{ section.displayName }}
        </li>
      </ul>
    </nav>
    <div class="movie-list" v-if="currentSection">
      <div class="movie-category">
        <h2>{{ currentSection }}</h2>
        <div class="movie-posters">
          <div
            class="movie-poster"
            v-for="movie in getMovies(currentSection)"
            :key="movie.id"
          >
            <div class="poster-img">
              <img :src="movie.poster" :alt="movie.title" />
            </div>
            <p>{{ movie.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderPage from '@/components/HeaderPage.vue';

export default {
  name: 'MoviesList',
  components: {
    HeaderPage,
  },
  data() {
    return {
      currentSection: 'Now Showing',
      sections: [
        { name: 'Now Showing', displayName: 'Now Showing' },
        { name: 'Advance Sales', displayName: 'Advance Sales' },
        { name: 'Coming Soon', displayName: 'Coming Soon' },
        { name: 'Getha Lux Suite', displayName: 'Getha Lux Suite' },
        { name: 'International Screens', displayName: 'International Screens' },
        { name: 'Film Festivals', displayName: 'Film Festivals' }
      ],
      movies: {
        'Now Showing': [
          { id: 1, title: "How to Make Millions Before Grandma Dies", poster: "path/to/how_to_make_millions_before_grandma_dies.jpg" },
          { id: 2, title: "Inside Out 2", poster: "path/to/inside_out_2.jpg" },
          { id: 3, title: "Bad Boys Ride or Die", poster: "path/to/bad_boys_ride_or_die.jpg" },
          { id: 4, title: "I Not Stupid 3", poster: "path/to/i_not_stupid_3.jpg" }
        ],
        'Advance Sales': [
          { id: 5, title: "Avatar 3", poster: "path/to/avatar_3.jpg" },
          { id: 6, title: "Fast & Furious 10", poster: "path/to/fast_and_furious_10.jpg" }
        ],
        'Coming Soon': [
          { id: 7, title: "Mission Impossible 7", poster: "path/to/mission_impossible_7.jpg" },
          { id: 8, title: "Guardians of the Galaxy Vol. 3", poster: "path/to/guardians_of_the_galaxy_vol_3.jpg" }
        ],
        'Getha Lux Suite': [
          { id: 9, title: "Inception", poster: "path/to/inception.jpg" },
          { id: 10, title: "Interstellar", poster: "path/to/interstellar.jpg" }
        ],
        'International Screens': [
          { id: 11, title: "Parasite", poster: "path/to/parasite.jpg" },
          { id: 12, title: "Spirited Away", poster: "path/to/spirited_away.jpg" }
        ],
        'Film Festivals': [
          { id: 13, title: "The French Dispatch", poster: "path/to/the_french_dispatch.jpg" },
          { id: 14, title: "Cannes Short Films", poster: "path/to/cannes_short_films.jpg" }
        ]
      }
    };
  },
  methods: {
    getMovies(category) {
      return this.movies[category] || [];
    }
  }
};
</script>

<style>
nav ul {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 20px;
}

nav li {
  cursor: pointer;
  font-size: 1.2em;
  color: #ffd700;
  padding: 10px 20px;
  transition: background-color 0.3s, color 0.3s;
  margin: 0 10px;
  border-radius: 5px;
}

nav li:hover,
nav li.active {
  background-color: #ff4500;
  color: #fff;
}

.movie-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.movie-category {
  margin-top: 20px;
  width: 80%;
}

.movie-category h2 {
  font-size: 2em;
  margin-bottom: 20px;
  border-bottom: 2px solid #ff4500;
  padding-bottom: 10px;
}

.movie-posters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.movie-poster {
  width: 23%;
  margin: 10px;
  text-align: center;
  background-color: #2c2c2c;
  padding: 15px;
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.movie-poster:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
}

.poster-img {
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 10px;
}

.poster-img img {
  width: 100%;
  height: auto;
  transition: transform 0.3s;
}

.movie-poster:hover img {
  transform: scale(1.1);
}

.movie-poster p {
  margin-top: 10px;
  font-size: 1.1em;
  color: #ffd700;
}

@media (max-width: 768px) {
  .movie-poster {
    width: 45%;
  }
}

@media (max-width: 480px) {
  .movie-poster {
    width: 90%;
  }
}
</style>
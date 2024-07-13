<template>
  <div id="movielist">
    <HeaderPage />
    <main>
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
  </main>
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
          { id: 4, title: "I Not Stupid 3", poster: "path/to/i_not_stupid_3.jpg" },
          { id: 5, title: "Gold", poster:""},
          { id: 6, title: "Fly Me to The Moon", poster:""},
          { id: 7, title: "Indian 2", poster:""},
          { id: 8, title: "Longlegs", poster:""},
          { id: 9, title: "Detective Conan: The Million-Dollar Pentagram", poster:""},
          { id: 10, title: "Twisters", poster:""},
          { id: 11, title: "Despicable Me 4", poster:""},
          { id: 12, title: "Customs Frontline", poster:""},
          { id: 13, title: "A Quiet Place: Day One", poster:""},
          { id: 14, title: "Crisis Negotiator", poster:""},
          { id: 15, title: "Kalki 2898 AD(Tamil)", poster:""},
          { id: 16, title: "Project Silence", poster:""},
          { id: 17, title: "Welcome to My Side", poster:""},
          { id: 18, title: "Ipar Adalah Maut", poster:""},
          { id: 19, title: "Marni: The Story of Wawa Gombel", poster:""},
          { id: 20, title: "Haunted Universities 3", poster:""},
        ],
        'Advance Sales': [
          { id: 13, title: "The Animal Kingdom", poster: "path/to/avatar_3.jpg" },
          { id: 14, title: "World Tour: Born Pink in Cinemas", poster: "path/to/fast_and_furious_10.jpg" },
          { id: 15, title: "Ride Above", poster:""},
          { id: 16, title: "The Three Musketeers Milady", poster:""},
          { id: 17, title: "Le Petit Nicolas", poster:""}
        ],
        'Coming Soon': [
          { id: 18, title: "Deadpool and Wolverine", poster: "path/to/mission_impossible_7.jpg" },
          { id: 19, title: "Borderlands", poster: "path/to/guardians_of_the_galaxy_vol_3.jpg" },
          { id: 20, title: "The Crow", poster:""},
          { id: 21, title: "Transformer ONE", poster:""},
          { id: 22, title: "Joker: DEUX", poster:""},
          { id: 23, title: "Venom: The Last Dance", poster:""},
          { id: 24, title: "Moana 2", poster:""},
          { id: 25, title: "Sonic 3: The Hedgehog", poster: ""}
        ],
        'Getha Lux Suite': [
          { id: 26, title: "Despicable Me 4", poster: "path/to/inception.jpg" },
          { id: 27, title: "Inside Out 2", poster: "path/to/interstellar.jpg" },
          { id: 28, title: "A Quiet Place Day One", poster: ""},
          { id: 29, title: "Tarot", poster:""}
        ],
        'International Screens': [
          { id: 30, title: "Parasite", poster: "path/to/parasite.jpg" },
          { id: 31, title: "Brighton 4", poster: "path/to/spirited_away.jpg" }
        ],
        'Film Festivals': [
          { id: 32, title: "Le French Festivals", poster: "path/to/the_french_dispatch.jpg" }
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

<style scoped>
main {
  padding: 20px 0;
  margin-top: 600px; /* Adjust based on the height of your HeaderPage */
}

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
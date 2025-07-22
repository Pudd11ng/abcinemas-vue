<template>
  <div class="rating-reviews-page">
    <HeaderPage />
    <main>
      <h2>Movie List</h2>
      <div class="movie-selection">
        <select v-model="selectedMovieId" @change="updateSelectedMovie">
          <option v-for="movie in movies" :key="movie.id" :value="movie.id">
            {{ movie.title }}
          </option>
        </select>
      </div>

      <div v-if="selectedMovie" class="movie-details">
        <h3>{{ selectedMovie.title }}</h3>
        <div class="reviews">
          <h4>Ratings & Reviews</h4>
          <ul v-if="selectedMovie.reviews && selectedMovie.reviews.length > 0">
            <li v-for="review in selectedMovie.reviews" :key="review.review_id">
              <em>{{ review.rating }}/5</em> - {{ review.review }}
              <button @click="editReview(review)">Edit</button>
              <button @click="deleteReview(review.review_id)">Delete</button>
            </li>
          </ul>
          <p v-else>No reviews available for this movie.</p>
          <button @click="toggleReviewForm">
            {{ isEditing ? "Cancel Edit" : "Add Review" }}
          </button>
          <div v-if="showReviewForm" class="add-review">
            <h4>{{ isEditing ? "Update" : "Add" }} a Review</h4>
            <form @submit.prevent="submitReview">
              <div>
                <label for="rating">Rating:</label>
                <select id="rating" v-model.number="newReview.rating" required>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div>
                <label for="review">Review:</label>
                <textarea
                  id="review"
                  v-model="newReview.review"
                  required
                ></textarea>
              </div>
              <button type="submit">
                {{ isEditing ? "Update Review" : "Submit Review" }}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import HeaderPage from "@/components/HeaderPage.vue";

export default {
  name: "RatingReviewsPage",
  components: {
    HeaderPage,
  },
  data() {
    return {
      movies: [],
      selectedMovieId: null,
      selectedMovie: null,
      newReview: {
        rating: null,
        review: "",
      },
      showReviewForm: false,
      isEditing: false,
      editReviewId: null,
    };
  },
  methods: {
    fetchMovies() {
      axios
        .get("http://localhost:8088/api/movies")
        .then((response) => {
          this.movies = response.data.movies;
          console.log("Fetched movies:", this.movies);
          this.selectedMovieId =
            this.movies.length > 0 ? this.movies[0].id : null;
          this.updateSelectedMovie();
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
        });
    },
    updateSelectedMovie() {
      if (this.selectedMovieId) {
        axios
          .get(`http://localhost:8088/api/movies/${this.selectedMovieId}`)
          .then((response) => {
            this.selectedMovie = response.data;
            console.log("Selected movie:", this.selectedMovie);
          })
          .catch((error) => {
            console.error("Error fetching selected movie:", error);
          });
      }
    },    async submitReview() {
      try {
        const { selectedMovieId, newReview, isEditing, editReviewId } = this;

        let response;
        if (isEditing) {
          // Create form data for update
          const formData = new URLSearchParams();
          formData.append('rating', newReview.rating);
          formData.append('review', newReview.review);

          response = await axios.put(
            `http://localhost:8088/api/reviews/${editReviewId}`,
            formData,
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }
          );
          console.log("Review updated successfully:", response.data);
        } else {
          // Create form data for new review
          const formData = new URLSearchParams();
          formData.append('movieID', selectedMovieId);
          formData.append('rating', newReview.rating);
          formData.append('review', newReview.review);

          response = await axios.post(
            "http://localhost:8088/api/reviews",
            formData,
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }
          );
          console.log("Review added successfully:", response.data);
        }

        this.updateSelectedMovie(); // Refresh the reviews list
        this.resetForm();
      } catch (error) {
        console.error("Error submitting review:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          alert("Failed to submit review. Error: " + error.response.data.error);
        } else {
          alert("Failed to submit review. Unknown error occurred.");
        }
      }
    },

    editReview(review) {
      this.newReview.rating = review.rating;
      this.newReview.review = review.review;
      this.isEditing = true;
      this.editReviewId = review.review_id;
      this.showReviewForm = true;
    },
    deleteReview(reviewId) {
      axios
        .delete(`http://localhost:8088/api/reviews/${reviewId}`)
        .then((response) => {
          console.log("Review deleted successfully:", response.data);
          this.updateSelectedMovie(); // Refresh the reviews list
        })
        .catch((error) => {
          console.error("Error deleting review:", error);
        });
    },
    toggleReviewForm() {
      this.showReviewForm = !this.showReviewForm;
      if (!this.showReviewForm) {
        this.resetForm();
      }
    },
    resetForm() {
      this.newReview = { rating: null, review: "" };
      this.isEditing = false;
      this.editReviewId = null;
    },
  },
  mounted() {
    this.fetchMovies();
  },
};
</script>

<style scoped>
.rating-reviews-page {
  padding: 20px;
}

.movie-selection {
  margin-bottom: 20px;
}

.movie-selection select {
  padding: 10px;
  font-size: 1.2em;
  width: 100%;
}

.movie-details {
  margin-top: 20px;
}

.reviews {
  margin-top: 20px;
}

.reviews ul {
  list-style: none;
  padding: 0;
}

.reviews li {
  padding: 10px;
  background-color: #f9f9f9;
  margin-bottom: 5px;
}

.add-review {
  margin-top: 20px;
}

.add-review form {
  display: flex;
  flex-direction: column;
}

.add-review form div {
  margin-bottom: 10px;
}

.add-review form label {
  margin-bottom: 5px;
}

.add-review form input,
.add-review form select,
.add-review form textarea {
  padding: 10px;
  font-size: 1em;
  width: 100%;
}

.add-review form button {
  padding: 10px;
  font-size: 1.2em;
  background-color: #ff4500;
  color: #fff;
  border: none;
  cursor: pointer;
}

.add-review form button:hover {
  background-color: #ff4500cc;
}
</style>

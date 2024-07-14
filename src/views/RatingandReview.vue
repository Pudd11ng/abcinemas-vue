<template>
  <div id="movielist">
    <HeaderPage />
    <main>
      <div class="rating-reviews-page">
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
            <ul
              v-if="selectedMovie.reviews && selectedMovie.reviews.length > 0"
            >
              <li
                v-for="review in selectedMovie.reviews"
                :key="review.review_id"
              >
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
                  <select
                    id="rating"
                    v-model.number="newReview.rating"
                    required
                  >
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
      </div>
    </main>
  </div>
</template>

<script>
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
      fetch("http://localhost:8088/movies")
        .then((response) => response.json())
        .then((data) => {
          this.movies = data;
          console.log(this.movies);
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
        fetch(`http://localhost:8088/movies/${this.selectedMovieId}`)
          .then((response) => response.json())
          .then((data) => {
            this.selectedMovie = this.movies.find(
              (movie) => movie.id === this.selectedMovieId
            );
            if (this.selectedMovie) {
              this.selectedMovie.reviews = data;
            }
          })
          .catch((error) => {
            console.error("Error fetching selected movie:", error);
          });
      }
    },
    submitReview() {
      const formData = new FormData();
      formData.append("movieID", this.selectedMovieId);
      formData.append("rating", this.newReview.rating);
      formData.append("review", this.newReview.review);

      if (this.isEditing) {
        formData.append("review_id", this.editReviewId);

        fetch("http://localhost:8088/reviews", {
          method: "PUT",
          body: formData,
        })
          .then((response) => response.text())
          .then((data) => {
            console.log(data);
            this.updateSelectedMovie(); // Refresh the reviews list
            this.resetForm();
          })
          .catch((error) => {
            console.error("Error updating review:", error);
          });
      } else {
        fetch("http://localhost:8088/reviews", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.text())
          .then((data) => {
            console.log(data);
            this.updateSelectedMovie(); // Refresh the reviews list
            this.resetForm();
          })
          .catch((error) => {
            console.error("Error submitting review:", error);
          });
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
      fetch(`http://localhost:8088/reviews/${reviewId}`, {
        method: "DELETE",
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
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

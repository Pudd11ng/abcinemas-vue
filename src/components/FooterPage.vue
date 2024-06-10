<template>
  <footer class="w3l-footer">
    <section class="footer-inner-main">
      <div class="footer-hny-grids py-1">
        <div class="container py-1">
          <div class="text-txt">
            <div class="right-side">
              <div class="row footer-about">
                <div class="col-md-3 col-6 footer-img mb-1">
                  <router-link to="/movies">
                    <img class="img-fluid" src="assets/images/banner1.jpg" alt="" />
                  </router-link>
                </div>
                <div class="col-md-3 col-6 footer-img mb-1">
                  <router-link to="/movies">
                    <img class="img-fluid" src="assets/images/banner2.jpg" alt="" />
                  </router-link>
                </div>
                <div class="col-md-3 col-6 footer-img mb-1">
                  <router-link to="/movies">
                    <img class="img-fluid" src="assets/images/banner3.jpg" alt="" />
                  </router-link>
                </div>
                <div class="col-md-3 col-6 footer-img mb-1">
                  <router-link to="/movies">
                    <img class="img-fluid" src="assets/images/banner4.jpg" alt="" />
                  </router-link>
                </div>
              </div>
              <div class="row footer-links">
                <div class="col-md-3 col-sm-6 sub-two-right mt-1">
                  <h6>Movies</h6>
                  <ul>
                    <li><router-link to="/movies">Movies</router-link></li>
                    <li><router-link to="/videos">Videos</router-link></li>
                    <li><router-link to="/movies">English Movies</router-link></li>
                    <li><router-link to="/trailers">Trailer</router-link></li>
                    <li><router-link to="/upcoming-movies">Upcoming Movies</router-link></li>
                    <li><router-link to="/contact-us">Contact Us</router-link></li>
                  </ul>
                </div>
                <div class="col-md-3 col-sm-6 sub-two-right mt-1">
                  <h6>Information</h6>
                  <ul>
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/about">About</router-link></li>
                    <li><router-link to="/tv-series">Tv Series</router-link></li>
                    <li><router-link to="/blogs">Blogs</router-link></li>
                    <li><router-link to="/sign-in">Login</router-link></li>
                    <li><router-link to="/contact-us">Contact</router-link></li>
                  </ul>
                </div>
                <div class="col-md-3 col-sm-6 sub-two-right mt-1">
                  <h6>Locations</h6>
                  <ul>
                    <li><router-link to="/movies">Asia</router-link></li>
                    <li><router-link to="/movies">France</router-link></li>
                    <li><router-link to="/movies">Taiwan</router-link></li>
                    <li><router-link to="/movies">United States</router-link></li>
                    <li><router-link to="/movies">Korea</router-link></li>
                    <li><router-link to="/movies">United Kingdom</router-link></li>
                  </ul>
                </div>
                <div class="col-md-3 col-sm-6 sub-two-right mt-1">
                  <h6>Newsletter</h6>
                  <form action="#" class="subscribe mb-1" method="post">
                    <input type="email" name="email" placeholder="Your Email Address" required="" />
                    <button>
                      <span class="fa fa-envelope-o"></span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="below-section d-flex justify-content-between align-items-center pt-1 pb-1">
            <div class="footer-bottom-left d-flex align-items-center">
              <p class="copy-text">&copy; 2024 ABCinemas. All rights reserved. Design by <a href="https://w3layouts.com" target="_blank">W3layouts</a></p>
            </div>
            <div class="footer-bottom-center d-flex align-items-center">
              <p>Enter your email and receive the latest news, updates and special offers from us.</p>
            </div>
            <ul class="social-icons d-flex align-items-center">
              <li><a href="#facebook"><span class="fa fa-facebook"></span></a></li>
              <li><a href="#instagram"><span class="fa fa-instagram"></span></a></li>
              <li><a href="#linkedin"><span class="fa fa-linkedin"></span></a></li>
              <li><a href="#twitter"><span class="fa fa-twitter"></span></a></li>
              <li><a href="#google"><span class="fa fa-google-plus"></span></a></li>
            </ul>
          </div>
        </div>
      </div>
      <button @click="topFunction" id="movetop" title="Go to top">
        <span class="fa fa-arrow-up"></span>
      </button>
    </section>
  </footer>
</template>

<script>
export default {
  name: "FooterPage",
  mounted() {
    window.onscroll = this.scrollFunction;
  },
  methods: {
    scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("movetop").style.display = "block";
      } else {
        document.getElementById("movetop").style.display = "none";
      }
    },
    topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }
};
</script>

<style scoped>
@import '../assets/css/style-starter.css';

footer {
    background-color: #222; /* Background color */
    color: #fff; /* Text color */
    font-size: 14px; /* Font size */
    left: 0;
    right: 0;
    text-align: center;
    padding: 20px 0; /* Add some padding for better spacing */
}

.footer-hny-grids {
  padding: 10px 0; /* Adjust padding to reduce height */
}

.footer-about {
  margin-bottom: 10px; /* Reduce margin to decrease height */
}

.footer-links h6 {
  font-size: 14px; /* Adjust font size to reduce height */
  margin-bottom: 10px; /* Reduce margin to decrease height */
}

.footer-links ul {
  padding-left: 0; /* Ensure no extra padding */
  list-style: none;
}

.footer-links li {
  margin-bottom: 5px; /* Reduce margin to decrease height */
}

.footer-links a {
  text-decoration: none;
  color: inherit;
}

.footer-links a:hover {
  text-decoration: underline;
}

.subscribe {
  display: flex;
  align-items: center;
}

.subscribe input {
  flex: 1;
  margin-right: 5px;
  padding: 5px;
  font-size: 14px;
  height: auto; /* Ensure the input box height is compact */
}

.subscribe button {
  padding: 5px; /* Adjust padding to reduce height */
}

.below-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px; /* Reduce font size to decrease height */
  padding: 10px 0; /* Adjust padding to reduce height */
}

.footer-bottom-left {
  flex: 1;
}

.footer-bottom-center {
  flex: 2;
  margin-left: 10px;
}

.social-icons {
  padding: 0;
  list-style: none;
  display: flex;
  gap: 5px;
}

.social-icons li {
  display: inline-block;
}

.social-icons a {
  color: inherit;
  text-decoration: none;
}

.social-icons a:hover {
  color: #ff4081; /* Example hover color */
}

#movetop {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: none;
  background-color: #ff4081;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
}

#movetop:hover {
  background-color: #ff1c6e;
}

@media (min-width: 1280px) {
    .container {
        /* max-width: 1200px; */ /* Commented out or removed */
    }
}
</style>

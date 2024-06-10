<template>
  <header id="site-header" class="w3l-header fixed-top">
    <!--/nav-->
    <nav class="navbar navbar-expand-lg navbar-light fill px-lg-0 py-0 px-3" style="height: 60px;">
      <div class="container style=height: 5px;">
        <h1>
          <router-link class="navbar-brand" to="/">
            <span class="fa fa-play icon-log" aria-hidden="true"></span> ABCinemas
          </router-link>
        </h1>
        <button
          class="navbar-toggler collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="fa icon-expand fa-bars"></span>
          <span class="fa icon-close fa-times"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/movies">Movies</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/contact-us">Contact</router-link>
            </li>
          </ul>

          <!--/search-right-->
          <div class="search-right">
            <a
              href="#search"
              class="btn search-hny mr-lg-3 mt-lg-0 mt-4"
              title="search"
            >
              Search
              <span class="fa fa-search ml-3" aria-hidden="true"></span>
            </a>
            <!-- search popup -->
            <div id="search" class="pop-overlay">
              <div class="popup">
                <form action="#" method="post" class="search-box">
                  <input
                    type="search"
                    placeholder="Search your Keyword"
                    name="search"
                    required="required"
                    autofocus=""
                  />
                  <button type="submit" class="btn">
                    <span class="fa fa-search" aria-hidden="true"></span>
                  </button>
                </form>
                <div class="browse-items">
                  <h3 class="hny-title two mt-md-5 mt-4">Browse all:</h3>
                  <ul class="search-items">
                    <li><router-link to="/movies">Action</router-link></li>
                    <li><router-link to="/movies">Drama</router-link></li>
                    <li><router-link to="/movies">Family</router-link></li>
                    <li><router-link to="/movies">Thriller</router-link></li>
                    <li><router-link to="/movies">Comedy</router-link></li>
                    <li><router-link to="/movies">Romantic</router-link></li>
                    <li><router-link to="/movies">Tv-Series</router-link></li>
                    <li><router-link to="/movies">Horror</router-link></li>
                  </ul>
                </div>
              </div>
              <a class="close" href="#close">×</a>
            </div>
            <!-- /search popup -->
          </div>
          <div
            class="Login_SignUp"
            id="login"
            style="font-size: 2rem; display: inline-block; position: relative"
          >
            <router-link class="nav-link" to="/sign-in">
              <i class="fa fa-user-circle-o"></i>
            </router-link>
          </div>
        </div>
        <!-- toggle switch for light and dark theme -->
        <div class="mobile-position">
          <nav class="navigation">
            <div class="theme-switch-wrapper">
              <label class="theme-switch" for="checkbox">
                <input type="checkbox" id="checkbox" />
                <div class="mode-container">
                  <i class="gg-sun"></i>
                  <i class="gg-moon"></i>
                </div>
              </label>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderPage",
  mounted() {
    this.initializeThemeSwitch();
  },
  methods: {
    initializeThemeSwitch() {
      const checkbox = document.getElementById("checkbox");
      checkbox.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");
      });
    },
  },
};
</script>

<style scoped>
@import '../assets/css/style-starter.css';

element.style {
    height: 60px;
}
</style>

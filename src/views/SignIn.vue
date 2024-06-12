<template>
  <div id="sign-in">
    <HeaderPage />
    <main>
      <header id="site-header" class="w3l-header fixed-top">
        <!--/nav-->
        <nav
          class="navbar navbar-expand-lg navbar-light fill px-lg-0 py-0 px-3"
        >
          <div class="container">
            <h1>
              <a class="navbar-brand" href="index.html"
                ><span class="fa fa-play icon-log" aria-hidden="true"></span>
                MyShowz
              </a>
            </h1>
            <div
              class="collapse navbar-collapse"
              id="navbarSupportedContent"
            ></div>
            <div class="Login_SignUp" id="login_s">
              <!-- style="font-size: 2rem ; display: inline-block; position: relative;" -->
              <!-- <li class="nav-item"> -->
              <router-link to="/sign-in"
                ><i class="fa fa-user-circle-o"></i
              ></router-link>
              <!-- </li> -->
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

      <div class="container_signup_signin" id="container_signup_signin">
        <div class="form-container sign-up-container">
          <form
            name="sign-up-form"
            action="#"
            onsubmit="return signUpValidateForm()"
          >
            <h1>Create Account</h1>
            <div class="social-container">
              <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="social"
                ><i class="fab fa-google-plus-g"></i
              ></a>
              <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
            <input name="sign-up-name" type="text" placeholder="Name" />
            <input name="sign-up-email" type="email" placeholder="Email" />
            <input
              name="sign-up-passwd"
              type="password"
              placeholder="Password"
            />
            <button>Sign Up</button>
          </form>
        </div>
        <div class="form-container sign-in-container">
          <form
            name="sign-in-form"
            style="color: var(--theme-title)"
            action="#"
            onsubmit="return signInValidateForm()"
          >
            <h1>Sign in</h1>
            <div class="social-container">
              <a href="#" class="social" style="color: var(--theme-title)"
                ><i class="fab fa-facebook-f"></i
              ></a>
              <a href="#" class="social" style="color: var(--theme-title)"
                ><i class="fab fa-google-plus-g"></i
              ></a>
              <a href="#" class="social" style="color: var(--theme-title)"
                ><i class="fab fa-linkedin-in"></i
              ></a>
            </div>
            <span>or use your account</span>
            <input name="sign-in-email" type="email" placeholder="Email" />
            <input
              name="sign-in-passwd"
              type="password"
              placeholder="Password"
            />
            <a href="#">Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your login details
              </p>
              <button class="ghost" id="signIn">Sign In</button>
            </div>
            <div class="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Register and book your tickets now!!!</p>
              <button class="ghost" id="signUp">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";
import "@/assets/js/as-alert-message.min.js";
import "@/assets/js/theme-change.js";
import "@/assets/js/sign-in.js";

export default {
  name: "SignIn",
  components: {
    HeaderPage,
  },
  mounted() {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });
  },
};
</script>

<style>
@import "@/assets/css/sign-in.css";
@import "@/assets/css/style-starter.css";
@import "@/assets/css/as-alert-message.min.css";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css");
</style>

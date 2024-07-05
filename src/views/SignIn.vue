<template>
  <div id="sign-in">
    <HeaderPage />
    <main>
      <div class="container_signup_signin" id="container_signup_signin">
        <div class="form-container sign-up-container">
          <form @submit.prevent="signUp">
            <h1>Create Account</h1>
            <br />
            <input
              name="sign-up-name"
              type="text"
              placeholder="Name"
              v-model="signUpName"
              required
            />
            <input
              name="sign-up-email"
              type="email"
              placeholder="Email"
              v-model="signUpEmail"
              required
            />
            <input
              name="sign-up-passwd"
              type="password"
              placeholder="Password"
              v-model="signUpPassword"
              required
            />
            <input
              name="sign-up-dob"
              type="text"
              onfocus="(this.type='date')"
              onblur="(this.type='text')"
              placeholder="Date of Birth"
              v-model="signUpDateOfBirth"
              required
            />
            <input
              name="sign-up-phone"
              type="text"
              placeholder="Phone Number"
              v-model="signUpPhoneNumber"
              required
            /><br />
            <button>Sign Up</button>
          </form>
        </div>
        <div class="form-container sign-in-container">
          <form
            name="sign-in-form"
            style="color: var(--theme-title)"
            @submit.prevent="signIn"
          >
            <h1>Sign in</h1>
            <br />
            <input
              name="sign-in-email"
              type="email"
              placeholder="Email"
              v-model="signInEmail"
              required
            />
            <input
              name="sign-in-passwd"
              type="password"
              placeholder="Password"
              v-model="signInPassword"
              required
            /><br />
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
              <br />
              <button class="ghost" id="signIn">Sign In</button>
            </div>
            <div class="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Register and book your tickets now!!!</p>
              <br />
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
import axios from "axios";
import { useUserStore } from "@/stores/userStore";
import router from "@/router/index.js";
import "@/assets/js/theme-change.js";

export default {
  name: "SignIn",
  components: {
    HeaderPage,
  },
  data() {
    return {
      signUpName: "",
      signUpEmail: "",
      signUpPassword: "",
      signUpDateOfBirth: "",
      signUpPhoneNumber: "",
      signInEmail: "",
      signInPassword: "",
    };
  },
  mounted() {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container_signup_signin");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });
  },
  methods: {
    async signUp() {
      try {
        const response = await axios.post("http://localhost:8088/users", {
          full_name: this.signUpName,
          email: this.signUpEmail,
          password: this.signUpPassword,
          date_of_birth: this.signUpDateOfBirth,
          phone_number: this.signUpPhoneNumber,
        });
        console.log("Sign up successful:", response.data);
      } catch (error) {
        console.error("Sign up error:", error);
      }
    },
    async signIn() {
      const userStore = useUserStore();
      try {
        const response = await axios.post("http://localhost:8088/users/login", {
          email: this.signInEmail,
          password: this.signInPassword,
        });
        console.log("Sign in successful:", response.data);
        const userId = response.data.user_id;
        const userEmail = response.data.email;
        userStore.setUser(userId, userEmail);
        router.push({ path: "/" });
      } catch (error) {
        console.error("Sign in error:", error);
      }
    },
  },
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css");
@import "@/assets/css/sign-in.css";
</style>

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
            <vue-tel-input
              name="sign-up-phone"
              v-model="signUpPhoneNumber"
              :only-countries="['MY']"
              @on-input="phoneValidate"
              validCharactersOnly
            ></vue-tel-input>
            <p v-if="!isValid" class="error">Invalid phone number</p>
            <br />
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
      isValid: true,
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
    phoneValidate(number, object) {
      if (number != "") {
        this.isValid = object.valid;
      }
    },
    async signUp() {
      if (
        !this.signUpName.trim() ||
        !this.signUpEmail.trim() ||
        !this.signUpPassword.trim() ||
        !this.signUpDateOfBirth.trim() ||
        !this.signUpPhoneNumber.trim()
      ) {
        alert("All fields are required and valid.");
        return;
      } else if (!this.isValid) {
        alert("Invalid phone number.");
        return;
      }
      const userStore = useUserStore();
      try {
        const response = await axios.post("http://localhost:8088/users", {
          full_name: this.signUpName,
          email: this.signUpEmail,
          password: this.signUpPassword,
          date_of_birth: this.signUpDateOfBirth,
          phone_number: this.signUpPhoneNumber,
        });
        console.log("Sign up successful:", response.data);
        const userId = response.data.user_id;
        const userEmail = response.data.email;
        const userRole = response.data.role;
        userStore.setUser(userId, userEmail, userRole);
        alert("Sign up successfully");
        router.push({ path: "/" });
      } catch (error) {
        console.error("Sign up error:", error);
        alert(
          "Sign up fail, please try again. Error: " + error.response.data.error
        );
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
        const userRole = response.data.role;
        userStore.setUser(userId, userEmail, userRole);
        if (userRole == "admin") {
          router.push({ path: "/admin-user" });
        } else if (userRole == "user") {
          router.push({ path: "/" });
        }
      } catch (error) {
        console.error("Sign in error:", error);
        alert(
          "Sign in fail, please try again. Error: " +
            error.response.data.message
        );
      }
    },
  },
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css");
@import "@/assets/css/sign-in.css";

.vue-tel-input {
  width: 100%;
  margin-bottom: 10px;
  border-width: 0;
}

.error {
  color: red;
  font-size: 0.9em;
}

button {
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}
</style>

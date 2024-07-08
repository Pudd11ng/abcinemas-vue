<template>
  <HeaderPage />
  <div class="profile-container">
    <div class="profile-card">
      <h2>User Profile</h2>
      <div class="profile-info">
        <label for="name">Name:</label>
        <input id="name" type="text" v-model="name" required />
        <label for="email">Email:</label>
        <input id="email" type="email" v-model="email" required readonly />
        <label for="dob">Date of Birth:</label>
        <input
          id="dob"
          type="text"
          onfocus="(this.type='date')"
          onblur="(this.type='text')"
          v-model="dateOfBirth"
          required
        />
        <label for="phone">Phone Number:</label>
        <vue-tel-input
          v-model="phoneNumber"
          :only-countries="['MY']"
          @on-input="phoneValidate"
          validCharactersOnly
        ></vue-tel-input>
        <p v-if="!isValid" class="error">Invalid phone number</p>
      </div>
      <button @click="saveChanges">Save Changes</button>
    </div>
  </div>
  <button @click="logout">Logout</button>
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";
import { useUserStore } from "@/stores/userStore";
import router from "@/router/index.js";
import axios from "axios";
import { computed, ref, onMounted } from "vue";

export default {
  name: "UserProfile",
  components: {
    HeaderPage,
  },
  setup() {
    const userStore = useUserStore();
    const userId = computed(() => userStore.userId);
    const userEmail = computed(() => userStore.userEmail);

    const name = ref("");
    const email = ref("");
    const dateOfBirth = ref("");
    const phoneNumber = ref("");
    const isValid = ref(true);

    const getUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8088/users/${userId.value}`
        );
        name.value = response.data.full_name;
        email.value = response.data.email;
        dateOfBirth.value = response.data.date_of_birth;
        phoneNumber.value = response.data.phone_number;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const logout = () => {
      userStore.clearUser();
      router.push({ path: "/" });
    };

    onMounted(() => {
      getUserData();
    });

    const saveChanges = async () => {
      if (
        !name.value.trim() ||
        !email.value.trim() ||
        !dateOfBirth.value.trim() ||
        !phoneNumber.value.trim() ||
        !isValid.value
      ) {
        alert("All fields are required and the phone number must be valid.");
        return;
      }

      name.value = name.value.trim();
      email.value = email.value.trim();
      dateOfBirth.value = dateOfBirth.value.trim();
      phoneNumber.value = phoneNumber.value.trim();

      try {
        const response = await axios.put(
          `http://localhost:8088/users/${userId.value}`,
          {
            full_name: name.value,
            email: email.value,
            date_of_birth: dateOfBirth.value,
            phone_number: phoneNumber.value,
          }
        );
        console.log("Profile updated successfully:", response.data);
        router.push({ path: "/profile" });
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    };

    const phoneValidate = (number, object) => {
      console.log(object);
      if (object.valid === true) {
        isValid.value = true;
      } else {
        isValid.value = false;
      }
    };

    return {
      name,
      email,
      dateOfBirth,
      phoneNumber,
      isValid,
      logout,
      saveChanges,
      phoneValidate,
    };
  },
};
</script>

<style scoped>
@import "@/assets/css/profile.css";

.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.profile-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
}

.profile-info {
  margin-bottom: 20px;
}

.profile-info label {
  display: block;
  margin-bottom: 5px;
}

.profile-info input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.vue-tel-input {
  width: 100%;
  margin-bottom: 10px;
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

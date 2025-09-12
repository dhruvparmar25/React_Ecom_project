<template>
  <section class="login">
    <div class="main">
      <div class="image">
        <img
          src="https://images.bewakoof.com/t640/men-s-blue-the-panda-way-oversized-t-shirt-580637-1676876264-1.jpg"
          alt="Fashion T-shirt"
        />
      </div>

      <div class="text">
        <img src="/public/Fashion.png" alt="Fashion Logo" />
        <h3>
          {{ data.isRegistration ? "Registration" : "Login" }}
        </h3>
        <div class="box">
          <form @submit.prevent="saveData">
            <input
              v-if="data.isRegistration"
              v-model="data.name"
              type="text"
              name="Name"
              placeholder="Enter Name"
            />

            <br />

            <input
              type="text"
              v-model="data.email"
              name="Email"
              placeholder="Enter Email"
            />
            <br />
            <div class="password-field">
              <input
                v-model="data.password"
                name="Password"
                placeholder="Enter Password"
                :type="showPassword ? 'text' : 'password'"
              />
              <span @click="togglePassword('password')">
                <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
              </span>
            </div>
            <br />

            <button type="submit">
              {{ data.isRegistration ? "Register" : "Login" }}
            </button>

            <p
              class="forget"
              v-if="!data.isRegistration"
              @click="openForgetPasswordModal"
            >
              Forget Password?
            </p>

            <p @click="toggleForm">
              {{
                data.isRegistration
                  ? "Already have an account? Login"
                  : "Don't have an account? Register"
              }}
            </p>
          </form>
        </div>
      </div>
    </div>

    <!-- Forget Password Modal -->
    <div v-if="data.showForgetPasswordModal" class="modal">
      <div class="modal-content">
        <h3>Reset Password</h3>
        <input
          type="email"
          v-model="data.resetEmail"
          placeholder="Enter your email"
        />
        <button @click="sendResetLink">Send Reset Link</button>
        <button @click="closeForgetPasswordModal">Close</button>
      </div>
    </div>

    <!-- Reset Password Modal -->
    <div v-if="data.resetToken" class="modal reset-modal">
      <div class="modal-content">
        <h3>Reset Your Password</h3>
        <div class="password-field">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="data.newPassword"
            placeholder="Enter New Password"
          />
          <span @click="togglePassword('password')">
            <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
          </span>
        </div>
        <div class="password-field">
          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            v-model="data.confirmPassword"
            placeholder="Confirm New Password"
          />
          <span @click="togglePassword('confirm')">
            <i
              :class="showConfirmPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"
            ></i>
          </span>
        </div>
        <button @click="resetPassword">Reset Password</button>
        <button @click="closeResetPasswordModal">Close</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import router from "@/router/router";
import { getHeader } from "@/utils/helpers";
import { toast } from "vue3-toastify";
import { useAuth } from "@/composables/useAuth";

// Reactive state to manage form data (login/registration)
const data = ref({
  isRegistration: false,
  name: "",
  email: "",
  password: "",
  showForgetPasswordModal: false,
  resetEmail: "",
  resetToken: "",
  newPassword: "",
  confirmPassword: "",
});

const { login } = useAuth();
const saveData = () => {
  const endpoint = data.value.isRegistration ? "register" : "login";
  const headers = data.value.isRegistration ? {} : getHeader();

  axios
    .post(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, data.value, {
      headers,
    })
    .then((res) => {
      if (!data.value.isRegistration) {
        login(res.data?.token || "");
        localStorage.setItem("token", res.data?.token || "");
        localStorage.setItem("user", JSON.stringify(res.data?.user || {}));
        toast.success("Login Successful!", {
          autoClose: 2000,
          positiont: "top-right",
          theme: "colored",
          onClose: () => {
            if (res.data?.user?.role === "admin") {
              router.push("/admin");
            } else {
              router.push("/");
            }
          },
        });
      } else {
        toast.success("Registration Successful! Please Login");
        data.value.isRegistration = false;
      }
    })
    .catch((err) => {
      const errorMessage = err.response?.data?.msg || "somthing went a wrong";
      toast.error(errorMessage);
      console.error("Error:", err);
    });
};
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Toggle between registration and login form
const toggleForm = () => {
  data.value.isRegistration = !data.value.isRegistration;

  data.value.name = "";
  data.value.email = "";
  data.value.password = "";
};
const togglePassword = (field) => {
  if (field === "password") {
    showPassword.value = !showPassword.value;
  } else if (field === "confirm") {
    showConfirmPassword.value = !showConfirmPassword.value;
  }
};

// Forget Password Modal functionality
const openForgetPasswordModal = () => {
  data.value.showForgetPasswordModal = true;
  setTimeout(() => {
    document.querySelector(".modal").classList.add("show");
  }, 10);
};

const closeForgetPasswordModal = () => {
  document.querySelector(".modal").classList.remove("show");
  setTimeout(() => {
    data.value.showForgetPasswordModal = false;
    data.value.resetEmail = "";
    // errorMsg.value.validateResetEmail = "";
  }, 300); // Smooth transition
};

const sendResetLink = () => {
  if (!data.value.resetEmail || !/\S+@\S+\.\S+/.test(data.value.resetEmail)) {
    // errorMsg.value.validateResetEmail = "Valid Email is Required";
    return;
  }

  axios
    .post(`${import.meta.env.VITE_API_BASE_URL}forgot-password`, {
      email: data.value.resetEmail,
    })
    .then((res) => {
      toast.warning("Reset link sent to your email!");
      data.value.resetToken = res.data.token;

      closeForgetPasswordModal();
      openResetPasswordModal();
    })
    .catch((err) => {
      toast.error("Error sending reset link!");
      console.error(err);
      const errorMessage = err.response?.data?.msg || "somthing went a wrong";
      toast.error(errorMessage);
    });
};

const openResetPasswordModal = () => {
  setTimeout(() => {
    document.querySelector(".reset-modal").classList.add("show");
  }, 10);
};

const closeResetPasswordModal = () => {
  document.querySelector(".reset-modal").classList.remove("show");
  setTimeout(() => {
    data.value.resetToken = "";
    data.value.newPassword = "";
    data.value.confirmPassword = "";
  }, 300);
};

const resetPassword = () => {
  if (data.value.newPassword !== data.value.confirmPassword) {
    toast.warning("Passwords do not match!");
    return;
  }

  axios
    .post(
      `${import.meta.env.VITE_API_BASE_URL}verify_password/${data.value.resetToken}`,
      {
        password: data.value.newPassword,
        confirmPassword: data.value.confirmPassword,
      }
    )
    .then(() => {
      toast.success("Password Reset Successfully!");
      closeResetPasswordModal();
    })
    .catch((err) => {
      toast.error("Error resetting password!");
      console.error("Error Response:", err.response?.data || err);
      const errorMessage = err.response?.data?.msg || "somthing went a wrong";
      toast.error(errorMessage);
    });
};
</script>

<style scoped>
/* Main layout styling */
.main {
  width: 90%;
  height: 100vh;
  margin: auto;
  display: flex;
  justify-content: space-around;
  align-items: start;
  padding: 1rem;
}

/* Image styling */
.image {
  width: 50%;
  height: 100%;
}

.image img {
  width: 100%;
  height: 100%;
}

/* Form container styling */
.text {
  width: 50%;
  height: 100%;
  text-align: center;
  padding: 2rem;
}

/* Logo image styling */
.text img {
  width: 100px;
  margin-bottom: 2rem;
}

/* Form heading styling */
.text > h3 {
  font-family: "Montserrat";
  font-size: 24px;
  color: #2c3e50;
  font-weight: 600;
  text-transform: uppercase;
}

/* Form box styling */
.box {
  margin: auto;
  width: 400px;
  background-color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 1rem;
}

/* Input and button common styling */
.box input,
.box button {
  width: 80%;
}

/* Input field styling */
.box input {
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 1rem;
}

/* Submit button styling */
.box button {
  height: 40px;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: skyblue;
  font-size: 18px;
  cursor: pointer;
  transition: 0.3s;
}

/* Button hover effect */
.box button:hover {
  background-color: rgba(0, 0, 255, 0.726);
}

/* Styling for toggle text */
.box p,
.forget {
  color: skyblue;
  cursor: pointer;
}

.box h6 {
  margin: 0;
  padding: 0;
  margin: 0.5rem;
  text-align: center;
}

.forget {
  margin-top: 0.5rem;
}

/* Modal styling */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
}

/* Modal open class */
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transform: translateY(-20px);
  transition: transform 0.3s ease;
}

/* Show modal */
.modal.show {
  opacity: 1;
  visibility: visible;
}

.modal.show .modal-content {
  transform: translateY(0);
}

/* Close button styling */
.modal-content button {
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  background: skyblue;
  color: white;
}

.modal-content button:hover {
  background: rgba(0, 0, 255, 0.726);
}
.password-field {
  position: relative;
  display: flex;
  align-items: center;
}

.password-field input {
  width: 81%;
  padding-right: 40px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 35px;
}

.password-field span {
  position: absolute;
  right: 40px;
  cursor: pointer;
  font-size: 18px;
  color: #555;
}
</style>

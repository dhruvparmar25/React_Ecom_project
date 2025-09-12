<template>
  <section class="navbar-fs">
    <div class="topnavbar">
      <p class="offerText">
        <strong style="margin-right: 10px"
          ><i class="fa-solid fa-users"></i></strong
        >Styled more than 100,000 Clients
      </p>
    </div>
    <div class="middlenav">
      <nav>
        <div class="hamburger" @click="toggleMenu">
          <i :class="showMenu ? 'fas fa-times' : 'fas fa-bars'"></i>
        </div>
        <div :class="['main-menu', { show: showMenu }]">
          <router-link to="/" @click="showMenu = false"> Home</router-link>
          <div
            @click="
              openType('Men');
              showMenu = false;
            "
            class="men"
          >
            Men
          </div>
          <div
            @click="
              openType('Women');
              showMenu = false;
            "
            class="women"
          >
            Women
          </div>

          <router-link to="/product" @click="showMenu = false"
            >Product</router-link
          >

          <!-- <div class="main-icon"></div> -->
        </div>
        <div class="logo">
          <router-link to="/"><img src="/public/Fashion.png" /></router-link>
        </div>
        <div class="menu">
          <router-link to="/contact" class="menu-item">Contact</router-link>
          <div class="dropdown">
            <div class="user">
              <i class="fa-regular fa-user"></i>
              <div class="dropdown-content">
                <router-link to="/orders"><label>MyOrders</label></router-link>
              </div>
            </div>
          </div>
          <router-link to="/cart" @click="showMenu = false" class="cart">
            <i class="fa-solid fa-cart-shopping"></i>
            <span class="cart-count">{{ totalItems }}</span>
          </router-link>
          <!-- Login / Logout Button -->
          <router-link v-if="!isLoggedIn" to="/login" class="login-fn"
            >Login</router-link
          >
          <button v-else class="logout-btn" @click="logout">Logout</button>
        </div>
      </nav>
    </div>
    <div class="bottomnav">
      <div class="categories">
        <div class="list-cat">
          <div
            v-for="category in categories"
            :key="category._id"
            @click="selectCategory(category._id)"
          >
            {{ category.name }}
          </div>
        </div>
      </div>

      <!-- <div class="dropdown">
        <span class="dropbtn" @click="toggleMenu">Category</span>
        <div class="dropdown-content" v-if="showMenu"></div>
      </div> -->
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useCartstore } from "@/stores/cartStore";
import { storeToRefs } from "pinia";
import { useAuth } from "@/composables/useAuth";

const { isLoggedIn, logout } = useAuth();

const categories = ref([]);
const router = useRouter();
const showMenu = ref(false);
const cartStore = useCartstore();
const { totalItems } = storeToRefs(cartStore);

router.afterEach(() => {
  showMenu.value = false;
});

const fetchCategories = async () => {
  axios
    .get(`${import.meta.env.VITE_API_BASE_URL}category`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((response) => {
      categories.value = response?.data?.data || [];
      console.log("Categories:", response);
    })

    .catch((error) => {
      console.error("Error Fetching Categories", error);
    });
};

onMounted(() => {
  fetchCategories();
  cartStore.loadCart();
});

const selectCategory = (categoryId) => {
  router.push({
    name: "Product",
    query: { categoryId: [categoryId], type: undefined },
  });
};

const openType = (type) => {
  router.push({
    name: "Product",
    query: { type: type, category: undefined },
  });
};

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};
</script>
<style scoped>
.main-menu,
.logo,
.menu {
  width: 33%;
}
/* Offer Text */
.navbar-fs {
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: white;
}
.topnavbar {
  text-align: center;
  justify-content: space-between;
  color: white;
  background-color: black;
}
.offerText {
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  margin: 0;
  color: white;
  padding: 6px 0px;
}
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.categories {
  color: black;
  padding: 4px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 1rem;
}
.list-cat {
  display: flex;
  justify-content: space-between;
  margin: 0rem 2rem;
}
.list-cat div {
  cursor: pointer;
  padding: 5px;
}
.list-cat div:hover {
  background-color: black;
  color: white;
  border-radius: 10px;
}
.hamburger i {
  color: black;
  font-size: 24px;
  padding: 10px;
}
.logo {
  display: contents;
  justify-content: center;
}
.logo img {
  width: 100%;
  height: 40px;
}

/* Main Menu */
.main-menu {
  display: flex;
  align-items: center;
  gap: 2rem;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}

.main-menu a,
.main-menu div {
  padding: 5px;
  text-decoration: none;
  color: black;
  transition: color 0.3s ease-in-out;
}

.main-menu a:hover,
.main-menu > div:hover {
  background-color: #63848e;
  color: white;
  border-radius: 10px;
}

/* Icons */
.main-icon {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.main-icon i,
.main-icon div {
  font-size: 20px;
  cursor: pointer;
  transition: color 0.3s;
}

.main-icon i:hover {
  color: blue;
}

/* Cart */
.cart i {
  text-decoration: none;
  color: black;
}

/* Search Button */
.search-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
.hamburger {
  display: none;
  font-size: 24px;
  cursor: pointer;
  margin-right: 1rem;
}
.cart-count {
  background-color: red;
  color: white;
  padding: 1px 5px;
  border-radius: 50%;
  font-size: 10px;
  position: absolute;
  right: 96px;
  bottom: 26px;
}
.dropdown {
  position: relative;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  width: fit-content;
  padding: 0.5rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  z-index: 10;
}

.dropdown-content div {
  display: block;
  padding: 8px 10px;
  color: black;
  transition: color 0.3s;
}

.dropdown-content div:hover {
  color: blue;
  background-color: rgba(255, 0, 0, 0.1);
}

.dropdown:hover .dropdown-content {
  display: block;
}
.dropdown-content label {
  padding: 5px;
  color: black;
}
.menu {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  position: relative;
  justify-content: end;
}

.menu-item {
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  color: black;
  transition: color 0.3s ease-in-out;
}

.menu-item:hover {
  color: blue;
}
/* Login Button */
.login-fn {
  color: white;
  cursor: pointer;
  text-decoration: none;
  padding: 5px;
  background-color: #41464b;
  border-radius: 20px;
}
.login-fn:hover {
  background-color: #000;
  color: white;
  border-radius: 20px;
}
/* Logout Button */
.logout-btn {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.logout-btn:hover {
  background-color: darkred;
}

/* Social Media Hover Effects */
.fb:hover {
  color: #1877f2;
}

.insta:hover {
  color: #e4405f;
}

.yt:hover {
  color: #ff0000;
}

.x:hover {
  color: #000;
}
@media (max-width: 768px) {
  .offerText {
    display: none;
  }
}
@media (max-width: 480px) {
  .offerText {
    display: none;
  }
}
</style>

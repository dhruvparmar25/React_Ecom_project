<template>
  <section class="dsb">
    <div class="field">
      <nav>
        <img src="/./public/Fashion.png" />

        <div class="main-menu">
          <div
            @click="goTo('dashboard')"
            :class="{ active: activeTab === 'dashboard' }"
          >
            <label><i class="fa-solid fa-house"></i>Dashboard</label>
          </div>
          <div
            @click="goTo('adminorders')"
            :class="{ active: activeTab === 'Order' }"
          >
            <label><i class="fas fa-clipboard-check"></i>Orders</label>
          </div>
          <div
            @click="goTo('adminproducts')"
            :class="{ active: activeTab === 'Product' }"
          >
            <label><i class="fas fa-box-open"></i>Products</label>
          </div>
          <div
            @click="goTo('adminuser')"
            :class="{ active: activeTab === 'User' }"
          >
            <label><i class="fa-solid fa-users"></i>Users</label>
          </div>
          <div
            @click="goTo('report')"
            :class="{ active: activeTab === 'Report' }"
          >
            <label><i class="fa-solid fa-chart-simple"></i>Report</label>
          </div>
          <button class="logout-btn" @click="logout">Logout</button>
        </div>
      </nav>
    </div>

    <div class="detail">
      <router-view></router-view>
    </div>
  </section>
</template>
<script setup>
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";

const { logout } = useAuth();
const router = useRouter();
const goTo = (name) => {
  router.push({
    name,
  });
};
</script>
<style scoped>
.dsb {
  width: 100%;
  height: 100vh;
  display: flex;
}
.field {
  width: 15%;
  height: 100vh;
  background-color: #004b60;
  padding: 1rem;
  position: sticky;
  top: 0;
  bottom: 0;
  font-family: "inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: rgb(255, 255, 255);
}
.detail {
  overflow-y: auto;
}
.field nav label {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 10px;
}
.main-menu > div label {
  font-family: "inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: rgb(255, 255, 255);
}
.main-menu > div i,
.field nav label i {
  color: white;
  margin-right: 10px;
}

.field nav img {
  width: 100%;
  height: 75px;
  margin-bottom: 1rem;
}
.main-menu > div {
  cursor: pointer;
  margin-bottom: 1rem;
  color: black;
  transition: color 0.3s ease-in-out;
}
.main-menu > div:hover {
  color: blue;
}
.field nav label:hover {
  background-color: #63848e;
}
.main-menu > div.active label {
  background-color: #26829c;
  border-radius: 10px;
}

.logout-btn {
  background-color: lightcoral;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.logout-btn:hover {
  background-color: red;
}
.detail {
  width: 85%;
}
</style>

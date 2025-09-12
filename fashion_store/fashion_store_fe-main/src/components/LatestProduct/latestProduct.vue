<template>
  <section class="featured">
    <div class="ftitle">
      <h1>Latest Products</h1>
      <router-link to="/product"> <button>View All</button></router-link>
    </div>
    <div class="productContainer">
      <ProductCard
        v-for="prd in prds.data?.slice(0, 5) || []"
        :key="prd._id"
        :product="prd"
      />
    </div>
  </section>
</template>
<script setup>
import { onMounted, ref } from "vue";
import ProductCard from "../Cards/ProductCard.vue";
import axios from "axios";

const prds = ref([]);

onMounted(async () => {
  await axios
    .get(`${import.meta.env.VITE_API_BASE_URL}product`)
    .then((resp) => {
      prds.value = resp.data;
    })
    .catch((error) => {
      console.log("error fetching", error);
    });
});
</script>
<style scoped>
.ftitle {
  display: flex;
  justify-content: space-between;
  margin: 1rem;
}
.ftitle h1 {
  font-size: 22px;
  font-weight: 700;
  line-height: normal;
  background-color: #0e4a5a;
  color: white;
  padding: 0.5rem;
  letter-spacing: 0.5rem;
  text-transform: uppercase;
  border-radius: 1px 50px 1px 0px;
}
.ftitle button {
  background-color: #27829bc9;
  border: none;
  font-size: 14px;
  padding: 5px;
  color: white;

  border-radius: 10px;
}
.ftitle button:hover {
  background-color: #01485c;
  border-radius: 10px;
}

.productContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
.products {
  padding: 0.5rem;
  border-radius: 10px;
  background-color: rgba(231, 229, 229, 0.938);
  margin: 1rem;
}

.productcard img {
  max-width: 100%;
  height: auto;
}

.container {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding: 0%;
}
.container h4,
.container h1 {
  font-size: 16px;
  font-weight: 300;
  color: rgb(51, 51, 51);
}
.container h1 {
  font-weight: 700;
}
@media (max-width: 768px) {
  section.banner {
    margin-left: 0rem;
  }
  .products {
    margin: 0.5rem;
  }
}
</style>

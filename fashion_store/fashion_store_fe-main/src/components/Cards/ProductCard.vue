<template>
  <div
    class="products"
    @click="goToDetails(product)"
    :product="product"
    :key="product._id"
  >
    <div class="productcard">
      <img :src="product.image" />
      <div class="container">
        <h4>{{ product.category.name }}</h4>
        <h1>₹{{ product.price }}</h1>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps(["product"]);

const goToDetails = (item) => {
  if (!item?._id) return; // If the product doesn't have an ID, do nothing
  router.push({
    name: "ProductDetail", // Navigate to the ProductDetail page
    params: { id: item?._id }, // Pass the product ID as a parameter
  });
};
</script>
<style scoped>
.products {
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
</style>

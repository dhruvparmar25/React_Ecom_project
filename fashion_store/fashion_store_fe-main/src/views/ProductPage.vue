<template>
  <!-- Product card displaying information about each product -->
  <router-link :to="`/product/${product.id}`" class="prddetail">
    <div class="cards">
      <div class="imag">
        <!-- Display product tags if available -->
        <div
          v-if="product?.tags?.length"
          v-for="tag in product.tags"
          class="label"
        >
          {{ tag.label }}
        </div>
        <img :src="product.image" style="width: 80%" />
        <div class="offer">{{ product.offer }}</div>
      </div>

      <div class="main">
        <div class="Textlable">
          <div class="title">{{ product.brand }}</div>
          <div class="type">{{ product.type }}</div>
        </div>

        <div class="desc">{{ product.name }}</div>
        <div class="combine">
          <div class="price">
            <i class="fa-solid fa-indian-rupee-sign"></i>{{ product.price }}
          </div>
          <div class="discount">{{ product.discount }}</div>
        </div>
        <div class="combine">
          <div class="rating">
            <i class="fa-solid fa-star"></i> {{ product.rating }}
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
// Receive product data as a prop
const props = defineProps(["product"]);
</script>

<style scoped>
/* Scoped styling for product card */
.prddetail {
  cursor: pointer;
  text-decoration: none;
}
.cards {
  background-color: rgba(231, 229, 229, 0.938);
  transition: 0.3s;
  border-radius: 10px;
}

.main {
  padding: 0.5rem;
  position: relative;
  margin-bottom: 0.5rem;
}
.Textlable {
  display: flex;
  justify-content: start;
  align-items: start;
}
.title,
.price {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: rgb(54, 53, 55);
}
.type {
  margin-left: 1rem;
  font-size: 12px;
  background-color: rgb(105, 104, 106);
  color: white;
  text-align: center;
  border-radius: 10px;
}
.desc {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: rgb(78, 86, 100);
  height: 35px;
}
.combine {
  display: flex;
  align-items: start;
  justify-content: space-between;
  margin-top: 0.5rem;
}
.discount {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #09b841;
}
.tag {
  font-family: "Montserrat", sans-serif;
  border: 1px solid rgba(177, 177, 177, 0.507);
  width: fit-content;
  font-size: 12px;
  font-weight: 300;
  padding: 4px;
  border-radius: 2px;
  margin-top: 0.5rem;
}
.label {
  position: absolute;
  font-size: 10px;
  background-color: rgb(105, 104, 106);
  color: white;
  z-index: 1;

  border-radius: 15px;
  padding: 2px;
}
.imag {
  display: flex;
  position: relative;
  z-index: 0;
}
.imag > img {
  margin-top: 10px;
  margin: auto;
}

.offer {
  position: absolute;
  bottom: 5px;
  left: 5px;
  background-color: white;
  color: black;
  font-size: 12px;
  padding: 5px;
  border-radius: 13px;
}

.rating {
  font-size: 14px;
  font-weight: 700;
  margin-top: 0.5rem;
}
.rating i {
  color: gold;
}
</style>

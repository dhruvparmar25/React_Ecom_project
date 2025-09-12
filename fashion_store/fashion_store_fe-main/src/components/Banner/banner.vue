<template>
  <h1>Category</h1>
  <section class="banner">
    <div @click="openType('Men')" class="image1">
      <img src="/public/Men.jpg" />
    </div>
    <div @click="openType('Women')" class="image2">
      <img src="/public/women.jpg" />
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const categories = ref([]);
const router = useRouter();

const fetchCategories = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}category`
    );
    categories.value = response.data;
  } catch (error) {
    console.error("Error fetching categories", error);
  }
};

onMounted(() => {
  fetchCategories();
});

const openType = (type) => {
  router.push({
    name: "Product",
    query: { type: type, category: undefined },
  });
};
</script>
<style scoped>
h1 {
  width: fit-content;
  font-size: 22px;
  font-weight: 700;
  line-height: normal;
  background-color: #0e4a5a;
  color: white;
  padding: 0.5rem;
  letter-spacing: 0.5rem;
  text-transform: uppercase;
  margin-left: 1rem;
  border-radius: 1px 50px 1px 0px;
}
section.banner {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 90%;
  margin: auto;
  margin-left: 5rem;
}
img {
  width: 90%;
  /* height: 450px; */
  border-radius: 0.5rem;
  margin: 1rem;
}
.image1,
.image2 {
  width: 48%;
  margin: auto;
}
@media (max-width: 768px) {
  section.banner {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 90%;
    margin: auto;
  }
}
</style>

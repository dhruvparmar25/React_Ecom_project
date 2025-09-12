<template>
  <div class="main">
    <div class="cards" ref="carouselContainer">
      <div class="card" v-for="(image, index) in images" :key="index">
        <router-link to="/product"> <img :src="image" /></router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const images = ref([
  "https://images.bewakoof.com/uploads/grid/app/1x1-GPT-common-1-ezgif-com-optimize-1742310024.gif",
  "https://images.bewakoof.com/uploads/grid/app/1x1-March13-HC-Joggers-common-1742100923.jpg",
  "https://images.bewakoof.com/uploads/grid/app/ik-creative-1x1-1741858082.jpg",
  "https://images.bewakoof.com/uploads/grid/app/1x1-March-HC-ViralLaunch-cricket-1741837560.jpg",
  "https://images.bewakoof.com/uploads/grid/app/Buy-2-OS-Men-1x1-HC-banner-1742210559.jpg",
  "https://images.bewakoof.com/uploads/grid/app/1x1-common-pants-1742288499.jpg",
  "https://images.bewakoof.com/uploads/grid/app/1x1-CFT-comm-1742100925.jpg",
  "https://images.bewakoof.com/uploads/grid/app/1x1-JEANS-EDIT-Common-1742223055.jpg",
  "https://images.bewakoof.com/uploads/grid/app/1x1-March13-HC-PJs-common--2--1741863421.jpg",
]);
const carouselContainer = ref(null);

const scrollCarousel = () => {
  if (carouselContainer.value) {
    const cardWidth =
      carouselContainer.value.querySelector(".card").offsetWidth;
    carouselContainer.value.scrollBy({
      left: cardWidth,
      behavior: "smooth",
    });

    setTimeout(() => {
      if (
        carouselContainer.value.scrollLeft +
          carouselContainer.value.clientWidth >=
        carouselContainer.value.scrollWidth
      ) {
        carouselContainer.value.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }
    }, 1000);
  }
};
onMounted(() => {
  setInterval(scrollCarousel, 3000);
});
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cards {
  display: flex;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  justify-content: flex-start;
  transition: transform 1s ease-in-out;
}

.card {
  min-width: 460px;
  height: auto;
  padding: 1rem;
  border: none;
}

.cards img {
  width: 100%;
  height: auto;
}

@media (max-width: 1024px) {
  .card {
    min-width: 450px;
  }
  .cards img {
    width: 100%;
    height: auto;
  }
}
@media (max-width: 768px) {
  .card {
    min-width: 380px;
  }
  .cards img {
    width: 100%;
    height: auto;
  }
}
@media (max-width: 480px) {
  .card {
    min-width: 480px;
    margin: auto;
  }
  .cards img {
    width: 100%;
    height: auto;
    margin: auto;
  }
}
</style>

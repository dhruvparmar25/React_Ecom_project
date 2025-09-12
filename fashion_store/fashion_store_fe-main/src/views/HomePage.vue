<template>
  <div class="main">
    <div class="cards" v-for="image in images">
      <img :src="image" />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

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
</script>

<style scoped>
.main {
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
}
.cards img {
  width: 438px;
  padding: 1rem;
}
</style>

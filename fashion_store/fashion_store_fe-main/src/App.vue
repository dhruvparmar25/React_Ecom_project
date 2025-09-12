<template>
  <FullNav v-if="!route.path.includes('/admin')" />
  <div><router-view /></div>
  <Footer v-if="!route.path.includes('/admin')" />
</template>

<script setup>
import { useRoute } from "vue-router";
import FullNav from "./components/Navbar/FullNav.vue";
import Footer from "./views/Footer.vue";

const route = useRoute();
</script>

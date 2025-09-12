<template>
  <div class="fillter">
    <div class="cattitle">Product Filters</div>
    <slot></slot>
  </div>
</template>
<script setup>
const emit = defineEmits(["update-products"]);
</script>

<style scoped>
.fillter {
  height: 100vh;
  font-size: 2rem;
  font-weight: 700;
  overflow-y: auto;
  padding: 10px;
  background: #f8f9fa;
  border-right: 1px solid #ddd;
}

.cattitle {
  font-size: 16px;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>

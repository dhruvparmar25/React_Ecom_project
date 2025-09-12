<template>
  <div class="pagination">
    <button @click="$emit('prev')" :disabled="currentPage === 1" class="prev">
      &laquo;
    </button>
    <button
      v-for="page in pageNumbers"
      :key="page"
      @click="$emit('change', page)"
      :class="{ active: currentPage === page }"
    >
      {{ page }}
    </button>
    <button
      @click="$emit('next')"
      :disabled="currentPage === totalPages"
      class="next"
    >
      &raquo;
    </button>
  </div>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
});
const pageNumbers = computed(() => {
  return Array.from({ length: props.totalPages }, (_, i) => i + 1);
});
</script>
<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}
button {
  padding: 5px 12px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
}
button.active {
  background: #333;
  color: white;
}
button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>

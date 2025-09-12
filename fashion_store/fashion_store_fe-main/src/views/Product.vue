<template>
  <!-- Main Product Pages Section -->
  <section class="productpages">
    <FilterComponent class="sticky" @update-products="updateProductList">
      <!-- srch -->
      <div class="srch">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search.."
          @keyup.enter="fetchProducts"
          name="search"
        />
        <button @click="fetchProducts">
          <i class="fa fa-search"></i>
        </button>
      </div>
      <!-- Category Filter -->
      <div class="categoress">
        <header>
          <h3>Category</h3>
          <button @click="toggleCategory">
            {{ isCategoryView ? "∧" : "∨" }}
          </button>
        </header>

        <!-- Render categories dynamically from categories array -->
        <label
          v-for="category in categories"
          :key="category._id"
          class="content"
          :class="{ 'view-content': isCategoryView }"
        >
          <input
            type="checkbox"
            :value="category._id"
            :checked="productMetas.categoryId?.includes(category._id)"
            @change="filterProducts($event, 'category')"
          />
          {{ category.name }}
        </label>
      </div>

      <!-- Brand Filter (Type) -->
      <div class="brandfilter">
        <header>
          <h3>Type</h3>
          <button @click="toggleBrand">
            {{ isBrandView ? "∧" : "∨" }}
          </button>
        </header>
        <div class="brandList">
          <!-- Radio buttons for "Men" and "Women" types -->
          <label class="content" :class="{ 'view-content': isBrandView }">
            <input
              type="radio"
              value="Men"
              :checked="productMetas.type === 'Men'"
              @change="filterProducts($event, 'type')"
            />
            Men
          </label>
          <label class="content" :class="{ 'view-content': isBrandView }">
            <input
              type="radio"
              value="Women"
              :checked="productMetas.type === 'Women'"
              @change="filterProducts($event, 'type')"
            />
            Women
          </label>
        </div>
      </div>
    </FilterComponent>

    <!-- Product Listing Section -->
    <div class="products">
      <ProductPage
        v-for="prdlist in prdlists"
        :key="prdlist._id"
        @click="goToDetails(prdlist)"
        :product="prdlist"
      />
      {{ console.log("Product:", prdlists) }}
    </div>
  </section>

  <!-- Pagination Section -->
  <div class="pagination">
    <Pagination
      :current-page="currenPage"
      :total-pages="totalPages"
      @change="changePage"
      @prev="prePage"
      @next="nextPage"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import ProductPage from "@/views/ProductPage.vue";
import FilterComponent from "@/components/Filters/FilterComponent.vue";
import axios from "axios";
import Pagination from "@/views/Pagination.vue";

const router = useRouter();
const route = useRoute();
const productMetas = ref({ categoryId: [], type: null });
const isCategoryView = ref(!!productMetas.value?.categoryId?.length);
const isBrandView = ref(!!productMetas.value?.type);
const prdlists = ref([]);
const searchQuery = ref("");
const categories = ref([]);
const currenPage = ref(1);
const perPage = ref(12);
const totalProducts = ref(0);

const totalPages = computed(() => {
  return Math.ceil(totalProducts.value / perPage.value);
});

onMounted(() => {
  fetchCategories();
  setQuery();
  currenPage.value = parseInt(route.query.page) || 1;
});

watch(
  () => route.query,
  () => {
    setQuery();
  },
  { deep: true }
);

// Set query parameters based on URL
const setQuery = () => {
  const q = route.query;

  if (typeof q.categoryId === "string" && q.categoryId) {
    q.categoryId = [q.categoryId];
  }

  productMetas.value = {
    categoryId: q.categoryId || [],
    type: q.type || null,
  };

  isCategoryView.value = !!productMetas.value.categoryId.length;
  isBrandView.value = !!productMetas.value.type;
  currenPage.value = parseInt(route.query.page) || 1;

  fetchProducts();
};
const selectCategory = (categoryId) => {
  router.push({
    name: "Product",
    query: { categoryId: [categoryId], type: undefined },
  });
};
// Toggle category and brand views
const toggleCategory = () => {
  isCategoryView.value = !isCategoryView.value;
};
const toggleBrand = () => {
  isBrandView.value = !isBrandView.value;
};

// Navigate to product details page
const goToDetails = (item) => {
  if (!item?._id) return;
  productMetas.value = { categoryId: [], type: null };
  router.push({ name: "ProductDetail", params: { id: item._id }, query: {} });
};

// Fetch products from API
const fetchProducts = async () => {
  try {
    const params = {
      ...productMetas.value,
      q: searchQuery.value,
      page: currenPage.value,
      per_page: perPage.value,
    };
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}product`,
      {
        params,
      }
    );
    prdlists.value = response.data.data;
    totalProducts.value = response.data.total;
  } catch (error) {
    console.error("Error Fetching Products", error);
  }
};

// Fetch categories from API
const fetchCategories = async () => {
  axios
    .get(`${import.meta.env.VITE_API_BASE_URL}category`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((response) => {
      categories.value = response?.data?.data || [];
      console.log("Categories:", response);
    })

    .catch((error) => {
      console.error("Error Fetching Categories", error);
    });
};

// Filter products based on category or type
const filterProducts = (event, filterType) => {
  const val = event.target.value;

  if (filterType === "category") {
    if (productMetas.value.categoryId.includes(val)) {
      productMetas.value.categoryId = productMetas.value.categoryId.filter(
        (f) => f !== val
      );
    } else {
      productMetas.value.categoryId.push(val);
    }
  } else if (filterType === "type") {
    productMetas.value.type = val;
  }
  router.push({
    name: "Product",
    query: {
      type: productMetas.value.type || undefined,
      categoryId: productMetas.value.categoryId.length
        ? productMetas.value.categoryId
        : undefined, // Pass array directly
    },
  });

  fetchProducts();
};

// Update product list
const updateProductList = (newProducts) => {
  prdlists.value = newProducts;
};

// Pagination functions
const changePage = (page) => {
  currenPage.value = page;
  router.push({ name: "Product", query: { ...route.query, page } });
  fetchProducts();
};
const prePage = () => {
  if (currenPage.value > 1) changePage(--currenPage.value);
};
const nextPage = () => {
  if (currenPage.value < totalPages.value) {
    changePage(currenPage.value + 1);
  }
};
</script>

<style scoped>
.productpages {
  height: 100%;
  display: flex;
}

.fillter {
  width: 15%;
  height: 100vh;

  font-size: 2rem;
  font-weight: 700;
  background-color: #004b60;
  color: white;
}

.cattitle {
  font-size: 16px;
  text-transform: uppercase;
}

.products {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin: auto;
  width: 80%;
}
.content {
  display: none;
}

.view-content {
  display: block;
}

.fillter button {
  /* background-color: yellow; */
  border: none;
  text-decoration: dotted;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

header h3 {
  font-size: 17px;
  text-transform: math-auto;
  font-weight: 700;
  letter-spacing: 2px;
}

button {
  color: black;
  border-radius: 10px;
  font-size: 12px;
  width: 40px;
  font-weight: 700;
}

label,
input {
  font-size: 16px;
  text-transform: capitalize;
  font-family: monospace;
  font-weight: 500;
}

.categoress {
  border-top: 1px solid #c7cbd4;
}
.srch {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.srch input {
  width: 140px;
  padding: 6px;
  margin: 1rem 0rem;
  font-size: 12px;
  border: none;
  border-radius: 10px;
}
.srch button {
  height: 28px;
}
.sticky {
  position: sticky;
  top: 0;
}

.pagination {
  display: flex;
  /* padding-left: 0; */
  /* list-style: none; */
  justify-content: center;
  gap: 1rem;
}
.pagination button {
  color: black;
  border-radius: 5px;
  font-size: 12px;
  width: 40px;
  text-align: center;
  border: none;
}
.pagination button.active {
  background-color: black;
  color: white;
}
</style>

<template>
  <div class="title"><h4>Products</h4></div>

  <section class="admin-products">
    <div class="fillter-section">
      <FilterComponent class="sticky" @update-products="updateProductList">
        <div class="prd-btn">
          <button @click="openAddModal">+ Add Product</button>
        </div>
        <div class="srch">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search.."
            @keyup.enter="fetchAdminProducts"
            name="search"
          />
          <button @click="fetchAdminProducts">
            <i class="fa fa-search"></i>
          </button>
        </div>
        <div class="categoress">
          <header>
            <h3>Category</h3>
            <button @click="toggleCategory">
              {{ isCategoryView ? "∧" : "∨" }}
            </button>
          </header>
          <label
            v-for="category in categories"
            :key="category._id"
            class="content"
            :class="{ 'view-content': isCategoryView }"
          >
            <input
              type="checkbox"
              :value="category._id"
              :checked="productMetas.categoryId?.includes(category)"
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
    </div>
    <div class="prd-section">
      <div class="produts-cards">
        <div class="admin-cards">
          <div
            class="card-detail"
            v-for="product in products"
            :key="product._id"
          >
            <div class="card-img">
              <img :src="product.image" />
            </div>
            <div class="prd-title">
              <h4>{{ product.name }}</h4>
            </div>
            <div class="card-field">
              <div class="price">₹ {{ product.price }}</div>
              <div class="category">
                {{ product.category.name }}
              </div>
            </div>
            <div class="card-field">
              <div class="edit">
                <button @click="openEditModal(product)" type="button">
                  Edit
                </button>
              </div>
              <div class="remove">
                <button @click="removeAdminProduct(product)" type="button">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Add Product -->
      <Modal v-if="shoeModal" @close="shoeModal = false">
        <div class="addPrd">
          <form @submit.prevent="AddAdminProducts">
            <h2>Add Product</h2>
            <div class="detail">
              <label>Product Name:</label>
              <input
                type="text"
                v-model="form.name"
                placeholder="Enter product name"
                required
              />
            </div>
            <div class="brand">
              <label>Brand:</label>
              <input
                type="text"
                v-model="form.brand"
                placeholder="Example:@Boogy"
                required
              />
            </div>
            <div class="type">
              <label>Type:</label>
              <input
                type="text"
                v-model="form.type"
                placeholder="Example:@Men"
                required
              />
            </div>
            <div class="add-price">
              <label>Price :[Indian ₹]</label>
              <input type="number" v-model="form.price" required />
            </div>
            <div class="size">
              <label>Size:</label>
              <input type="checkbox" v-model="form.size" value="S" />S
              <input type="checkbox" v-model="form.size" value="M" />M
              <input type="checkbox" v-model="form.size" value="L" />L
              <input type="checkbox" v-model="form.size" value="XL" />Xl
              <input type="checkbox" v-model="form.size" value="XXL" />XXl
            </div>
            <div class="offer">
              <label>Offer:</label>
              <input
                placeholder="14%"
                type="text"
                v-model="form.offer"
                required
              />
            </div>
            <div class="design">
              <label>Design:</label>
              <input
                type="text"
                v-model="form.design"
                placeholder="Enter design"
                required
              />
            </div>
            <div class="rating">
              <label>Rating:[1 to 5]</label>
              <input
                type="number"
                v-model="form.rating"
                min="1"
                max="5"
                step="1"
                required
              />
            </div>

            <div class="add-category">
              <label>Category:</label>
              <select v-model="form.categoryId" name="categoryId">
                <option
                  v-for="cat in categories"
                  :value="cat._id"
                  :key="cat._id"
                >
                  {{ cat.name }}
                </option>
              </select>

              <div class="add-cat">
                <button @click="openCatAddModal = true">+ Category</button>
              </div>

              <Modal v-if="openCatAddModal" @close="openCatAddModal = false">
                <div class="cat-label">Add New Category</div>
                <input
                  v-model="newCategoryName"
                  type="text"
                  placeholder="Enter category name"
                  class="input"
                />
                <div class="cat-sub">
                  <button @click="addCategories">Add</button>
                </div>
              </Modal>
            </div>
            <div class="label">
              <label>Label:</label>
              <input
                type="text"
                v-model="form.label"
                placeholder="Enter label"
                required
              />
            </div>
            <div class="image">
              <label for="image-upload"> Product Image : </label>
              <input
                @change="uploadImage"
                type="file"
                accept="image/*"
                required
              />
            </div>
            <div class="submit">
              <button type="button" @click="AddAdminProducts">
                Add Product
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  </section>
  <Pagination
    :current-page="currenPage"
    :total-pages="totalPages"
    @change="changePage"
    @prev="prePage"
    @next="nextPage"
  />
</template>
<script setup>
import FilterComponent from "../Filters/FilterComponent.vue";
import axios from "axios";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import Modal from "../commons/Modal.vue";
import { updateImage } from "@/utils/helpers";
import { FileUploadModules } from "@/utils/Enum";
import Pagination from "@/views/Pagination.vue";
const form = ref({
  brand: "",
  price: "",
  size: [],
  offer: "",
  design: "",
  rating: "",
  categoryId: "",
  label: "",
  image: "",
  categoryAdd: "",
});

const route = useRoute();
const router = useRouter();
const productMetas = ref({ categoryId: [], type: null });
const isCategoryView = ref(!!productMetas.value?.categoryId?.length);
const isBrandView = ref(!!productMetas.value?.type);
const categories = ref([]);
const imageFile = ref(null);
const searchQuery = ref("");
const products = ref([]);
const currenPage = ref(1);
const perPage = ref(12);
const totalProducts = ref(0);

const shoeModal = ref(false);
const isEditMode = ref(false);
const openCatAddModal = ref(false);
const newCategoryName = ref("");
// const showAddCategoryModal = ref(false);
openCatAddModal.value = false;

const selectProduct = ref(null);
const totalPages = computed(() => {
  return Math.ceil(totalProducts.value / perPage.value);
});

onMounted(() => {
  setQuery();
  fetchCategories();
});

watch(
  () => route.query,
  () => {
    setQuery();
  },
  { deep: true }
);
const toggleCategory = () => {
  isCategoryView.value = !isCategoryView.value;
};
const toggleBrand = () => {
  isBrandView.value = !isBrandView.value;
};
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

  fetchAdminProducts();
};

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
const addCategories = () => {
  axios
    .post(
      `${import.meta.env.VITE_API_BASE_URL}admin/category`,
      { name: newCategoryName.value },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((res) => {
      openCatAddModal.value = false;
      newCategoryName.value = "";
      fetchCategories();
      toast.success("Category added successfully");
    })
    .catch((error) => {
      console.error("Error adding category:", error);
      toast.error(error?.res?.data?.message || "Error adding category");
    });
};

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
    productMetas.value.type = null;
  } else if (filterType === "type") {
    productMetas.value.type = val;
  }
  router.push({
    name: "adminproducts",
    query: {
      type: productMetas.value.type || undefined,
      categoryId: productMetas.value.categoryId.length
        ? productMetas.value.categoryId
        : undefined, // Pass array directly
      category: undefined,
      page: currenPage.value,
    },
  });

  fetchAdminProducts();
};

const updateProductList = (newProducts) => {
  products.value = newProducts;
};

const fetchAdminProducts = async () => {
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
    console.log("total : ", response.data.total);
    products.value = response.data.data;
    totalProducts.value = response.data.total;
  } catch (error) {
    console.error("Error Fetching Products", error);
  }
};

const uploadImage = (event) => {
  imageFile.value = event.target.files[0];
};
const AddAdminProducts = async () => {
  try {
    let action = form.value?._id ? "put" : "post";
    let path = `${import.meta.env.VITE_API_BASE_URL}admin/products`;
    if (form.value?._id) {
      path += `/${form.value?._id}`;
    }
    const res = await axios[action](path, form.value, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res.data?._id && imageFile.value) {
      await updateImage(
        FileUploadModules.PRODUCT,
        res.data?._id,
        imageFile.value
      );
      console.log("dcdvscsccsdc", res.data, imageFile.value);
    }
    await fetchAdminProducts();
    toast.success("Product Added Successfully");
    shoeModal.value = false;
    // reset form
    form.value = {
      name: "",
      brand: "",
      price: "",
      discounted_price: "",
      image: "",
      gender: "",
      category: "",
      color: "",
      size: [],
    };
  } catch (err) {
    const errorMessage = err.response?.data?.msg || "somthing went a wrong";
    toast.error(errorMessage);
    console.error("Error:", err);
  }
};

//Remove Product
const removeAdminProduct = async (product) => {
  if (!product || !product._id) {
    console.error("error:product id is missing");
    return;
  }
  const id = product._id;
  try {
    await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}admin/products/${id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    toast.success("product remove");

    products.value = products.value.filter((i) => i._id !== id);
  } catch (error) {
    console.error("Error Removing Item :", error);
  }
};
// Pagination functions
const changePage = (page) => {
  currenPage.value = page;
  router.push({ name: "adminproducts", query: { ...route.query, page } });
  fetchAdminProducts();
};
const prePage = () => {
  if (currenPage.value > 1) changePage(--currenPage.value);
};
const nextPage = () => {
  if (currenPage.value < totalPages.value) {
    changePage(currenPage.value + 1);
  }
};
const openAddModal = () => {
  isEditMode.value = false;
  selectProduct.value = null;

  form.value = {
    name: "",
    brand: "",
    type: "",
    price: "",
    size: [],
    offer: "",
    design: "",
    rating: "",
    categoryId: "",
    label: "",
    image: "",
    catAdd: "",
  };

  imageFile.value = null;
  shoeModal.value = true;
};

const openEditModal = (product) => {
  console.log("csdcscdcscdcsdc", product);
  isEditMode.value = true;
  selectProduct.value = product;

  form.value = {
    _id: product?._id,
    name: product.name,
    brand: product.brand,
    type: product.type,
    price: product.price,
    size: product.size,
    offer: product.offer,
    design: product.design,
    rating: product.rating,
    categoryId: product.categoryId,
    label: product.tags?.[0]?.label,
    image: product.image,
  };
  shoeModal.value = true;
};

const submitForm = () => {
  if (isEditMode.value && selectProduct.value) {
    updateProduct(selectProduct.value._id);
  } else {
    AddAdminProducts();
  }
};

const updateProduct = async (id) => {
  try {
    const formData = new FormData();
    formData.append("name", form.value.name);
    formData.append("brand", form.value.brand);
    formData.append("type", form.value.type);
    formData.append("price", form.value.price);
    formData.append("size", JSON.stringify(form.value.size));
    formData.append("offer", form.value.offer);
    formData.append("design", form.value.design);
    formData.append("rating", form.value.rating);
    formData.append("category", form.value.category);
    formData.append("label", form.value.label);

    if (imageFile.value) {
      formData.append("image", imageFile.value);
    }

    const res = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}admin/products/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.success("Product updated successfully");
    shoeModal.value = false;
    isEditMode.value = false;
    selectProduct.value = null;
    fetchAdminProducts();
  } catch (error) {
    console.error("Error updating product:", error);
    toast.error("Error updating product");
  }
};
</script>
<style scoped>
.title {
  border-bottom: 1px solid #e1e6eb;
}
.title h4 {
  margin: 1rem;
  font-size: 16px;
  font-weight: 700;
  font-family: "inter";
}
.admin-products {
  display: flex;
  justify-content: start;
}
.admin-cards {
  height: auto;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
.card-detail {
  width: 218px;
  height: 300px;
  padding: 0.5rem;
  border-radius: 10px;
  background-color: rgba(231, 229, 229, 0.938);
}
.card-img {
  width: 100%;
  display: flex;
}
.card-img img {
  width: 65%;
  margin: auto;
  border-radius: 10px;
  margin: auto;
}
.prd-title h4 {
  font-size: 12px;
  font-weight: bold;
  margin-top: 10px;
  height: 37px;
}
.card-field {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.price {
  font-size: large;
  font-weight: bold;
  margin-bottom: 10px;
  color: red;
}
.category {
  color: green;
}
.edit button,
.remove button {
  border: none;
  border-radius: 5px;
  width: 80px;
  padding: 5px;
}
.edit button,
.prd-btn button {
  font-size: 14px;
  background-color: lightblue;
}
.remove button {
  background-color: lightcoral;
}
.edit button:hover,
.prd-btn button:hover {
  background-color: blue;
  color: white;
}
.remove button:hover {
  background-color: red;
  color: white;
}
.prd-btn button {
  border: none;
  border-radius: 5px;
  width: fit-content;
  padding: 5px;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}
.srch {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.srch input {
  width: 100px;
  padding: 6px;
  margin: 1rem 0rem;
  font-size: 12px;
  border: none;
  border-radius: 10px;
}
.sticky,
.fillter-section {
  position: sticky;
  top: 0;
}
.srch button {
  padding: 4px;
  background: #ddd;
  font-size: 13px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.srch button:hover {
  background: #ccc;
}

/* form */
.addPrd {
  margin: 1rem;
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI" sans-serif;
}
.addPrd h2 {
  text-align: center;

  color: #333;
}
.addPrd form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.addPrd label {
  font-weight: 600;
  display: block;
  color: #555;
}
.addPrd input[type="text"],
.addPrd input[type="number"] {
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  transition: border 0.3s;
}
.addPrd input[type="text"]:focus,
.addPrd input[type="number"]:focus {
  border-color: #3498db;
}
.addPrd .size input[type="checkbox"] {
  margin-right: 5px;
  font-size: 18px;
}
.addPrd .size label {
  margin-right: 10px;
}

.image input[type="file"] {
  color: red;
}
.categoress {
  border-top: 1px solid #c7cbd4;
}
.content {
  display: none;
}
.view-content {
  display: block;
}
.submit {
  text-align: center;
}
.add-category {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.cat-label {
  font-size: 16px;
  text-align: center;
  padding: 1rem;
  color: black;
  font-weight: 700;
}
.cat-sub {
  padding: 10px;
  text-align: center;
}
.submit button,
.cat-sub button {
  width: fit-content;
  background-color: #27ae60;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.3s;
}
.add-cat button {
  width: fit-content;
  background-color: #27ae60;
  color: white;
  border: none;
  cursor: pointer;
  padding: 5px 5px;
  margin: 1rem;
}

.submit button:hover {
  background-color: #219150;
}
.categoress {
  border-top: 1px solid #c7cbd4;
}

.content {
  display: none;
}

.view-content {
  display: block;
}

.content {
  display: none;
}

.view-content {
  display: block;
}

.fillter button {
  background-color: #0e4a5a;
  color: white;
  border: none;
  font-weight: 500;
  font-size: 12px;
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

.sticky {
  position: sticky;
  top: 0;
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
  padding: 4px;
  background: #ddd;
  font-size: 13px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.srch button:hover {
  background: #ccc;
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
@media screen and (min-width: 1536px) and (max-width: 1536px) and (min-height: 864px) and (max-height: 864px) {
  .admin-products {
    display: flex;
    justify-content: start;
    gap: 85px;
  }
}
</style>

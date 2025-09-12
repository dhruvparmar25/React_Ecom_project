<template>
  <!-- {{ product }} -->
  <section class="productdetail" v-if="product">
    <div class="main">
      <div class="image">
        <div class="mainimage">
          <img :src="product.image" />
        </div>
      </div>
      <div class="detail">
        <div class="productdetail">
          <div class="brand">{{ product.brand }}</div>

          <div class="name" style="margin-top: 1rem">{{ product.name }}</div>
          <div class="lable">Select size</div>
          <div class="size">
            <!-- {{ console.log(product.size) }} -->
            <label class="Size" v-for="s in product.size" :key="s">
              <input
                type="radio"
                name="size"
                :value="s"
                v-model="selectSize"
              />{{ s }}
            </label>
          </div>

          <div class="combine">
            <h4 class="price">
              <i class="fa-solid fa-indian-rupee-sign"></i> {{ product.price }}
            </h4>
            <h4 class="offer">{{ product.discount }}</h4>
          </div>
          <div class="combine">
            <div class="design">{{ product.design }}</div>
            <h4 class="rating">
              <i class="fa-solid fa-star"></i>{{ product.rating }}
            </h4>
          </div>
          <div class="combine">
            <h6 class="category">{{ product.categoryId.name }}</h6>
            <div
              v-if="product.tags?.length"
              v-for="tag in product.tags"
              class="label"
            >
              {{ tag.label }}
            </div>
          </div>
        </div>
        <button class="addtocart" @click="addToCart" type="button">
          <i class="fa-solid fa-bag-shopping"></i> Add to bag
        </button>
      </div>
    </div>
  </section>

  <p v-else>Loading...</p>
  <latestProduct />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { toast } from "vue3-toastify";
import latestProduct from "@/components/LatestProduct/latestProduct.vue";

const route = useRoute();
const router = useRouter();
const product = ref(null);
const cart = ref([]);
const selectSize = ref(null);
const sizes = ref([]);

onMounted(async () => {
  fetchData();
  loadCart();
});

const fetchData = async () => {
  const productId = route.params.id;
  if (!productId) {
    console.error("Product ID not found!");
    return;
  }
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}product/${productId}`
    );
    product.value = response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
};
const loadCart = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}cart`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    cart.value = res.data.item || res.data || [];
  } catch (error) {
    console.error("error loading cart:", error);
  }
};

const addToCart = async () => {
  if (!product.value) return;

  if (!selectSize.value) {
    toast.info("Please Select A size Before Adding to cart");
    return;
  }

  try {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}cart`,
      [
        {
          productId: route.params.id,
          quantity: 1,
          size: selectSize.value,
          price: product.value.price,
        },
      ],
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    toast.success("Product Added In Cart!", {
      autoClose: 1000,
      position: "top-right",
      theme: "colored",
      onClose: () => router.push("/cart"),
    });
  } catch (error) {
    console.log("Error adding to cart:", error);
    const errorMessage = error.response?.data?.msg || "somthing went a wrong";
    if (error.response?.data?.status_code === "E_UNAUTHORIZED_ACCESS") {
      localStorage.clear();
      toast.error("Please Login OR Register Your Account", {
        autoClose: 1000,
        position: "top-right",
        theme: "colored",
        onClose: () => router.push("/login"),
      });
    } else {
      toast.error(errorMessage);
    }
  }
};
</script>

<!-- css -->
<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: start;
  width: 90%;
  margin: auto;
  gap: 1rem;
}
.image {
  width: 40%;
}
.detail {
  width: 40%;
}
.mainimage img {
  width: 100%;
  height: auto;
}

.productdetail {
  padding: 0%;
  margin: 0;
}
.lable {
  margin: 1rem 0rem;
}
.brand,
.lable {
  font-size: "Montserrat";
  font-size: 1rem;
  font-weight: 500;
}
.name {
  font-family: "Montserrat";
  font-size: 2rem;
  font-weight: 700;
  color: black;
  border-bottom: 1px solid #d5d9d9;
}

.size {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.size > label {
  width: 50px;
  height: 30px;
  text-align: center;
  border: 1px solid #d5d9d9;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
}
.size label input {
  display: none;
}
.size label:has(input:checked) {
  background-color: black;
  color: white;
}
.desc,
.design {
  font-family: "Montserrat";
  font-size: 14px;
  color: rgb(115, 126, 147);
}
.combine {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}
.price {
  font-family: "Montserrat";
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  color: rgb(54, 53, 55);
}
.offer {
  font-family: "Montserrat";
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: rgb(0, 140, 45);
  margin-right: 200px;
}
.category {
  font-family: "Montserrat";
  font-weight: 600;
  background-color: rgb(105, 104, 106);
  color: white;
  border: 1px solid rgb(115, 115, 115);
  font-size: 14px;
  padding: 5px;
}
.rating {
  font-family: "Montserrat";
  font-size: 14px;
  font-weight: 700;
  margin-right: 200px;
}
.rating i {
  color: gold;
  margin-right: 0.5rem;
}

.label {
  font-family: "Montserrat";
  font-size: 14px;
  color: rgb(115, 115, 115);
  border: 1px solid rgb(115, 115, 115);
  padding: 5px;
  width: fit-content;
  margin-right: 200px;
}
.addtocart {
  background-color: #26829c;
  font-family: "Montserrat";
  font-size: 16px;
  /* font-weight: 600; */
  text-transform: uppercase;
  line-height: 24px;
  padding: 10px;
  width: fit-content;
  border: none;
  border-radius: 10px;
  color: white;
  margin-top: 2rem;
  /* text-align: center; */
}
.addtocart i {
  margin-right: 1rem;
}
</style>

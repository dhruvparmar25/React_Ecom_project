<template>
  <div class="main">
    <div class="bag">
      <!-- {{ totalItems }} -->
      <div class="title"><h4>Shopping Bag</h4></div>
      <div v-if="cart?.items?.length > 0" class="cart-items">
        <div v-for="item in cart?.items || []" :key="item.id" class="cart-item">
          <img
            :src="item?.productId.image"
            alt="product image"
            class="cart-item-image"
          />
          <div class="cart-item-details">
            <h5>{{ item?.productId?.name }}</h5>
            <p>Price: ₹{{ item?.productId.price }}</p>
            <p>Size : {{ item?.size }}</p>
            <div class="quantity-control">
              <button @click="decreaseQuantity(item)" class="qty-btn">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)" class="qty-btn">+</button>
            </div>
            <button @click="removeFromCart(item)" class="remove-btn">
              Remove
            </button>
          </div>
        </div>
      </div>
      <p v-else class="empty-cart">Your cart is empty.</p>
    </div>
    <div class="summary">
      <div class="title"><h4>Order Summary</h4></div>
      <p>
        Total Items: <span>{{ totalItems }}</span>
      </p>
      <p>
        Total Price: ₹<span>{{ totalPrice }}</span>
      </p>

      <Address v-if="cart?.items?.length > 0" :cart="cart" />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

import { useCartstore } from "@/stores/cartStore";

const cart = computed(() => cartStore.cart);
const router = useRouter();
const cartStore = useCartstore();

const loadCart = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}cart`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    cart.value = res.data;
    console.log(cart.value._id);
  } catch (error) {
    console.error("Error loading cart:", error);
  }
};

const increaseQuantity = async (item) => {
  if (!item || !item.productId?._id) {
    console.error("Invalid Product ID");
    return;
    await cartStore.updateQuantity(item.productId._id, item.quantity + 1);
  }
  try {
    await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}cart/${item.productId._id}`,
      {
        quantity: item.quantity + 1,
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    item.quantity++;
  } catch (error) {
    console.error("Error updating quantity:", error);
  }
};

const decreaseQuantity = async (item) => {
  if (!item || !item.productId?._id) {
    console.error("Invalid Product ID");
    return;
    await cartStore.updateQuantity(item.productId._id, item.quantity - 1);
  }
  if (item.quantity > 1) {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}cart/${item.productId._id}`,
        {
          quantity: item.quantity - 1,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      item.quantity--;
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  } else {
    await cartStore.removeItem(item.productId._id);

    removeFromCart(item.productId?._id);
  }
};

const removeFromCart = async (item) => {
  console.log("Cliked item:", item.productId?._id);
  if (!item || !item.productId?._id) {
    console.error("Error:Product ID is missing!");
    return;
    await cartStore.removeItem(item.productId._id);
  }
  const id = item.productId?._id;

  try {
    await axios.delete(`${import.meta.env.VITE_API_BASE_URL}cart/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    cart.value.items = cart.value?.items?.filter(
      (i) => i.productId?._id !== id
    );
    toast.success("Product Remove From Cart");
  } catch (error) {
    console.error("Error Removing Item from cart:", error);
  }
};

const totalItems = computed(() => cartStore.totalItems);
const totalPrice = computed(() =>
  cart.value?.items?.reduce(
    (sum, item) => sum + item?.productId.price * item.quantity,
    0
  )
);

onMounted(() => {
  loadCart();
  cartStore.loadCart();
});
</script>

<style scoped>
.main {
  width: 90%;
  height: 100vh;
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem 0;
}

.bag {
  width: 55%;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.title h4 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.cart-item {
  display: flex;
  gap: 15px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.cart-item:hover {
  transform: translateY(-3px);
  box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.1);
}

.cart-item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.cart-item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.cart-item-details h5 {
  font-size: 16px;
  font-weight: 600;
  color: #444;
}

.cart-item-details p {
  font-size: 14px;
  color: #777;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
}

.qty-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 5px 12px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.qty-btn:hover {
  background: #0056b3;
}

.remove-btn {
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
  width: fit-content;
}

.remove-btn:hover {
  background: #e60000;
}

.empty-cart {
  font-size: 16px;
  color: #777;
  text-align: center;
  margin-top: 10px;
}

.summary {
  width: 45%;
  background: #f8f8f8;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.summary p {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 10px 0;
}

.summary p span {
  font-weight: 600;
  color: #111;
}

.checkout-btn {
  width: 100%;
  background: #28a745;
  color: white;
  font-size: 16px;
  font-weight: 600;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.checkout-btn:hover {
  background: #218838;
}

@media (max-width: 768px) {
  .main {
    flex-direction: column;
    align-items: center;
  }

  .bag,
  .summary {
    width: 100%;
  }

  .cart-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .cart-item-image {
    width: 100px;
    height: 100px;
  }
}
</style>

<template>
  <div class="order-container">
    <h2>Delivery Address</h2>
    <div class="address">
      <div class="form-group">
        <label>Select Address</label>
        <div class="saved-address">
          <div
            v-for="addr in saveAddresses"
            :key="addr._id"
            class="address-box"
            :class="{ selected: addr._id === selectAddressId }"
            @click="selectAddressId = addr._id"
          >
            <strong>{{ addr.fullName }}</strong>
            <div>
              {{ addr.phoneNumber }}, {{ addr.city }}, {{ addr.state }}
              {{ addr.pincode }}
            </div>
            <div>{{ addr.country }}</div>
            <small v-if="addr.isDefault" class="default-label"
              >Default address</small
            >
            <button @click="deleteAddress(addr._id)" class="delete-btn">
              🗑
            </button>
          </div>
        </div>
      </div>
      <button class="addAddress-btn" @click="showAddressModal = true">
        + Address
      </button>
    </div>

    <!-- {{ saveAddresses }} -->
    <button type="submit" class="order-btn" @click="placeOrder">
      Place Order
    </button>
    <Modal v-if="showAddressModal" @close="showAddressModal = false">
      <div class="label"><h4>Add New Address</h4></div>
      <form @submit.prevent="addAddress">
        <div class="form-group">
          <label>Full Name:</label>
          <input
            v-model="address.fullName"
            placeholder="Please Enter Your First Name"
            required
          />
        </div>
        <div class="form-group">
          <label>PHONE NUMBER</label>
          <input
            v-model="address.phoneNumber"
            placeholder="Please Enter Your Phone Number"
            required
          />
        </div>
        <div class="form-group">
          <label>Street</label>
          <input
            v-model="address.street"
            placeholder="Please Enter Your Street Name"
            required
          />
        </div>
        <div class="form-group">
          <label>City</label>
          <input
            v-model="address.city"
            placeholder="Please Enter Your City Name"
            required
          />
        </div>
        <div class="form-group">
          <label>state</label>
          <input
            v-model="address.state"
            placeholder="Please Enter Your State Name"
            required
          />
        </div>
        <div class="form-group">
          <label>Zip Code</label>
          <input
            v-model="address.pincode"
            placeholder="Please Enter Your ZipCode Name"
            required
          />
        </div>
        <div class="form-group">
          <label>Country</label>
          <input
            v-model="address.country"
            placeholder="Please Enter Your Country Name"
            required
          />
        </div>
        <div class="form-group">
          <label>landmark</label>
          <input
            v-model="address.landmark"
            placeholder="Please Enter Your landmark"
          />
        </div>
        <button class="add-save" type="submit">Save Add</button>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import Modal from "@/components/commons/Modal.vue";
import { completeOrderPayment } from "@/utils/helpers";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify"; // Importing toast from vue3-toastify
import "vue3-toastify/dist/index.css"; // Importing toastify CSS

const props = defineProps(["cart"]);
const router = useRouter();

const address = ref({
  fullName: "",
  phoneNumber: "",
  street: "",
  city: "",
  state: "",
  pincode: "",
  country: "",
  landmark: "",
});

const showAddressModal = ref(false);
const selectAddressId = ref("");
const saveAddresses = ref([]);

const fetchAddresses = () => {
  axios
    .get(`${import.meta.env.VITE_API_BASE_URL}addresses`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      console.log("API Response:", res.data);
      saveAddresses.value = res.data.addresses;
    })
    .catch((err) => {
      console.error("Error Fetching addresses:", err);
    });
};

const addAddress = () => {
  axios
    .post(`${import.meta.env.VITE_API_BASE_URL}address/`, address.value, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      toast.success("Address Addred!");
      showAddressModal.value = false;
      fetchAddresses();
      console.log("Address:", res);
    })
    .catch((err) => {
      toast.error("Faild to add address");
    });
};
const placeOrder = async () => {
  const cartId = props.cart?._id;
  if (!cartId) {
    toast.error("Cart is empty!");
    return;
  }
  const selectAddress = saveAddresses.value.find(
    (addr) => addr._id === selectAddressId.value
  );
  if (!selectAddress) return toast.error("please select address");
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}orders/${cartId}`,
      {
        addressId: selectAddressId.value,
        address: selectAddress,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    toast.success(" Delivery Address added successfully", {
      autoClose: 2000,
      position: "top-right",
    });
    localStorage.removeItem("cartId");
    await completeOrderPayment(res.data);
  } catch (error) {
    console.error("Address failed:", error);
    const errorMessage = error.response?.data?.msg || "somthing went a wrong";
    toast.error(errorMessage);
  }
};

const deleteAddress = (id) => {
  if (!confirm("Are you sure you want to delete this address?")) return;
  axios
    .delete(`${import.meta.env.VITE_API_BASE_URL}address/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then(() => {
      toast.success("Address removed successfully");
      fetchAddresses();
    })
    .catch((err) => {
      console.error("Delete error:", err);
      toast.error("Failed to delete address");
    });
};
onMounted(() => {
  fetchAddresses();
});
console.log("Saved Addresses:", saveAddresses.value);
</script>

<style scoped>
.address {
  display: flex;
  justify-content: space-between;
}
.addAddress-btn {
  background-color: lightgreen;
  border: none;
  font-size: 14px;
  padding: 5px;
  border-radius: 10px;
  width: 20%;
  height: 1%;
  color: white;
  margin-top: 5px;
}
.addAddress-btn:hover,
.add-save:hover {
  background-color: green;
}
.add-save {
  background-color: lightgreen;
  border: none;
  padding: 5px;
  color: white;
  border-radius: 10px;
}
.order-container h2 {
  text-transform: uppercase;
  font-size: 1rem;
  margin: 1rem 0;
  text-align: center;
}

form {
  max-width: 700px;
  margin: 20px;
  padding: 10px;
  background-color: #fafafa;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.form-group {
  margin-bottom: 0.4rem;
}
.label {
  text-align: center;

  font-weight: 500;
}

label {
  font-size: 0.85rem;
  color: #222;
  margin-bottom: 0.1rem;
  display: block;
}

input {
  width: 100%;
  padding: 6px 8px;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button.order-btn {
  width: 100%;
  padding: 8px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.95rem;
  margin-top: 8px;
  cursor: pointer;
}

button.order-btn:hover {
  background-color: #0056b3;
}
.saved-addresses {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem 0;
}
.address-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9f9f9;
  padding: 10px;
  border-radius: 6px;
}
.delete-btn {
  background-color: lightcoral;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  width: fit-content;
}
.delete-btn:hover {
  background-color: red;
}
.saved-addresses {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 1rem 0;
}

.address-box {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px;
  cursor: pointer;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
  background: #fff;
}

.address-box:hover {
  border-color: #007bff;
}

.address-box.selected {
  border: 2px solid #007bff;
  background-color: #e6f0ff;
}
</style>

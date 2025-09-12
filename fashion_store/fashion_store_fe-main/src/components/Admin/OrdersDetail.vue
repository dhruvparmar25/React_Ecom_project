<template>
  <!-- -->
  <div class="orders-page">
    <div class="order-detail">
      <div class="label">
        <h4>Orders Detail</h4>
        <div v-if="OrdersDetail?.items?.length" class="length">
          {{ OrdersDetail.items.length }}
        </div>
      </div>
      <div
        class="product-details"
        v-for="(item, index) in OrdersDetail.items"
        :key="index"
      >
        <div class="product">
          <div class="order-img">
            <img
              :src="item.productId?.image"
              style="width: fit-content; height: 55px"
            />
          </div>
          <div class="prder-detail">
            <h6>{{ item.productId?.category }}</h6>
            <!-- {{ item }} -->
            <p>Size:{{ item.size }}</p>
            <p>Gender:{{ item.productId?.type }}</p>
          </div>
        </div>
        <div class="items">
          <div class="item-price">
            <div class="prd-price">₹{{ item.productId?.price }}</div>
          </div>
          <div class="item-qty">
            <div class="prd-qut">{{ item.quantity }}</div>
          </div>
          <div class="prd-price">₹{{ item.price }}</div>
        </div>
      </div>
      <div class="total">
        <h4>
          Total Amount :
          <strong style="color: black">₹{{ OrdersDetail.totalAmount }}</strong>
        </h4>
      </div>
    </div>
    <div class="customer-detail">
      <div class="label">
        <h4>Customer</h4>
      </div>
      <div class="cust-main">
        <div class="cust-details">
          <div class="name">
            <div class="cust-detail">
              <strong>Name: </strong
              >{{
                OrdersDetail?.address?.fullName ||
                OrdersDetail?.addressId?.fullName
              }}
            </div>
          </div>
          <div class="conatct-label">
            <label>Contact-info</label>
          </div>
          <div class="mail">
            <div class="cust-detail">
              <i class="fa fa-envelope" aria-hidden="true"></i>
              {{ OrdersDetail.userId?.email }}
            </div>
          </div>
          <div class="phone">
            <div class="cust-detail">
              <i class="fa fa-phone" aria-hidden="true"></i>
              {{
                OrdersDetail?.address?.phoneNumber ||
                OrdersDetail?.addressId?.phoneNumber
              }}
            </div>
          </div>
          <!-- address -->
          <div class="conatct-label">
            <label> Shipping address</label>
          </div>
          <div class="mail">
            <div class="cust-detail">
              <!-- {{ OrdersDetail.addressId }} -->
              {{
                OrdersDetail?.address?.street ||
                OrdersDetail?.addressId?.landmark
              }}<br />
              {{ OrdersDetail?.address?.city || OrdersDetail?.addressId?.city }}
              <br />
              {{
                OrdersDetail?.address?.state || OrdersDetail?.addressId?.state
              }}
              <br />
              {{
                OrdersDetail?.address?.zipCode ||
                OrdersDetail?.addressId?.pincode
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

onMounted(() => {
  fetchOrders();
});
const OrdersDetail = ref([]);
const route = useRoute();

const fetchOrders = async () => {
  const ordersId = route.params.id;
  console.log("Fetching order with ID:", ordersId); // Log the ID

  if (!ordersId) {
    console.error("order ID not found!");
    return;
  }
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}admin/orders/${ordersId}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    OrdersDetail.value = res.data;
  } catch (error) {
    console.log("Error OrdersDetaills User", error);
  }
};
</script>
<style scoped>
.orders-page {
  display: flex;
  gap: 1rem;
  align-items: start;
}
.order-detail {
  margin: 2rem;
  width: 60%;
  border-radius: 1rem;
  border: 1px solid #eef0f7;
}
.label {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eef0f7;
}
.label h4 {
  margin: 1rem;
}
.order-detail h4,
.label h4 {
  font-family: "inter";
  font-weight: 400;
  font-size: 18px;
  color: rgb(0, 0, 0);
  margin: 1rem;
}
.product-details {
  display: flex;
  margin: 1rem;
  justify-content: space-between;
  border-bottom: 1px solid #eef0f7;
}

.product {
  display: flex;
  gap: 0.5rem;
}
.prder-detail p {
  margin: 0%;
  font-size: 14px;
  color: #67779b;
}
.length {
  background-color: #67779b;
  color: white;
  width: 25px;
  text-align: center;
  border-radius: 50%;
}
.prder-detail h6 {
  margin: 0%;
}
.items {
  display: flex;
  gap: 2rem;
  font-weight: 600;
  align-items: center;
}
.customer-detail {
  border-radius: 1rem;
  border: 1px solid #eef0f7;
  margin: 2rem;
  width: 25%;
}
.total {
  text-align: end;
}
.total h4 {
  color: #6c7788;
}
.cust-main {
  margin: 1rem;
}
.name,
.phone {
  border-bottom: 1px solid #eef0f7;
}
.cust-detail {
  color: #6c7788;
  margin: 1rem;
}
.cust-detail label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.cust-contact {
  margin: 1rem;
}
.cust-detail div {
  margin-bottom: 5px;
}
.conatct-label {
  margin: 1rem;
}
.conatct-label label {
  font-size: 20px;
  font-weight: 600;
}
</style>

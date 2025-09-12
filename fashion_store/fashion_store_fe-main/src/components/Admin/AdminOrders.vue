<template>
  <div class="title"><h4>Orders</h4></div>
  <section>
    <table style="width: 100%">
      <thead>
        <tr>
          <th>No</th>
          <th>Order ID</th>
          <th>Date</th>
          <th>Customer</th>
          <th>Order Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in Orders" :key="order._id">
          <!-- {{
            order._id
          }} -->
          <td>{{ index + 1 }}</td>
          <td>{{ order._id }}</td>
          <td>{{ formatDate(order.createdAt) }}</td>
          <td>{{ order.user?.name }}</td>
          <td>{{ order.totalAmount }}</td>

          <td>
            <button @click="goToOrders(order)" class="viewall">
              OrderDetail
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const Orders = ref([]);
const router = useRouter();

onMounted(() => {
  fetchOrders();
});

const fetchOrders = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}admin/orders`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    Orders.value = res.data;
  } catch (error) {
    console.log("Error Fetching User", error);
  }
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short", // ya "long"
    year: "numeric",
  });
};

const goToOrders = (order) => {
  if (!order?._id) return;
  console.log("orders", order);
  router.push({ name: "ordersDetail", params: { id: order._id }, query: {} });
};
</script>
<style scoped>
table,
th,
td {
  border: 1px solid #e1e6eb;
  border-radius: 10px;
  border-collapse: collapse;
  width: fit-content;
  padding: 1rem;
  width: 230px;
}
.adminusers-main {
  border-radius: 10px;
  margin: 1rem;
}
thead {
  font-weight: bold;
}
.title {
  border-bottom: 1px solid #e1e6eb;
}
.title h4 {
  margin: 1rem;
  font-size: 16px;
  font-weight: 700;
  font-family: "inter";
}
.viewall {
  background-color: lightblue;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.viewall:hover {
  background-color: blue;
}
.order-img {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.order-img img {
  width: 100%;
}
.prder-detail h4,
.prder-detail h6 {
  font-size: 10px;
}
.modal-content {
  background: #fff;
  border-radius: 1rem;
  max-height: fit-content;
  overflow-y: auto;
  width: 100%;
  max-width: fit-content;
  left: 12rem;
}
</style>

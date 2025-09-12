<template>
  <div class="main">
    <div class="title"><h4>Reports</h4></div>
    <section class="report">
      <div class="box-fltr" @click="showReportFilter = !showReportFilter"></div>
      <div class="date-filters">
        <label
          >Start Date:
          <input type="date" v-model="cardRange.startDate" />
        </label>
        <label
          >End Date:
          <input type="date" v-model="cardRange.endDate" />
        </label>
      </div>

      <div class="box">
        <div class="totalSale">
          {{ console.log("report :", reports) }}
          <div class="detail">
            <div class="title">Total Sales</div>
          </div>
          <div class="sale-detail">
            <div class="totalAmount">
              <h1>₹{{ reports.totalAmount || 0 }}</h1>
            </div>
          </div>
        </div>

        <div class="totalOrder">
          <div class="detail">
            <div class="title">Total Orders</div>
          </div>
          <div class="order-detail">
            <div class="totalOrders">
              <h1>{{ reports.totalOrders || 0 }}</h1>
            </div>
          </div>
        </div>

        <div class="totalRevenue">
          <div class="detail">
            <div class="title">Total Revenue</div>
          </div>
          <div class="sale-detail">
            <div class="totalAmount">
              <h1>₹{{ revenues.totalRevenue || 0 }}</h1>
            </div>
          </div>
        </div>
      </div>

      <div class="topselling">
        <div class="top-pannel">
          <div class="title-selling">
            <h4>Top Selling Products</h4>
            <div class="date-filters">
              <label
                >Start Date:
                <input type="date" v-model="productRange.startDate" />
              </label>
              <label
                >End Date:
                <input type="date" v-model="productRange.endDate" />
              </label>
            </div>
          </div>

          <div class="selling-table scroller-y">
            <table style="width: 100%">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody v-if="products.length">
                <tr v-for="(product, index) in products" :key="product._id">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <img
                      :src="product.image"
                      width="30px"
                      height="30px"
                      style="margin-right: 0.5rem"
                    />{{ product.design }}
                  </td>
                  <td>{{ product.price }}</td>
                  <td>{{ product.category.name }}</td>
                  <td>{{ product.totalQuantity }}</td>
                  <td>{{ product.totalAmount }}</td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="6" style="text-align: center; padding: 1rem">
                    Not Selling Product
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { formateDate } from "@/utils/helpers";
import axios from "axios";
import { onMounted, ref, watch } from "vue";

const reports = ref([]);
const revenues = ref([]);
const products = ref([]);

const showReportFilter = ref(false);
const showTopSellingFilter = ref(false);

const cardRange = ref({ startDate: formateDate(), endDate: formateDate() });
const productRange = ref({ startDate: formateDate(), endDate: formateDate() });

onMounted(() => {
  loadOrder();
  loadRevenue();
  loadProduct();
});
watch([cardRange.value, productRange.value], () => {
  loadOrder();
  loadRevenue();
  loadProduct();
});
const loadOrder = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}admin/report/Order`,
      {
        params: cardRange.value,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    console.log("report fetched:", res.data);
    reports.value = res.data || { totalAmount: 0, totalOrders: 0 };
  } catch (error) {
    console.error("Error loading report:", error);
  }
};
const loadRevenue = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}admin/report/TotalRevenue`,
      {
        params: cardRange.value,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    console.log("Revenue Data:", res.data);
    revenues.value = res.data || { totalRevenue: 0 };
  } catch (error) {
    console.error("Error loading Revenue:", error);
  }
};
const loadProduct = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}admin/report/Product`,
      {
        params: productRange.value,

        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    console.log("Product Data:", res.data);
    products.value = res.data || "Orders Not Found";
  } catch (error) {
    console.error("Error loading Product:", error);
  }
};
</script>
<style scoped>
.main {
  background-color: #e5e9ec;
  height: 100vh;
}
.title,
.title-selling {
  background-color: white;
  border-bottom: 1px solid #e1e6eb;
  position: static;
  top: 0;
}
.title-selling {
  display: flex;
  justify-content: space-between;
}
.title h4 {
  padding: 1rem;
  font-size: 16px;
  font-weight: 700;
  font-family: "inter";
}
.report {
  margin: 1rem;
}
.box {
  display: flex;
  justify-content: space-between;
}
.box-fltr {
  display: flex;
  justify-content: end;
  align-items: end;
  padding-right: 1rem;
}
.totalSale,
.totalOrder,
.totalRevenue {
  width: 33%;
  height: 130px;
  margin: 1rem;
  background-color: white;
}
.detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}
.topselling {
  margin: auto;
  width: 97%;
  height: calc(100vh - 300px);
  background-color: white;
  padding: 1rem;
  overflow: hidden;
}
.totalAmount h1,
.totalOrders h1 {
  padding-left: 2rem;
  letter-spacing: 5px;
}
.selling-table {
  padding: 1rem;
  height: calc(100vh - 370px);
}
.selling-table table tbody tr {
  border-bottom: 1px solid #e5e9ec;
}
.selling-table table tbody td {
  padding: 1rem 0rem;
}
.date-filters {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-bottom: 8px;
  margin-right: 1rem;
}
.date-filters label {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}
</style>

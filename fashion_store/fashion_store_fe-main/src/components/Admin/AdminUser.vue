<template>
  <div class="title"><h4>Users</h4></div>

  <div class="adminusers-main">
    <table style="width: 100%">
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <!-- <th>Action</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(userdata, index) in userdatas" :key="userdata._id">
          <td>{{ index + 1 }}</td>
          <td>{{ userdata.name }}</td>
          <td>{{ userdata.email }}</td>
          <td>{{ userdata.role }}</td>
          <!-- <td><button class="invoice">Invoice</button></td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const userdatas = ref([]);
onMounted(() => {
  Adduser();
});
const Adduser = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}admin/users`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    userdatas.value = res.data;
  } catch (error) {
    console.log("Error Fetching User", error);
  }
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
.invoice {
  background-color: lightblue;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.invoice:hover {
  background-color: blue;
}
</style>

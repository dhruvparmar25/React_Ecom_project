import { createRouter, createWebHistory } from "vue-router";
// Importing views for routing
import Product from "@/views/Product.vue";
import Home from "@/views/Home.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import Cart from "@/views/Cart.vue";
import Admin from "@/components/Admin/Admin.vue";
import AdminOrders from "@/components/Admin/AdminOrders.vue";
import AdminProducts from "@/components/Admin/AdminProducts.vue";
import AdminUser from "@/components/Admin/AdminUser.vue";
import OrdersDetail from "@/components/Admin/OrdersDetail.vue";
import Dashboard from "@/views/Dashboard.vue";
import Report from "@/components/Admin/Report.vue";
import Orders from "@/views/orders.vue";
import Login from "@/views/login.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")) {
        next({ name: "Home" }); // If already logged in, redirect to Home
      } else {
        next(); // Otherwise, continue to the login page
      }
    },
  },
  {
    path: "/product",
    name: "Product",
    component: Product, // Product page
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: ProductDetail, // Product detail page
    props: true, // Pass the ID as a prop
  },

  {
    path: "/cart",
    name: "cart",
    component: Cart, // Shopping cart page
  },

  {
    path: "/orders",
    name: "orders",
    component: Orders,
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    children: [
      {
        path: "products",
        name: "adminproducts",
        component: AdminProducts,
      },
      {
        path: "orders/:id",
        name: "ordersDetail",
        component: OrdersDetail,
      },
      {
        path: "report",
        name: "report",
        component: Report,
      },
      {
        path: "orders",
        name: "adminorders",
        component: AdminOrders,
      },
      {
        path: "users",
        name: "adminuser",
        component: AdminUser,
      },
      {
        path: "/admin",
        name: "dashboard",
        component: Dashboard,
      },
    ],
  },
];

// Create and configure the Vue Router
const router = createRouter({
  history: createWebHistory(), // Use HTML5 history mode
  routes, // Defined routes
});
router.afterEach(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
export default router; // Export the router instance for use in the app

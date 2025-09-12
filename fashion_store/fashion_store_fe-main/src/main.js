import App from "./App.vue";
import router from "./router/router";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import "./global.css";
import { createApp } from "vue";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();
app.use(Vue3Toastify, {
  autoClose: 3000,
  position: "top-right",
  theme: "dark",
});

app.config.devtools = false;
app.use(pinia);
app.use(router);
app.mount("#app");

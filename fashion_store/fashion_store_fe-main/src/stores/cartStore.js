import axios from "axios";
import { defineStore } from "pinia";

export const useCartstore = defineStore("cart", {
  state: () => ({
    cart: { items: [] },
  }),
  getters: {
    totalItems: (state) =>
      state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  },
  actions: {
    async loadCart() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}cart`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.cart = res.data;
      } catch (err) {
        console.log(err);
      }
    },
    async removeItem(id) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}cart/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        this.cart.items = this.cart.items.filter((i) => i.productId._id !== id);
      } catch (err) {
        console.log(err);
      }
    },
    async updateQuantity(productId, quantity) {
      try {
        const res = await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}cart/${productId}`,
          { quantity },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const updatedQty = res.data.quantity;
        const index = this.cart.items.findIndex(
          (i) => i.productId._id === productId
        );
        if (index !== -1) {
          this.cart.items[index].quantity = updatedQty;
        }
      } catch (err) {
        console.error("Error updating quantity:", err);
      }
    },
  },
});

import axios from "axios";
import router from "@/router/router";

export const getHeader = () => {
  const token = localStorage.getItem("token") || "";
  return { authorization: `Bearer ${token}` };
};

export const completeOrderPayment = async (order, onSuccessCallback) => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_TEST_KEY_ID,
    amount: ((order.order?.totalAmount || order?.amount) ?? 0) * 100,
    currency: "INR",
    order_id: order.razorpay_order_id,
    prefill: {
      name: order.address?.fullName,
      email: order.order?.email,
      contact: order.address?.phoneNumber,
    },
    theme: {
      color: "#F37254",
    },
    handler: async (res) => {
      try {
        await saveTransation(res?.razorpay_payment_id, order?.order?._id);
        if (typeof onSuccessCallback === "function") {
          await onSuccessCallback(); // ✅ refresh orders
        }
        router.push("/orders");
      } catch (err) {
        console.error("Error in payment handler:", err);
      }
    },
  };

  const razorpay = new Razorpay(options);
  razorpay.open();

  razorpay.on("payment.failed", (err) => {
    console.log("payment fail", err);
  });
};

export const saveTransation = async (paymentId, orderId) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}transaction/${orderId}`,
    { paymentId }
  );

  console.log("saveTransation", res.data);

  // /transaction/orderId
  // {paymentId}
};

export const updateImage = async (module, id, file) => {
  const formData = new FormData();
  formData.append("image", file);
  await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}upload/${module}/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export const formateDate = (date = null) => {
  const today = date ? new Date(date) : new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

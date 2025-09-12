import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";

const isLoggedIn = ref(!!localStorage.getItem("token"));

export function useAuth() {
  const router = useRouter();

  const login = (token) => {
    localStorage.setItem("token", token);
    isLoggedIn.value = true;
  };
  const logout = () => {
    localStorage.clear();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    isLoggedIn.value = false;
    router.push("/login");
  };

  watchEffect(() => {
    isLoggedIn.value = !!localStorage.getItem("token");
  });

  return { isLoggedIn, logout, login };
}

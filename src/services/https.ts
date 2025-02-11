import { useLoaderStore } from "@/stores/loaderStore";
import axios from "axios";
// import { useToastComposable } from "@/composables/useToastComposable";
// import type { ToastMessageOptions } from "primevue";

// const { showToast } = useToastComposable();

export const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

service.interceptors.request.use((config) => {
  const loaderStore = useLoaderStore();
  loaderStore.startLoading(); // Start loading when the request is sent

  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

service.interceptors.response.use(
  (response) => {
    const loaderStore = useLoaderStore();
    loaderStore.stopLoading();
    console.log("response", response?.data?.message);
    return response;
  },
  (error) => {
    const loaderStore = useLoaderStore();
    loaderStore.stopLoading();
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      location.reload();
    }
    return Promise.reject(error);
  }
);

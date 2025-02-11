
// baseURL: "https://nichestore.vercel.app/api/v2/",
import { useLoaderStore } from "@/stores/loaderStore";
import axios from "axios";
import { eventBus } from '@/utils/utils'
import type { ToastMessageOptions } from "primevue";

export const service = axios.create({
  baseURL: "https://nichestore.vercel.app/api/v2/",
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

    eventBus.emit("show-toast", {
      severity: "success",
      summary: "Success",
      detail: response?.data?.message,
      life: 3000,
    } as ToastMessageOptions);
    const loaderStore = useLoaderStore();
    loaderStore.stopLoading(); // Stop loading when response is received
    console.log("response", response?.data?.message)
    return response;
  },
  (error) => {
    const loaderStore = useLoaderStore();
    loaderStore.stopLoading(); // Stop loading on error

    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      location.reload();
    } else {
      eventBus.emit("show-toast", {
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.message,
        life: 3000,
      } as ToastMessageOptions);
    }
    console.log("error", error.response?.data?.message)
    return Promise.reject(error);
  }
);

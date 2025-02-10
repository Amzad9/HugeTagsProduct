import axios from "axios";

export const service = axios.create({
  baseURL: "https://nichestore.vercel.app/api/v2/",
  headers: {
    "Content-type": "application/json",
  }
});

service.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      location.reload();
    }
    return Promise.reject(error);
  }
);

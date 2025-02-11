import type { Category } from "@/types/api/category";
import type { Product } from "@/types/api/product";

import { service } from "./https";

export default {
  async login(credentials: { contact: string; password: string }) {
    return service.post("adminLogin", credentials);
  },
  async getCategories() {
    return service.get("category");
  },
  async getCategory(id: string) {
    return service.get(`category/${id}`);
  },
  async createCategory(data: FormData) {
    return service.post("category", data);
  },
  async updateCategory(id: string, data: FormData) {
    return service.patch(`category/${id}`, data);
  },
  async deleteCategory(id: string) {
    return service.delete(`category/${id}`);
  },
  async getSubCategories() {
    return service.get("subcategory");
  },
  async getSubCategory(id: string) {
    return service.get(`subcategory/${id}`);
  },
  async createSubCategory(data: FormData) {
    return service.post("subcategory", data);
  },
  async updateSubCategory(id: string, data: FormData) {
    return service.patch(`subcategory/${id}`, data);
  },
  async deleteSubCategory(id: string) {
    return service.delete(`subcategory/${id}`);
  },

  async createBrand(data: FormData) {
    return service.post("brand", data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  async deletBrand(id: string) {
    return service.delete(`brand/${id}`);
  },
  async updateBrand(id: string, data: FormData) {
    return service.patch(`brand/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  async getBrand() {
    return service.get("brand");
  },
  async getProducts() {
    return service.get("product");
  },
  async getProduct(id: string) {
    return service.get(`product/${id}`);
  },
  async createProduct(data: FormData) {
    return service.post("product", data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  async updateProduct(id: string, data: FormData) {
    return service.patch(`product/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  async deleteProduct(id: string) {
    return service.delete(`product/${id}`);
  },
  async getOrders() {
    return service.get("order");
  },
  async getOrder(id: string) {
    return service.get(`order/${id}`);
  },
  async createOrder(data: FormData) {
    return service.post("order", data);
  },
  async updateOrder(id: string, data: FormData) {
    return service.put(`order/${id}`, data);
  },
  async deleteOrder(id: string) {
    return service.delete(`order/${id}`);
  },
  async getSettings() {
    return service.get("setting");
  },
  async getSetting(id: string) {
    return service.get(`setting/${id}`);
  },
  async createSetting(data: FormData) {
    return service.post("setting", data);
  },
  async updateSetting(id: string, data: FormData) {
    return service.put(`setting/${id}`, data);
  },
  async deleteSetting(id: string) {
    return service.delete(`setting/${id}`);
  }
};

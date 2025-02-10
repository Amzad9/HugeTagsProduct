import type { Category, Product } from "@/types/api/category";
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
  async createCategory(data: Category) {
    return service.post("category", data);
  },
  async updateCategory(id: string, data: Category) {
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
  async createSubCategory(data: Category) {
    return service.post("subcategory", data);
  },
  async updateSubCategory(id: string, data: Category) {
    return service.patch(`subcategory/${id}`, data);
  },
  async deleteSubCategory(id: string) {
    return service.delete(`subcategory/${id}`);
  },

  async createBrand(data: any) {
    return service.post("brand", data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  async deletBrand(id: string) {
    return service.delete(`brand/${id}`);
  },
  async updateBrand(id: string, data: Category) {
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
  async createProduct(data: Product) {
    return service.post("product", data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  async updateProduct(id: string, data: Product) {
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
  async createOrder(data: any) {
    return service.post("order", data);
  },
  async updateOrder(id: string, data: any) {
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
  async createSetting(data: any) {
    return service.post("setting", data);
  },
  async updateSetting(id: string, data: any) {
    return service.put(`setting/${id}`, data);
  },
  async deleteSetting(id: string) {
    return service.delete(`setting/${id}`);
  }
};

import type { AxiosResponse } from "axios";
import type { Category, CategoryResponse } from "@/types/api/category";
import type { Product, ProductResponse } from "@/types/api/product";
import type { BrandResponse } from "@/types/api/brand";
import type { SubCategory, SubCategoryResponse, SingleSubCategoryResponse } from "@/types/api/subcategory";
import { service } from "./https";

export default {
  async login(credentials: { contact: string; password: string }): Promise<AxiosResponse> {
    return service.post("adminLogin", credentials);
  },
  async getCategories(): Promise<AxiosResponse<CategoryResponse>> {
    return service.get("category");
  },
  async getCategory(id: string): Promise<AxiosResponse<Category>> {
    return service.get(`category/${id}`);
  },
  async createCategory(data: FormData): Promise<AxiosResponse> {
    return service.post("category", data);
  },
  async updateCategory(id: string, data: FormData): Promise<AxiosResponse> {
    return service.patch(`category/${id}`, data);
  },
  async deleteCategory(id: string): Promise<AxiosResponse> {
    return service.delete(`category/${id}`);
  },
  async getSubCategories(): Promise<AxiosResponse> {
    return service.get("subcategory");
  },
  async getSubCategory(id: string): Promise<AxiosResponse<SubCategoryResponse>> {
    return service.get(`subcategory/${id}`);
  },

  async createSubCategory(data: FormData): Promise<AxiosResponse<SingleSubCategoryResponse>> {
    return service.post("subcategory", data);
  },

  async updateSubCategory(id: string, data: FormData): Promise<AxiosResponse<SingleSubCategoryResponse>> {
    return service.patch(`subcategory/${id}`, data);
  },
  async deleteSubCategory(id: string): Promise<SingleSubCategoryResponse> {
    return service.delete(`subcategory/${id}`);
  },

  async createBrand(data: FormData): Promise<AxiosResponse<BrandResponse>> {
    return service.post("brand", data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  async deletBrand(id: string): Promise<AxiosResponse> {
    return service.delete(`brand/${id}`);
  },
  async updateBrand(id: string, data: FormData): Promise<AxiosResponse<BrandResponse>> {
    return service.patch(`brand/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  async getBrand(): Promise<AxiosResponse<BrandResponse>> {
    return service.get("brand");
  },
  async getProducts(): Promise<AxiosResponse<ProductResponse>> {
    return service.get("product");
  },
  async getProduct(id: string): Promise<AxiosResponse<Product>> {
    return service.get(`product/${id}`);
  },
  async createProduct(data: FormData): Promise<AxiosResponse> {
    return service.post("product", data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  async updateProduct(id: string, data: FormData): Promise<AxiosResponse> {
    return service.patch(`product/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  async deleteProduct(id: string): Promise<AxiosResponse> {
    return service.delete(`product/${id}`);
  },
  async getOrders(): Promise<AxiosResponse> {
    return service.get("order");
  },
  async getOrder(id: string): Promise<AxiosResponse> {
    return service.get(`order/${id}`);
  },
  async createOrder(data: FormData): Promise<AxiosResponse> {
    return service.post("order", data);
  },
  async updateOrder(id: string, data: FormData): Promise<AxiosResponse> {
    return service.put(`order/${id}`, data);
  },
  async deleteOrder(id: string): Promise<AxiosResponse> {
    return service.delete(`order/${id}`);
  },
  async getSettings(): Promise<AxiosResponse> {
    return service.get("setting");
  },
  async getSetting(id: string): Promise<AxiosResponse> {
    return service.get(`setting/${id}`);
  },
  async createSetting(data: FormData): Promise<AxiosResponse> {
    return service.post("setting", data);
  },
  async updateSetting(id: string, data: FormData): Promise<AxiosResponse> {
    return service.put(`setting/${id}`, data);
  },
  async deleteSetting(id: string): Promise<AxiosResponse> {
    return service.delete(`setting/${id}`);
  }
};

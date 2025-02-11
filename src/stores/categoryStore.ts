import { onMounted, reactive, ref, watchEffect } from 'vue';
import api from '@/services/api'
import { defineStore, acceptHMRUpdate } from 'pinia'
import type { Category } from '@/types/api/category'
import { useLoaderStore } from './loaderStore';

interface ValidationErrors {
  name: string;
  description: string;
  image: string;
  [key: string]: string;
}
export const useCategoryStore = defineStore("category", () => {
  const category = reactive<Category>({
    name: "",
    description: "",
    image: "" as File | string,
  })
  const getCategoryData = ref<Category[]>([])
  const errors = reactive<ValidationErrors>({
    name: "",
    description: "",
    image: "",
  })
  const formValidation = () => {
    let isValid = true;
    errors.name = category.name ? "" : "Name is required";
    errors.description = category.description ? "" : "Description is required";
    // errors.image = category.image ? "" : "Image is required";

    if (!category.name || !category.description) {
      isValid = false;
    }

    return isValid;
  }

  const formReset = () => {
    category.name = "";
    category.description = "";
    Object.keys(errors).forEach(key => {
      errors[key as keyof ValidationErrors] = "";
    });
  }


  const getCategory = async () => {
    try {
      const response = await api.getCategories();
      getCategoryData.value = response.data.payload;
      console.log(getCategoryData.value)
    } catch (error) {
      throw error;
    }
  }


  const deleteCategory = async (id: string) => {
    try {
      const response = await api.deleteCategory(id);
      getCategory();
      console.log(response);
    } catch (error) {
      throw error;
    }
  }
  onMounted(() => {
    getCategory()
  })
  return {
    category,
    errors,
    formValidation,
    formReset,
    getCategory,
    getCategoryData,
    deleteCategory
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCategoryStore, import.meta.hot))
}


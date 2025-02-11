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
export const useSubCategoryStore = defineStore("subcategory", () => {
  const subcategory = reactive<Category>({
    _id: '',
    name: "",
    description: "",
    image: "" as File | string,
  })
  const getSubCategoryData = ref<Category[]>([])
  const errors = reactive<ValidationErrors>({
    name: "",
    description: "",
    image: "",
  })
  const loaderStore = useLoaderStore();
  const { startLoading, stopLoading } = loaderStore;
  const formValidation = () => {
    let isValid = true;
    errors.name = subcategory.name ? "" : "Name is required";
    errors.description = subcategory.description ? "" : "Description is required";

    if (!subcategory.name || !subcategory.description) {
      isValid = false;
    }

    return isValid;
  }
  watchEffect(() => { formValidation() })

  const formReset = () => {
    subcategory.name = "";
    subcategory.description = "";
    subcategory.image = "" as File | string;
    Object.keys(errors).forEach(key => {
      errors[key as keyof ValidationErrors] = "";
    });
  }
  const onImageUpload = (e: Event) => {
    const target = e.target as HTMLInputElement | null;
    if (!target || !target.files) {
      console.log("No file selected");
      return;
    }
    const file = target.files[0];
    console.log("file", file);
    if (!file) return;
    subcategory.image = file;
  }

  const getSubCategory = async () => {
    try {
      const response = await api.getSubCategories();
      console.log("response", response);
      getSubCategoryData.value = response.data.payload;
      console.log(getSubCategoryData.value)
    } catch (error) {
      throw error;
    }
  }


  const deleteCategory = async (id: string) => {
    try {
      const response = await api.deleteSubCategory(id);
      getSubCategory();
      console.log(response);
    } catch (error) {
      throw error;
    }
  }
  onMounted(() => {
    getSubCategory()
  })
  return {
    subcategory,
    errors,
    onImageUpload,
    formValidation,
    formReset,
    getSubCategory,
    getSubCategoryData,
    deleteCategory
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSubCategoryStore, import.meta.hot))
}


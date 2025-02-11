import { onMounted, reactive, ref, watchEffect } from 'vue';
import api from '@/services/api'
import { defineStore, acceptHMRUpdate } from 'pinia'
import type { Brand } from '@/types/api/brand'
import { useLoaderStore } from './loaderStore';

interface ValidationErrors {
  name: string;
  description: string;
  image: string;
  [key: string]: string;
}
export const useBrandStore = defineStore("brand", () => {
  const brand = reactive<Brand>({
    name: "",
    description: "",
    image: "" as File | string,
  })
  const brandInfo = ref<Brand[]>([])
  const errors = reactive<ValidationErrors>({
    name: "",
    description: "",
    image: "",
  })
  const loaderStore = useLoaderStore();
  const { startLoading, stopLoading } = loaderStore;
  const formValidation = () => {
    let isValid = true;
    errors.name = brand.name ? "" : "Name is required";
    errors.description = brand.description ? "" : "Description is required";
    errors.image = brand.image ? "" : "Image is required";

    if (!brand.name || !brand.description || !brand.image) {
      isValid = false;
    }

    return isValid;
  }
  watchEffect(() => { formValidation() })

  const formReset = () => {
    brand.name = "";
    brand.description = "";
    brand.image = "" as File | string;
    Object.keys(errors).forEach(key => {
      errors[key as keyof ValidationErrors] = "";
    });
  }

  const fetchBrands = async () => {
    try {
      startLoading()
      const response = await api.getBrand();
      brandInfo.value = response.data.payload;
      console.log(brandInfo.value)
    } catch (error) {
      throw error;
    } finally {
      stopLoading()
    }
  }


  const deleteBrand = async (id: string) => {
    try {
      const response = await api.deletBrand(id);
      fetchBrands();
      console.log(response);
    } catch (error) {
      throw error;
    }
  }
  onMounted(() => {
    fetchBrands()
  })
  return {
    brand,
    errors,
    formValidation,
    formReset,
    fetchBrands,
    brandInfo,
    deleteBrand
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBrandStore, import.meta.hot))
}


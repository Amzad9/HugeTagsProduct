import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref, reactive, watch, onMounted } from 'vue';
import api from '@/services/api';
import type { Product } from '@/types/api/product';
import { useLoaderStore } from './loaderStore';

interface ValidationErrors {
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
  subcategory: string;
  brandId: string;
  stock: string | number;
  rating: string | number;
}

export const useProductStore = defineStore('product', () => {
  const product = reactive<Product>({
    _id: '',
    title: '',
    description: '',
    price: '',
    image: '' as File | string,
    category: '',
    subcategory: '',
    brandId: '',
    stock: 0,
    rating: 0,
    reviews: [],
  });

  const productInfo = ref<Product[]>([]);
  const errors = reactive<ValidationErrors>({
    title: '',
    description: '',
    price: '',
    image: '',
    category: '',
    subcategory: '',
    brandId: '',
    stock: 0,
    rating: 0,
  });

  const loaderStore = useLoaderStore();
  const { startLoading, stopLoading } = loaderStore;

  const formValidation = () => {
    let isValid = true;
    errors.title = product.title ? '' : 'Title is required';
    errors.description = product.description ? '' : 'Description is required';
    errors.price = product.price ? '' : 'Price is required';
    errors.image = product.image ? '' : 'Image is required';
    errors.category = product.category ? '' : 'Category is required';
    errors.subcategory = product.subcategory ? '' : 'Subcategory is required';
    errors.brandId = product.brandId ? '' : 'brand is required';

    errors.stock = product.stock ? '' : 'Stock is required';
    errors.rating = product.rating ? '' : 'Rating is required';

    if (!product.title || !product.description || !product.price || !product.image || !product.category || !product.subcategory || !product.stock || !product.rating || !product.brandId) {
      isValid = false;
    }
    return isValid;
  };

  watch(
    () => [product.title, product.description, product.price],
    () => {
      formValidation();
    }
  );

  const formReset = () => {
    product.title = '';
    product.description = '';
    product.price = '';
    product.image = '' as File | string;
    product.category = '';
    product.subcategory = '';
    product.brandId = '';
    product.stock = 0;
    product.rating = 0;
    product.reviews = [];
    Object.keys(errors).forEach((key) => {
      errors[key as keyof ValidationErrors] = '';
    });
  };

  const onImageUpload = (e: Event) => {
    const target = e.target as HTMLInputElement | null;
    if (!target || !target.files) return;
    const file = target.files[0];
    if (!file) return;
    product.image = file;
  };

  const fetchProducts = async () => {
    try {
      const response = await api.getProducts();
      productInfo.value = response.data.payload;
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await api.deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
    }
  };

  onMounted(() => {
    fetchProducts();
  });

  return {
    product,
    errors,
    productInfo,
    onImageUpload,
    formValidation,
    formReset,
    fetchProducts,
    deleteProduct,
  };
});


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}

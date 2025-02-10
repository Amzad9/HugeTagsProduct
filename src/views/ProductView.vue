<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import Button from "primevue/button";
import Drawer from "@/components/Drawer.vue";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import type { Product } from "@/types/api/category";
import { useToggle } from '@/composables/Toggle';
import { useCategoryStore } from '@/stores/categoryStore';
import { useLoaderStore } from '@/stores/loaderStore';
import { useProductStore } from '@/stores/productStore';
import { useSubCategoryStore } from "@/stores/subCategoryStore";
import { useBrandStore } from '@/stores/brandStore';
import api from '@/services/api';
import { storeToRefs } from 'pinia';
import Loader from '@/components/Loader.vue';

const { isToggle, toggle } = useToggle();
const categoryStore = useCategoryStore();
const productStore = useProductStore();
const loaderStore = useLoaderStore();
const brandStore = useBrandStore();
const subCategoryStore = useSubCategoryStore();
const { isLoading } = storeToRefs(loaderStore);
const { brandInfo } = storeToRefs(brandStore);
const { productInfo, product, errors } = storeToRefs(productStore);
const { category, getCategoryData } = storeToRefs(categoryStore);
const { getSubCategoryData } = storeToRefs(subCategoryStore);
const updatedProductId = ref<string>();

const onImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    product.value.image = target.files[0];
  }
};

const formValidation = () => {
  const requiredFields: (keyof typeof product.value)[] = ['title', 'description', 'price', 'category', 'subcategory', 'brandId', 'stock', 'rating'];
  let isValid = true;
  requiredFields.forEach(field => {
    if (!product.value[field] || product.value[field] === '') {
      errors.value[field] = 'This field is required';
      isValid = false;
    } else {
      errors.value[field] = '';
    }
  });
  return isValid;
};

const onSubmitForm = async () => {
  if (!formValidation()) {
    console.error("Form validation failed");
    return;
  }
  try {
    loaderStore.startLoading();
    const formData = new FormData();
    formData.append('title', product.value.title);
    formData.append('description', product.value.description);
    formData.append('price', String(product.value.price));

    if (product.value.image instanceof File) {
      formData.append('image', product.value.image);
    }

    formData.append('category', typeof product.value.category === 'object' && '_id' in product.value.category ? product.value.category._id || '' : '');
    formData.append('subcategory', typeof product.value.subcategory === 'object' && '_id' in product.value.subcategory ? product.value.subcategory._id || '' : '');
    formData.append('brand', typeof product.value.brandId === 'object' && '_id' in product.value.brandId ? product.value.brandId._id || '' : '');
    formData.append('stock', String(product.value.stock));
    formData.append('rating', String(product.value.rating));

    if (updatedProductId.value) {
      await api.updateProduct(updatedProductId.value, formData);
    } else {
      await api.createProduct(formData);
    }
    productStore.fetchProducts();
    productStore.formReset();
    isToggle.value = false;
  } catch (error) {
    console.error(error);
  } finally {
    loaderStore.stopLoading();
  }
};

const editCategory = (data: Product) => {
  updatedProductId.value = data._id as string;
  product.value = { ...data };
  isToggle.value = true;
};

</script>
<template>
<Loader :loader="isLoading" />
<Button label="Add Category"
  icon="pi pi-plus"
  severity="primary"
  @click="toggle" />

<Drawer v-model:visible="isToggle"
  :modal="true"
  :closable="true">
  <template #header>
    <h3 class="m-0">Add New Category</h3>
  </template>
  <template #content>
    <form @submit.prevent="onSubmitForm"
      class="p-4">
      <div class="field mb-4">
        <label for="category"
          class="block font-bold mb-2">Category*</label>
        <Dropdown id="category"
          v-model="product.category"
          :options="getCategoryData"
          optionLabel="name"
          placeholder="Select a category"
          class="w-full" />
        <small class="p-error block">{{
          errors.category }}</small>
      </div>

      <div class="field mb-4">
        <label for="subcategory"
          class="block font-bold mb-2">Subcategory*</label>
        <Dropdown id="subcategory"
          v-model="product.subcategory"
          :options="getSubCategoryData"
          optionLabel="name"
          placeholder="Select a subcategory"
          class="w-full" />
        <small class="p-error block">{{
          errors.subcategory }}</small>
      </div>
      <div class="field mb-4">
        <label for="brand"
          class="block font-bold mb-2">Brand*</label>
        <Dropdown id="brand"
          v-model="product.brandId"
          :options="brandInfo"
          optionLabel="name"
          placeholder="Select a subcategory"
          class="w-full" />
        <small class="p-error block">{{
          errors.brandId }}</small>
      </div>
      <div class="field mb-4">
        <label for="name"
          class="block font-bold mb-2">Name*</label>
        <InputText id="title"
          v-model="product.title"
          class="w-full"
          placeholder="Enter category name" />
        <small class="p-error block">{{
          errors.title }}</small>
      </div>

      <div class="field mb-4">
        <label for="description"
          class="block font-bold mb-2">Description*</label>
        <Textarea id="description"
          v-model="product.description"
          class="w-full"
          rows="3"
          placeholder="Enter category description" />
        <small class="p-error block">{{
          errors.description }}</small>
      </div>

      <div class="field mb-4">
        <label for="price"
          class="block font-bold mb-2">Price*</label>
        <InputText id="price"
          v-model="product.price"
          class="w-full"
          placeholder="Enter price" />
        <small class="p-error block">{{
          errors.price }}</small>
      </div>
      <div class="field mb-4">
        <label for="price"
          class="block font-bold mb-2">stock*</label>
        <InputText id="stock"
          v-model:number="product.stock"
          class="w-full"
          placeholder="Enter stock" />
        <small class="p-error block">{{
          errors.stock }}</small>
      </div>

      <div class="field mb-4">
        <label for="price"
          class="block font-bold mb-2">rating*</label>
        <InputText id="rating"
          v-model:number="product.rating"
          class="w-full"
          placeholder="Enter rating" />

        <small class="p-error block">{{
          errors.rating }}</small>
      </div>

      <div class="field mb-4">
        <label class="block font-bold mb-2">Image
          Upload*</label>
        <input type="file"
          name="image"
          className="file-input file-input-bordered w-full max-w-xs ps-0"
          @change="onImageUpload" />
        <small class="p-error block">{{
          errors.image }}</small>
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <Button label="Cancel"
          severity="secondary"
          @click="isToggle = false" />
        <Button type="submit"
          :label="updatedProductId ? 'Update' : 'Submit'"
          severity="primary" />
      </div>
    </form>
  </template>
</Drawer>
<DataTable :value="productInfo"
  paginator
  :rows="6"
  :rowsPerPageOptions="[5, 10, 20, 50]"
  tableStyle="min-width: 50rem">
  <Column field="image"
    header="Image">
    <template #body="{ data }">
      <img :src="data.image"
        alt="category image"
        class="w-8" />
    </template>
  </Column>
  <Column field="title"
    header="Title"></Column>
  <Column field="description"
    header="Description"></Column>
  <Column field="price"
    header="Price"></Column>
  <Column field="category"
    header="Category">
    <template #body="{
      data
    }">
      <span> {{ data.category?.name }}</span>
    </template>
  </Column>
  <Column field="subcategory"
    header="Subcategory">
    <template #body="{
      data
    }">
      <span>{{ data.subcategory?.name }}</span>
    </template>
  </Column>
  <Column field="stock"
    header="Stock"></Column>
  <Column field="rating"
    header="Rating"></Column>
  <Column header="Action">
    <template #body="{ data }">
      <div class="card flex justify-center gap-2">
        <Button type="button"
          icon="pi pi-pencil"
          @click="editCategory(data)" />
        <Button type="button"
          icon="pi pi-trash"
          @click="productStore.deleteProduct(data._id)" />
      </div>
    </template>
  </Column>
</DataTable>
</template>

<style scoped>
.p-invalid {
  border-color: var(--red-500);
}

.field {
  margin-bottom: 1.5rem;
}

.p-error {
  color: var(--red-500);
  font-size: 0.875rem;
}
</style>

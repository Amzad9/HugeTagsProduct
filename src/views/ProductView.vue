<script setup lang="ts">
import { ref } from 'vue';
import Button from "primevue/button";
import Drawer from "@/components/Drawer.vue";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import type { ToastMessageOptions } from "primevue";

import type { Product } from "@/types/api/product";
import { useToggle } from '@/composables/Toggle';
import { useCategoryStore } from '@/stores/categoryStore';
import { useProductStore } from '@/stores/productStore';
import { useSubCategoryStore } from "@/stores/subCategoryStore";
import { useBrandStore } from '@/stores/brandStore';
import { useToastComposable } from "@/composables/useToastComposable";

import api from '@/services/api';
import { storeToRefs } from 'pinia';

const { isToggle, toggle } = useToggle();
const categoryStore = useCategoryStore();
const productStore = useProductStore();
const brandStore = useBrandStore();
const subCategoryStore = useSubCategoryStore();
const { brandInfo } = storeToRefs(brandStore);
const { productInfo, product, errors } = storeToRefs(productStore);
const { getCategoryData } = storeToRefs(categoryStore);
const { getSubCategoryData } = storeToRefs(subCategoryStore);
const updatedProductId = ref<string>();
const { showToast } = useToastComposable();

const onImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    product.value.image = target.files[0];
  }
};


const onSubmitForm = async () => {
  // if (!formValidation()) {
  //   console.error("Form validation failed");
  //   return;
  // }
  try {
    const formData = new FormData();

    formData.append('title', product.value.title ?? '');
    formData.append('description', product.value.description ?? '');
    formData.append('price', product.value.price ?? '');
    formData.append('stock', String(product.value.stock ?? ''));
    formData.append('rating', String(product.value.rating ?? ''));


    if (product.value.image instanceof File) {
      formData.append('image', product.value.image);
    }

    formData.append('category', typeof product.value.category === 'object' ? product.value.category._id ?? '' : product.value.category ?? '');
    formData.append('subcategory', typeof product.value.subcategory === 'object' ? product.value.subcategory._id ?? '' : product.value.subcategory ?? '');
    formData.append('brand', typeof product.value.brandId === 'object' ? product.value.brandId._id ?? '' : product.value.brandId ?? '');

    if (updatedProductId.value) {
      const res = await api.updateProduct(updatedProductId.value, formData);
      showToast({
        severity: "success",
        summary: "Success",
        detail: res?.data?.message,
        life: 3000,
      } as ToastMessageOptions);
      productStore.formReset();
      isToggle.value = false;
    } else {
      const response = await api.createProduct(formData);
      if (response.status === 201) {
        showToast({
          severity: "success",
          summary: "Success",
          detail: response?.data?.message,
          life: 3000,
        } as ToastMessageOptions);
        productStore.fetchProducts();
        productStore.formReset();
        isToggle.value = false;
      }
    }
  } catch (error) {
    showToast({
      severity: "error",
      summary: "Error",
      detail: error.response?.data?.message,
      life: 3000,
    } as ToastMessageOptions);
  }
};


const editCategory = (data: Product) => {
  updatedProductId.value = data._id as string;
  product.value = { ...data };
  isToggle.value = true;
};

</script>
<template><Button label="Add Category"
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
        <InputNumber id="stock"
          v-model="product.stock"
          class="w-full"
          placeholder="Enter stock" />
        <small class="p-error block">{{
          errors.stock }}</small>
      </div>

      <div class="field mb-4">
        <label for="price"
          class="block font-bold mb-2">rating*</label>
        <InputNumber id="rating"
          v-model="product.rating"
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

<style scoped></style>

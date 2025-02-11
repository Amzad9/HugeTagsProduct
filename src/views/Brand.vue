<script setup lang="ts">
import { ref } from 'vue';
import Button from "primevue/button";
import Drawer from "@/components/Drawer.vue";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import type { ToastMessageOptions } from "primevue";
import { useToastComposable } from "@/composables/useToastComposable";

import type { Brand } from "@/types/api/brand";
import { useToggle } from '@/composables/Toggle';
import { useBrandStore } from '@/stores/brandStore';
import { useLoaderStore } from '@/stores/loaderStore';
import api from '@/services/api';
import { storeToRefs } from 'pinia';

const { isToggle, toggle } = useToggle();
const brandStore = useBrandStore();
const loaderStore = useLoaderStore();
const { brand, errors, brandInfo } = storeToRefs(brandStore);
const { showToast } = useToastComposable();

const onImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    brand.value.image = target.files[0];
  }
};

const getBrandId = ref<string>()

const onSubmitForm = async () => {
  // if (!formValidation()) {
  //   console.error("Form validation failed");
  //   return;
  // }
  try {
    loaderStore.startLoading();
    const formData = new FormData();
    formData.append('name', brand.value.name as string);
    if (brand.value.image instanceof File) {
      console.log("brand.value.image as File", brand.value.image as File)
      formData.append('image', brand.value.image as File);
    }
    formData.append('description', brand.value.description as string)
    if (getBrandId.value) {
      const res = await api.updateBrand(getBrandId.value, formData);
      if (res && res.data) {
        showToast({
          severity: "success",
          summary: "Success",
          detail: res.data.message,
          life: 3000,
        } as ToastMessageOptions);
      }
      brandStore.formReset();
      isToggle.value = false;
    } else {
      const response = await api.createBrand(formData);
      if (response.status === 201) {
        showToast({
          severity: "success",
          summary: "Success",
          detail: response?.data?.message,
          life: 3000,
        } as ToastMessageOptions);
        brandStore.fetchBrands();
        brandStore.formReset();
        isToggle.value = false;
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      showToast({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.message,
        life: 3000,
      } as ToastMessageOptions);
    }
  }
};

const deleteBrand = async (id: string) => {
  try {
    const res = await brandStore.deleteBrand(id);
    showToast({
      severity: "success",
      summary: "Success",
      detail: res?.data?.message,
      life: 3000,
    } as ToastMessageOptions);
  } catch (error) {
    showToast({
      severity: "error",
      summary: "Error",
      detail: error.response?.data?.message,
      life: 3000,
    } as ToastMessageOptions);
  }
};

const editBrand = (data: Brand) => {
  console.log("brandData", data)
  getBrandId.value = data._id as string
  brand.value = { ...data };
  isToggle.value = true;
};


</script>

<template><!-- <Loader :loader="isLoading" /> -->
<Button label="Add Brand"
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
        <label for="name"
          class="block font-bold mb-2">Name*</label>
        <InputText id="name"
          v-model="brand.name"
          class="w-full"
          placeholder="Enter category name" />
        <small class="p-error block">{{
          errors.name }}</small>
      </div>

      <div class="field mb-4">
        <label for="description"
          class="block font-bold mb-2">Description*</label>
        <Textarea id="description"
          v-model="brand.description"
          class="w-full"
          rows="3"
          placeholder="Enter category description" />
        <small class="p-error block">{{
          errors.description }}</small>
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
          :label="getBrandId ? 'Update' : 'Submit'"
          severity="primary" />
      </div>
    </form>
  </template>
</Drawer>

<DataTable :value="brandInfo"
  paginator
  :rows="6"
  :rowsPerPageOptions="[5, 10, 20, 50]"
  tableStyle="min-width: 50rem">
  <Column field="image"
    header="Image">
    <template #body="{ data }">
      <img :src="data.image"
        alt="brand image"
        class="w-8" />
    </template>
  </Column>
  <Column field="name"
    header="Name"></Column>
  <Column field="description"
    header="Description"></Column>
  <Column header="Action">
    <template #body="{ data }">
      <div class="card flex justify-center gap-2">
        <Button type="button"
          icon="pi pi-pencil"
          @click="editBrand(data)" />
        <Button type="button"
          icon="pi pi-trash"
          @click="deleteBrand(data._id)" />
      </div>
    </template>
  </Column>
</DataTable>
</template>

<style scoped></style>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue';
// import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import Drawer from "@/components/Drawer.vue";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import Select from 'primevue/select';

import type { Category } from "@/types/api/category";
import { useToggle } from '@/composables/Toggle';
import { useSubCategoryStore } from '@/stores/subCategoryStore';
// import { useLoaderStore } from '@/stores/loaderStore';
import { useCategoryStore } from '@/stores/categoryStore';

import { storeToRefs } from 'pinia';
// import Loader from '@/components/Loader.vue';
import api from '@/services/api';
import { useToastComposable } from "@/composables/useToastComposable";

const { isToggle, toggle } = useToggle();
const subCategoryStore = useSubCategoryStore();
// const loaderStore = useLoaderStore();
// const { isLoading } = storeToRefs(loaderStore);
const { subcategory, errors, getSubCategoryData } = storeToRefs(subCategoryStore);
const categoryStore = useCategoryStore();
const { getCategoryData } = storeToRefs(categoryStore);
const getUpdatedCategoryId = ref<string>()
const selectedCategoryId = ref();
const { showToast } = useToastComposable();

watch(selectedCategoryId, (newValue) => {
  if (newValue) {
    selectedCategoryId.value = newValue as string;
    console.log("newValue", newValue)
  } else {
    selectedCategoryId.value = "";
    console.warn("No category selected or newValue is undefined");
  }
});


const onSubmitForm = async () => {
  // if (!subCategoryStore.formValidation()) {
  //   console.error("Form validation failed");
  //   return;
  // }
  try {
    const formData = new FormData();
    formData.append("categoryId", selectedCategoryId.value as string);
    formData.append("name", subcategory.value.name as string);
    formData.append("description", subcategory.value.description as string);

    if (subcategory.value.image instanceof File) {
      formData.append("image", subcategory.value.image);
    }
    console.log("getUpdatedCategoryId", getUpdatedCategoryId.value)
    if (getUpdatedCategoryId.value) {
      const res = await api.updateSubCategory(getUpdatedCategoryId.value, formData)
      showToast({
        severity: "success",
        summary: "Success",
        detail: res?.data?.message,
        life: 3000,
      } as ToastMessageOptions);
      isToggle.value = false;
      subCategoryStore.formReset();
    } else {
      const response = await api.createSubCategory(formData);
      if (response.status === 201) {
        showToast({
          severity: "success",
          summary: "Success",
          detail: response?.data?.message,
          life: 3000,
        } as ToastMessageOptions);
        subCategoryStore.getSubCategory();
        subCategoryStore.formReset();
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
}
const deleteSubCategory = async (id: string) => {
  try {
    const res = await subCategoryStore.deleteCategory(id);
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

const editSubCategory = (categoryData: Category) => {
  console.log("categoryData", categoryData)
  getUpdatedCategoryId.value = categoryData._id as string
  subcategory.value = { ...categoryData };
  isToggle.value = true;
};


</script>

<template><Button label="Add Sub Sub Category"
  icon="pi pi-plus"
  severity="primary"
  @click="toggle" />

<Drawer v-model:visible="isToggle"
  :modal="true"
  :closable="true">
  <template #header>
    <h3 class="m-0">Add New Sub Category</h3>
  </template>

  <template #content>
    <form @submit.prevent="onSubmitForm()"
      class="p-4">
      <div class="field mb-4">
        <Select v-model="selectedCategoryId"
          :options="getCategoryData"
          optionLabel="name"
          optionValue="_id"
          placeholder="Select a category"
          class="w-full md:w-56" />
      </div>
      <div class="field mb-4">
        <label for="name"
          class="block font-bold mb-2">Name*</label>
        <InputText id="name"
          v-model="subcategory.name"
          class="w-full"
          placeholder="Enter category name" />
        <small class="p-error block">{{
          errors.name }}</small>
      </div>

      <div class="field mb-4">
        <label for="description"
          class="block font-bold mb-2">Description*</label>
        <Textarea id="description"
          v-model="subcategory.description"
          class="w-full"
          rows="3"
          placeholder="Enter category description" />
        <small class="p-error block">{{
          errors.description }}</small>
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <Button label="Cancel"
          severity="secondary"
          @click="isToggle = false" />
        <Button type="submit"
          :label="getUpdatedCategoryId ? 'Update' : 'Submit'"
          severity="primary" />
      </div>
    </form>
  </template>
</Drawer>
<!-- <Loader :loader="isLoading" /> -->
<DataTable :value="getSubCategoryData"
  paginator
  :rows="6"
  :rowsPerPageOptions="[5, 10, 20, 50]"
  tableStyle="min-width: 50rem">
  <Column field="name"
    header="Name"></Column>
  <Column field="description"
    header="Description"></Column>
  <Column header="Action">
    <template #body="{ data }">
      <div class="card flex justify-center gap-2">
        <Button type="button"
          icon="pi pi-pencil"
          @click="editSubCategory(data)" />
        <Button type="button"
          icon="pi pi-trash"
          @click="deleteSubCategory(data._id)" />
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

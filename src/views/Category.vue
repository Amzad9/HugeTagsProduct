<script setup lang="ts">
import { ref } from 'vue';
import { AxiosError } from 'axios';

import Button from "primevue/button";
import Drawer from "@/components/Drawer.vue";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import type { Category } from "@/types/api/category";
import { useToggle } from '@/composables/Toggle';
import { useCategoryStore } from '@/stores/categoryStore';
import type { ToastMessageOptions } from "primevue";
import { useToastComposable } from "@/composables/useToastComposable";

import api from '@/services/api';
import { storeToRefs } from 'pinia';

const { isToggle, toggle } = useToggle();
const categoryStore = useCategoryStore();

const { category, errors, getCategoryData } = storeToRefs(categoryStore);

const getUpdatedCategoryId = ref<string>()
const { showToast } = useToastComposable();

const onSubmitForm = async () => {
  const formData = new FormData();
  formData.append('name', category.value.name as string);
  formData.append('description', category.value.description as string);

  // if (!categoryStore.formValidation()) {
  //   console.error("Form validation failed");
  //   return;
  // }
  try {
    if (getUpdatedCategoryId.value) {
      const res = await api.updateCategory(getUpdatedCategoryId.value, formData);
      showToast({
        severity: "success",
        summary: "Success",
        detail: res?.data?.message,
        life: 3000,
      } as ToastMessageOptions);
      categoryStore.formReset();
      isToggle.value = false;
    } else {
      const response = await api.createCategory(formData);
      if (response.status === 201) {
        showToast({
          severity: "success",
          summary: "Success",
          detail: response.data.message,
          life: 3000,
        } as ToastMessageOptions);
        categoryStore.getCategory();
        categoryStore.formReset();
        console.log(response);
        isToggle.value = false;
      }
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      showToast({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.message,
        life: 3000,
      } as ToastMessageOptions);
    }
  }
};

const deleteCategory = async (id: string) => {
  try {
    const res = await categoryStore.deleteCategory(id);
    showToast({
      severity: "success",
      summary: "Success",
      detail: res.data.message,
      life: 3000,
    } as ToastMessageOptions);

  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      showToast({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.message,
        life: 3000,
      } as ToastMessageOptions);
    }
  }
};

const editCategory = (data: Category) => {
  console.log("categoryData", data)
  getUpdatedCategoryId.value = data._id as string
  category.value = { ...data };
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
        <label for="name"
          class="block font-bold mb-2">Name*</label>
        <InputText id="name"
          v-model="category.name"
          class="w-full"
          placeholder="Enter category name" />
        <small class="p-error block">{{
          errors.name }}</small>
      </div>

      <div class="field mb-4">
        <label for="description"
          class="block font-bold mb-2">Description*</label>
        <Textarea id="description"
          v-model="category.description"
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
<DataTable :value="getCategoryData"
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
          @click="editCategory(data)" />
        <Button type="button"
          icon="pi pi-trash"
          @click="deleteCategory(data._id)" />
      </div>
    </template>
  </Column>
</DataTable>
</template>

<style scoped></style>

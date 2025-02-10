<script setup lang="ts">
import { ref } from 'vue';
// import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import Drawer from "@/components/Drawer.vue";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import type { Category } from "@/types/api/category";
import { useToggle } from '@/composables/Toggle';
import { useCategoryStore } from '@/stores/categoryStore';
import { useLoaderStore } from '@/stores/loaderStore';
import api from '@/services/api';
import { storeToRefs } from 'pinia';
import Loader from '@/components/Loader.vue';

const { isToggle, toggle } = useToggle();
const categoryStore = useCategoryStore();
const loaderStore = useLoaderStore();
const { isLoading } = storeToRefs(loaderStore);
const { category, errors, getCategoryData } = storeToRefs(categoryStore);

const getUpdatedCategoryId = ref<string>()

const onSubmitForm = async () => {
  if (!categoryStore.formValidation()) {
    console.error("Form validation failed");
    return;
  }
  try {
    loaderStore.startLoading();
    const formData = new FormData();
    formData.append('name', category.value.name as string);
    formData.append('description', category.value.description as string);
    formData.append('image', category.value.image as File);

    if (getUpdatedCategoryId.value) {
      await api.updateCategory(getUpdatedCategoryId.value, formData as Category);
    } else {
      const response = await api.createCategory(formData as Category);
      categoryStore.getCategory();
      categoryStore.formReset();
      console.log(response);
      isToggle.value = true;
    }
  } catch (error) {
    throw error;
  } finally {
    loaderStore.stopLoading();
  }
};

const deleteCategory = async (id: string) => {
  try {
    loaderStore.startLoading()
    await categoryStore.deleteCategory(id);
  } catch (error) {
    throw error;
  } finally {
    loaderStore.stopLoading()
  }
};

const editCategory = (categoryData: Category) => {
  console.log("categoryData", categoryData)
  getUpdatedCategoryId.value = categoryData._id as string
  category.value = { ...categoryData };
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

      <!-- <div class="field mb-4">
        <label class="block font-bold mb-2">Image
          Upload*</label>
        <input type="file"
          name="image"
          className="file-input file-input-bordered w-full max-w-xs ps-0"
          @change="categoryStore.onImageUpload" />
        <small class="p-error block">{{
          errors.image }}</small>
      </div> -->

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
<Loader :loader="isLoading" />
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

<script setup lang="ts" name="AuthLogin">
import { ref } from 'vue';
import { AxiosError } from 'axios'
import { useRouter } from 'vue-router';
import { useToastComposable } from "@/composables/useToastComposable";
import type { ToastMessageOptions } from "primevue";

import api from '@/services/api';
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Loader from '@/components/Loader.vue'
import { useLoaderStore } from "@/stores/loaderStore";
const loaderStore = useLoaderStore();
const contact = ref('');
const password = ref('');
const router = useRouter()
const { showToast } = useToastComposable();


const handleLogin = async () => {
  try {
    const response = await api.login({ contact: contact.value, password: password.value });
    console.log("response", response.data.message)
    if (response.status === 200) {
      sessionStorage.setItem('token', response.data.token);
      router.push('/')
      showToast({
        severity: "success",
        summary: "Success",
        detail: response.data.message,
        life: 3000,
      } as ToastMessageOptions);
    }
  } catch (error) {
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
</script>

<template><template v-if="loaderStore.isLoading">
  <Loader fullScreen
    size="120px"
    strokeWidth="3"
    animationDuration="1s" />
</template>
<Toast />
<div class="flex items-center justify-center
    min-h-screen">
  <div
    class="p-10 border border-gray-800 shadow-lg rounded-lg w-96">
    <h2
      class="text-xl font-semibold text-center mb-4">
      Login</h2>
    <form @submit.prevent="handleLogin"
      class="space-y-4">
      <div class="pb-5">
        <InputText id="contact"
          v-model="contact"
          class="w-full p-inputtext" />
      </div>
      <div class="pb-5">
        <Password id="password"
          v-model="password"
          class="w-full"
          inputId="in_label"
          toggleMask />
      </div>
      <Button type="submit"
        class="w-full p-button-primary">
        Login
      </Button>
    </form>
  </div>
</div>
</template>

<style></style>

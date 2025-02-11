<script setup lang="ts" name="AuthLogin">
import { ref } from 'vue';
import Toast from 'primevue/toast';
import { useRouter } from 'vue-router';

import api from '@/services/api';
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
const contact = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter()

const handleLogin = async () => {
  try {
    const response = await api.login({ contact: contact.value, password: password.value });
    if (response.status === 200) {
      sessionStorage.setItem('token', response.data.token);
      router.push('/')
    } else {
      errorMessage.value = 'Invalid email or password';
    }
  } catch {
    errorMessage.value = 'An error occurred. Please try again.';
  }
};
</script>

<template>
<div
  class="flex items-center justify-center min-h-screen">
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
        label="Login"
        class="w-full p-button-primary" />
    </form>
    <p v-if="errorMessage"
      class="text-red-500 text-sm mt-2">{{
        errorMessage }}</p>
  </div>
</div>
</template>

<style></style>

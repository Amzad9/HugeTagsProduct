<script setup lang="ts">
import { defineEmits, defineModel } from 'vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

// Define the `submit` event that will be triggered when the form is submitted
const emit = defineEmits(['submit']);

// Define models for the contact and password
const contact = defineModel(String);
const password = defineModel(String);
</script>

<template>
<div
  class="flex items-center justify-center min-h-screen">
  <div
    class="p-10 border border-gray-800 shadow-lg rounded-lg w-96">
    <h2
      class="text-xl font-semibold text-center mb-4">
      Login</h2>
    <form @submit.prevent="emit('submit')"
      class="space-y-4">
      <div class="pb-5">
        <InputText id="contact"
          v-model="contact"
          class="w-full p-inputtext"
          placeholder="Enter Contact" />
      </div>
      <div class="pb-5">
        <Password id="password"
          v-model="password"
          class="w-full"
          inputId="in_label"
          toggleMask
          placeholder="Enter Password" />
      </div>
      <Button type="submit"
        class="w-full p-button-primary">Login</Button>
    </form>
  </div>
</div>
</template>

<style></style>

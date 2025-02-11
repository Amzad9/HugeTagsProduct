<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner';
defineProps<{ loader: boolean }>()
</script>
<template>
<div v-if="loader"
  class="flex items-center justify-center h-screen z-50 fixed inset-0 bg-gray-900 bg-opacity-50">

  <ProgressSpinner
    style="width: 50px; height: 50px"
    strokeWidth="8"
    fill="transparent"
    animationDuration=".5s"
    aria-label="Custom ProgressSpinner" />
</div>
</template>

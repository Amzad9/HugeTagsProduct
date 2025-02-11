<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner';
defineProps<{ loader: boolean }>()
</script>
<template>
<div v-if="loader"
  class="flex items-center justify-center absolute top-52 left-[50%] inset-auto">
  <ProgressSpinner
    style="width: 50px; height: 50px"
    strokeWidth="8"
    fill="transparent"
    animationDuration=".5s"
    aria-label="Custom ProgressSpinner" />
</div>
</template>

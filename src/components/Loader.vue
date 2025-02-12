<template>
<div>
  <!-- Full-Screen Loader -->
  <template v-if="fullScreen">
    <div
      class="fixed inset-0 h-screen flex items-center justify-center bg-white/10 z-50">
      <ProgressSpinner class=""
        :style="computedStyle"
        :strokeWidth="strokeWidth"
        :animationDuration="animationDuration"
        aria-label="Full Screen ProgressSpinner" />
    </div>

  </template>

  <!-- Inline Loader -->
  <div v-if="inline"
    class="flex items-center justify-center absolute top-52 left-1/2 transform -translate-x-1/2">
    <ProgressSpinner :style="computedStyle"
      :strokeWidth="strokeWidth"
      :animationDuration="animationDuration"
      aria-label="Inline ProgressSpinner" />
  </div>
</div>
</template>

<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner';
import { computed } from 'vue';

const props = defineProps<{
  fullScreen?: boolean;
  inline?: boolean;
  size?: string;
  strokeWidth?: string;
  animationDuration?: string;
}>();

const computedStyle = computed(() => ({
  width: props.size || '50px',
  height: props.size || '50px',
}));
</script>

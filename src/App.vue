<script setup lang="ts">
import { RouterView } from "vue-router";
import { storeToRefs } from "pinia";
import { onMounted } from 'vue'
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';

import { useLoaderStore } from "@/stores/loaderStore";
import Loader from "@/components/Loader.vue";
import type { ToastMessageOptions } from "primevue";
import { eventBus } from '@/utils/utils'

const loaderStore = useLoaderStore();
const { isLoading } = storeToRefs(loaderStore);
const toast = useToast();
onMounted(() => {
  eventBus.on("show-toast", (message: ToastMessageOptions) => {
    toast.add(message);
  });
});

</script>

<template>
<Toast />
<Loader :loader="isLoading" />
<RouterView />
</template>

<style scoped></style>
